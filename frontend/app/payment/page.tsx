'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { authService } from '@/services/api.service';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
  _id: string;
  name: string;
  displayName: string;
  price: number;
  credits: number;
}

function PaymentForm({ planId, plan }: { planId: string; plan: Plan }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(plan.price);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe not loaded');
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const intentResponse = await authService.post('/payments/create-intent', {
        planId,
        creditsAmount: plan.credits,
      });

      if (!intentResponse.data.success) {
        toast.error('Failed to create payment intent');
        setIsProcessing(false);
        return;
      }

      const { clientSecret, paymentIntentId } = intentResponse.data.data;

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { email: user?.email },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        // Confirm payment on backend
        const confirmResponse = await authService.post('/payments/confirm', {
          paymentIntentId,
        });

        if (confirmResponse.data.success) {
          toast.success('Payment successful! Credits added to your account.');
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-4 border border-gray-300 rounded-lg bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Plan</span>
          <span className="font-semibold text-gray-900">{plan.displayName}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Credits</span>
          <span className="font-semibold text-gray-900">{plan.credits}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-primary-600">
            ${(amount / 100).toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        isLoading={isProcessing}
        variant="primary"
        size="lg"
        className="w-full"
      >
        Pay ${(amount / 100).toFixed(2)}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secure and encrypted. We never store your card details.
      </p>
    </form>
  );
}

interface PaymentPageProps {
  searchParams: { plan?: string };
}

export default function PaymentPage({ searchParams }: PaymentPageProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [customCredits, setCustomCredits] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (plans.length > 0 && searchParams.plan) {
      const plan = plans.find((p) => p._id === searchParams.plan);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        setSelectedPlan(plans[1]); // Default to Starter
      }
    }
  }, [plans, searchParams.plan]);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const response = await authService.get('/payments/plans');
      if (response.data.success) {
        setPlans(response.data.data);
        if (!searchParams.plan && response.data.data.length > 0) {
          setSelectedPlan(response.data.data[1]); // Default to Starter
        }
      }
    } catch (error) {
      toast.error('Failed to fetch plans');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !selectedPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-primary-600 hover:text-primary-700 font-medium mb-8 flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Payment</h1>
            <Elements stripe={stripePromise}>
              <PaymentForm planId={selectedPlan._id} plan={selectedPlan} />
            </Elements>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

              {/* Plan Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Plan
                </label>
                <div className="space-y-3">
                  {plans.map((plan) => (
                    <button
                      key={plan._id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPlan._id === plan._id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{plan.displayName}</div>
                      <div className="text-sm text-gray-600">
                        {plan.credits} credits - ${(plan.price / 100).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">${(selectedPlan.price / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax (estimated)</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${(selectedPlan.price / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="card p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What You Get</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">{selectedPlan.credits} Credits</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Instant Access to All AI Tools</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Email Support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">7-Day Money Back Guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
