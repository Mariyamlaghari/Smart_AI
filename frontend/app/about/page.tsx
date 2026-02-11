'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About SmartAI</h1>
          <p className="text-gray-700 mb-4">
            SmartAI provides a suite of AI-powered content and image tools to help creators, marketers, and teams
            produce high-quality content faster. Our mission is to democratize AI so everyone can leverage it
            for better creativity and productivity.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Our Approach</h2>
          <p className="text-gray-700">
            We combine cutting-edge language and vision models with thoughtful UX to make advanced AI approachable.
            Privacy and safety are central to our design.
          </p>
        </div>
      </div>
    </div>
  );
}
