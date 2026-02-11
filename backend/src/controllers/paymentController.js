import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import SubscriptionPlan from '../models/SubscriptionPlan.js';
import { sendPaymentConfirmationEmail, sendPlanUpgradeEmail } from '../services/EmailService.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Get subscription plans
 */
export const getSubscriptionPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ isActive: true });
    res.json({
      success: true,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription plans',
      error: error.message,
    });
  }
};

/**
 * Create a Stripe payment intent for credits
 */
export const createPaymentIntent = async (req, res) => {
  try {
    const { planId, creditsAmount } = req.body;
    const userId = req.userId;

    // Validate input
    if (!planId || !creditsAmount) {
      return res.status(400).json({
        success: false,
        message: 'Plan ID and credits amount are required',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    // Create Stripe customer if not exists
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: userId.toString(),
        },
      });
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // Calculate amount based on credits (e.g., 100 credits = $9.99)
    const amount = Math.round((creditsAmount / 100) * 999); // $9.99 per 100 credits

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: user.stripeCustomerId,
      metadata: {
        userId: userId.toString(),
        planId: planId.toString(),
        creditsAmount: creditsAmount.toString(),
      },
      description: `${plan.displayName} Plan - ${creditsAmount} Credits`,
    });

    // Create payment record
    const payment = new Payment({
      userId,
      stripePaymentIntentId: paymentIntent.id,
      stripeCustomerId: user.stripeCustomerId,
      amount,
      creditsAmount,
      status: 'pending',
      plan: plan.name,
      metadata: {
        userEmail: user.email,
        userName: user.name,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      },
    });

    await payment.save();

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount,
        credits: creditsAmount,
        plan: plan.displayName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: error.message,
    });
  }
};

/**
 * Confirm payment and add credits
 */
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const userId = req.userId;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment Intent ID is required',
      });
    }

    // Get payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment was not successful',
      });
    }

    // Update payment in database
    const payment = await Payment.findOne({
      stripePaymentIntentId: paymentIntentId,
      userId,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment record not found',
      });
    }

    // Update payment status
    payment.status = 'succeeded';
    if (paymentIntent.charges.data.length > 0) {
      payment.receipts.stripeReceipt = paymentIntent.charges.data[0].id;
      payment.receipts.receiptUrl = paymentIntent.charges.data[0].receipt_url;
    }
    await payment.save();

    // Add credits to user
    const user = await User.findById(userId);
    user.subscription.credits += payment.creditsAmount;
    user.subscription.plan = payment.plan;
    
    // Update subscription dates
    if (payment.plan !== 'free') {
      user.subscription.startDate = new Date();
      user.subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      user.subscription.creditsReset = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    await user.save();

    // Send confirmation email
    await sendPaymentConfirmationEmail(user.email, user.name, {
      plan: payment.plan,
      amount: payment.amount,
      credits: payment.creditsAmount,
      totalCredits: user.subscription.credits,
      transactionId: payment.stripePaymentIntentId,
      nextReset: user.subscription.creditsReset.toLocaleDateString(),
    });

    res.json({
      success: true,
      message: 'Payment confirmed and credits added',
      data: {
        creditsAdded: payment.creditsAmount,
        totalCredits: user.subscription.credits,
        plan: user.subscription.plan,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
      error: error.message,
    });
  }
};

/**
 * Get payment history
 */
export const getPaymentHistory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const userId = req.userId;

    const skip = (page - 1) * limit;

    const payments = await Payment.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Payment.countDocuments({ userId });

    res.json({
      success: true,
      data: payments,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history',
      error: error.message,
    });
  }
};

/**
 * Calculate credit pack price
 */
export const calculateCreditPrice = async (req, res) => {
  try {
    const { creditsAmount } = req.query;

    if (!creditsAmount) {
      return res.status(400).json({
        success: false,
        message: 'Credits amount is required',
      });
    }

    // Price: $9.99 per 100 credits
    const amount = Math.round((creditsAmount / 100) * 999);
    const pricePerCredit = (amount / creditsAmount / 100).toFixed(4);

    res.json({
      success: true,
      data: {
        credits: parseInt(creditsAmount),
        amount,
        displayPrice: `$${(amount / 100).toFixed(2)}`,
        pricePerCredit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate price',
      error: error.message,
    });
  }
};

/**
 * Get payment details
 */
export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const userId = req.userId;

    const payment = await Payment.findOne({
      _id: paymentId,
      userId,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message,
    });
  }
};

export default {
  getSubscriptionPlans,
  createPaymentIntent,
  confirmPayment,
  getPaymentHistory,
  calculateCreditPrice,
  getPaymentDetails,
};
