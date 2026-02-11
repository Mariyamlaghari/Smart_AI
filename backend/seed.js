import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SubscriptionPlan from './src/models/SubscriptionPlan.js';
import connectDB from './src/config/database.js';

dotenv.config();

const plans = [
  {
    name: 'free',
    displayName: 'Free Plan',
    description: 'Perfect for trying out SmartAI',
    price: 0,
    credits: 10,
    creditsPerMonth: 10,
    features: [
      'All AI Tools Access',
      '10 Free Credits',
      'Basic Support',
      'Monthly Credit Reset',
    ],
    billingCycle: 'monthly',
    isActive: true,
    limits: {
      maxAPICallsPerDay: 10,
      prioritySupport: false,
    },
  },
  {
    name: 'starter',
    displayName: 'Starter Plan',
    description: 'Great for individuals and small projects',
    price: 999, // $9.99
    credits: 100,
    creditsPerMonth: 100,
    features: [
      'All AI Tools Access',
      '100 Credits/Month',
      'Email Support',
      'Monthly Credit Reset',
      'Usage Analytics',
      'Saved Content Library',
    ],
    billingCycle: 'monthly',
    isActive: true,
    limits: {
      maxAPICallsPerDay: 100,
      maxStorageGB: 5,
      prioritySupport: false,
    },
  },
  {
    name: 'pro',
    displayName: 'Pro Plan',
    description: 'For professionals and growing teams',
    price: 2999, // $29.99
    credits: 500,
    creditsPerMonth: 500,
    features: [
      'All AI Tools Access',
      '500 Credits/Month',
      'Priority Email & Chat Support',
      'Monthly Credit Reset',
      'Advanced Analytics',
      'Unlimited Saved Content',
      'API Access',
      'Team Collaboration',
    ],
    billingCycle: 'monthly',
    isActive: true,
    limits: {
      maxAPICallsPerDay: 1000,
      maxStorageGB: 50,
      prioritySupport: true,
    },
  },
  {
    name: 'enterprise',
    displayName: 'Enterprise Plan',
    description: 'Custom solutions for large organizations',
    price: 9999, // $99.99
    credits: 2000,
    creditsPerMonth: 2000,
    features: [
      'All AI Tools Access',
      '2000 Credits/Month',
      '24/7 Dedicated Support',
      'Monthly Credit Reset',
      'Advanced Analytics & Reports',
      'Unlimited Saved Content',
      'Full API Access',
      'Unlimited Team Members',
      'Custom Integrations',
      'SLA Guarantee',
    ],
    billingCycle: 'monthly',
    isActive: true,
    limits: {
      maxAPICallsPerDay: 10000,
      maxStorageGB: 500,
      prioritySupport: true,
    },
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Clear existing plans
    await SubscriptionPlan.deleteMany({});
    console.log('🗑️  Cleared existing plans');

    // Insert new plans
    const createdPlans = await SubscriptionPlan.insertMany(plans);
    console.log(`✅ Successfully seeded ${createdPlans.length} subscription plans`);

    createdPlans.forEach((plan) => {
      console.log(`   - ${plan.displayName}: $${plan.price / 100} / month`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
