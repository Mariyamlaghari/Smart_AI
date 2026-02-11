import express from 'express';
import {
  getSubscriptionPlans,
  createPaymentIntent,
  confirmPayment,
  getPaymentHistory,
  calculateCreditPrice,
  getPaymentDetails,
} from '../controllers/paymentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/payments/plans
 * @desc    Get all subscription plans
 * @access  Public
 */
router.get('/plans', getSubscriptionPlans);

/**
 * @route   POST /api/payments/create-intent
 * @desc    Create a Stripe payment intent
 * @access  Private
 */
router.post('/create-intent', authenticateToken, createPaymentIntent);

/**
 * @route   POST /api/payments/confirm
 * @desc    Confirm payment and add credits
 * @access  Private
 */
router.post('/confirm', authenticateToken, confirmPayment);

/**
 * @route   GET /api/payments/history
 * @desc    Get user's payment history
 * @access  Private
 */
router.get('/history', authenticateToken, getPaymentHistory);

/**
 * @route   GET /api/payments/calculate-price
 * @desc    Calculate price for credit pack
 * @access  Public
 */
router.get('/calculate-price', calculateCreditPrice);

/**
 * @route   GET /api/payments/:paymentId
 * @desc    Get payment details
 * @access  Private
 */
router.get('/:paymentId', authenticateToken, getPaymentDetails);

export default router;
