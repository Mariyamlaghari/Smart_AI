'use client';

import React from 'react';
import Link from 'next/link';

const posts = [
  { id: 'welcome', title: 'Welcome to SmartAI', excerpt: 'An intro to SmartAI features and roadmap.' },
  { id: 'writing-tips', title: '5 Tips to Improve AI Generated Content', excerpt: 'How to prompt and refine output for better results.' },
];

export default function BlogPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-600 mb-6">Latest updates, guides, and tips about SmartAI.</p>

          <div className="space-y-6">
            {posts.map(p => (
              <article key={p.id} className="border-b pb-4">
                <h2 className="text-xl font-semibold"><Link href={`/blog/${p.id}`}>{p.title}</Link></h2>
                <p className="text-gray-700">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
