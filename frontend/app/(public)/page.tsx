'use client';

import React from 'react';
import Link from 'next/link';
import { MdArrowForward, MdStar, MdCheck } from 'react-icons/md';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Create Stunning Content With AI
              </h1>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                Unlock the power of artificial intelligence to generate high-quality content,
                images, and more. No AI expertise needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Get Started Free <MdArrowForward />
                  </Button>
                </Link>
                <Link href="/#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative w-full h-80 bg-gradient-to-br from-primary-700 to-primary-800 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <p className="text-gray-200">AI-Powered Tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI Tools</h2>
            <p className="text-xl text-gray-600">Everything you need to create amazing content</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📝',
                title: 'Article Writer',
                description: 'Generate high-quality articles with customizable tone and length',
              },
              {
                icon: '📰',
                title: 'Blog Titles',
                description: 'Get SEO-optimized blog titles with AI suggestions',
              },
              {
                icon: '🎨',
                title: 'Image Generation',
                description: 'Create stunning AI-generated images from text prompts',
              },
              {
                icon: '🖼️',
                title: 'Background Removal',
                description: 'Remove backgrounds from images instantly with AI',
              },
              {
                icon: '🎯',
                title: 'Object Removal',
                description: 'Remove unwanted objects from your images seamlessly',
              },
              {
                icon: '📄',
                title: 'Resume Review',
                description: 'Get AI feedback and improve your resume instantly',
              },
            ].map((tool, idx) => (
              <div key={idx} className="card p-8 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that works for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Free',
                price: '0',
                credits: '10',
                features: ['10 Monthly Credits', 'All AI Tools', 'Email Support'],
              },
              {
                name: 'Pro',
                price: '29',
                credits: '500',
                features: ['500 Monthly Credits', 'Priority Support', 'API Access', 'Advanced Analytics'],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: '99',
                credits: '2000',
                features: ['2000+ Monthly Credits', '24/7 Support', 'Dedicated Account Manager', 'Custom Integration'],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`card p-8 transition ${
                  plan.popular ? 'ring-2 ring-primary-600 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="mb-4 inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="mb-6 p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-primary-600">{plan.credits}</span> Credits/month
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2">
                      <MdCheck className="text-primary-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="w-full block">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-app text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Amazing Content?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of creators using SmartAI
          </p>
          <Link href="/signup">
            <Button variant="secondary" size="lg">
              Sign Up Free <MdArrowForward />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
