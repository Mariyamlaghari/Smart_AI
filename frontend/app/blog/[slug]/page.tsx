'use client';

import React from 'react';
import { notFound } from 'next/navigation';

const posts: Record<string, any> = {
  welcome: {
    title: 'Welcome to SmartAI',
    content: 'Welcome! SmartAI helps you create content quickly using AI-powered tools. Stay tuned for updates.'
  },
  'writing-tips': {
    title: '5 Tips to Improve AI Generated Content',
    content: '1. Be specific in prompts. 2. Iterate. 3. Use examples. 4. Refine tone. 5. Post-edit for quality.'
  }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) return notFound();

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="prose">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
