'use client';

import React, { useState, useEffect } from 'react';
import { authService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { MdCheck, MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Plan {
  _id: string;
  name: string;
  displayName: string;
  description: string;
  price: number;
  credits: number;
  features: string[];
}

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const response = await authService.get('/payments/plans');
      if (response.data.success) {
        setPlans(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch pricing plans');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = (planId: string) => {
    // Redirect to payment page
    window.location.href = `/payment?plan=${planId}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your AI content creation needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={billingCycle === 'monthly' ? 'text-gray-900 font-semibold' : 'text-gray-600'}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="bg-gray-200 rounded-full p-1 w-14 h-8 flex items-center cursor-pointer"
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : ''
                }`}
              />
            </button>
            <span className={billingCycle === 'yearly' ? 'text-gray-900 font-semibold' : 'text-gray-600'}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="ml-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`card transition-all duration-300 ${
                plan.name === 'pro'
                  ? 'ring-2 ring-primary-600 shadow-2xl md:scale-105'
                  : 'hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.name === 'pro' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.displayName}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    ${(plan.price / 100).toFixed(2)}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">/month</p>
                </div>

                {/* Credits */}
                <div className="bg-primary-50 p-3 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">Credits per month</p>
                  <p className="text-2xl font-bold text-primary-600">{plan.credits}</p>
                </div>

                {/* CTA Button */}
                <Link href="/payment" className="w-full" onClick={() => handleUpgrade(plan._id)}>
                  <Button
                    variant={plan.name === 'pro' ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                  >
                    {plan.name === 'free' ? 'Get Started' : 'Upgrade Now'}
                  </Button>
                </Link>

                {/* Features */}
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <MdCheck className="text-green-500 flexshrink-0 mt-1" size={20} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: 'Can I change my plan anytime?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                question: 'What happens to unused credits?',
                answer: 'Credits reset every month. Unused credits do not roll over to the next month.',
              },
              {
                question: 'Is there a cancellation fee?',
                answer: 'No! You can cancel your subscription anytime without any hidden charges or cancellation fees.',
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer refunds within 7 days of purchase if you\'re not satisfied with our service.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="card p-6 cursor-pointer group">
                <summary className="flex items-center justify-between font-semibold text-gray-900">
                  {faq.question}
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
