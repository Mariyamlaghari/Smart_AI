import mongoose from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['free', 'starter', 'pro', 'enterprise'],
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true, // Free, Starter, Pro, Enterprise
    },
    description: String,
    price: {
      type: Number,
      required: true, // Monthly price in cents
    },
    credits: {
      type: Number,
      required: true,
      default: 0,
    },
    creditsPerMonth: {
      type: Number,
      required: true,
      default: 0,
    },
    features: [String], // Array of features available in this plan
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly', 'custom'],
      default: 'monthly',
    },
    striprePriceId: String, // Stripe Price ID for this plan
    isActive: {
      type: Boolean,
      default: true,
    },
    limits: {
      maxAPICallsPerDay: Number,
      maxStorageGB: Number,
      prioritySupport: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
