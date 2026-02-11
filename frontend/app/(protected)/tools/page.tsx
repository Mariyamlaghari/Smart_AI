'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { MdArrowForward } from 'react-icons/md';

const tools = [
  {
    id: 'article-writer',
    icon: '📝',
    name: 'Article Writer',
    description: 'Generate high-quality articles with customizable tone and length',
    credits: 1,
    url: '/tools/article-writer',
  },
  {
    id: 'blog-titles',
    icon: '📰',
    name: 'Blog Title Generator',
    description: 'Get SEO-optimized blog titles with multiple variations',
    credits: 1,
    url: '/tools/blog-titles',
  },
  {
    id: 'image-gen',
    icon: '🎨',
    name: 'Image Generation',
    description: 'Create stunning AI-generated images from text prompts',
    credits: 5,
    url: '/tools/image-generation',
  },
  {
    id: 'bg-removal',
    icon: '🖼️',
    name: 'Background Removal',
    description: 'Remove backgrounds from images instantly with AI',
    credits: 2,
    url: '/tools/background-removal',
  },
  {
    id: 'object-removal',
    icon: '🎯',
    name: 'Object Removal',
    description: 'Remove unwanted objects from your images seamlessly',
    credits: 3,
    url: '/tools/object-removal',
  },
  {
    id: 'resume-review',
    icon: '📄',
    name: 'Resume Reviewer',
    description: 'Get AI feedback and improve your resume instantly',
    credits: 2,
    url: '/tools/resume-reviewer',
  },
];

export default function ToolsPage() {
  const { user } = useAuth();

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Tools</h1>
          <p className="text-xl text-gray-600">
            Available Credits: <span className="font-bold text-primary-600">{user?.subscription.credits}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <div key={tool.id} className="card p-6 hover:shadow-lg transition flex flex-col">
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h2>
              <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{tool.credits} credit{tool.credits > 1 ? 's' : ''}</span>
                <Link href={tool.url}>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={user && user.subscription.credits < tool.credits}
                  >
                    Use <MdArrowForward />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
