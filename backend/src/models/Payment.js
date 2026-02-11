import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stripePaymentIntentId: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      required: true, // Amount in cents (e.g., 9999 = $99.99)
    },
    currency: {
      type: String,
      default: 'usd',
      enum: ['usd', 'inr', 'eur', 'gbp'],
    },
    creditsAmount: {
      type: Number,
      required: true, // Number of credits purchased
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'refunded'],
      default: 'pending',
    },
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'enterprise', 'credit_pack'],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'stripe'],
      default: 'stripe',
    },
    stripeCustomerId: String,
    description: String,
    receipts: {
      stripeReceipt: String,
      receiptUrl: String,
    },
    refundDetails: {
      refundId: String,
      reason: String,
      refundedAt: Date,
      refundAmount: Number,
    },
    metadata: {
      userEmail: String,
      userName: String,
      ip: String,
      userAgent: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
