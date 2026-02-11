 'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { aiToolsService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

export default function BlogTitlesPage() {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [credits, setCredits] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return toast.error('Please enter a topic');
    try {
      // cost check (1 credit)
      if ((user?.subscription?.credits ?? 0) < 1) {
        toast.error('Insufficient credits. Generating titles requires 1 credit.');
        return;
      }
      setIsLoading(true);
      const response = await aiToolsService.generateBlogTitles({ topic, count });
      setTitles(response.data?.titles || []);
      setCredits(response.creditsRemaining ?? null);
      toast.success('Titles generated');
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate titles');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Title Generator</h1>
          <p className="text-gray-600 mb-6">Generate multiple SEO-friendly blog title suggestions.</p>

          <form onSubmit={handleGenerate} className="space-y-4">
            <Input
              label="Topic"
              name="topic"
              value={topic}
              onChange={(e: any) => setTopic(e.target.value)}
              placeholder="e.g. Best remote work tools"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Count</label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="input-field"
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>

            <Button type="submit" isLoading={isLoading} variant="primary" className="w-full">Generate</Button>
          </form>

          {credits !== null && (
            <p className="mt-4 text-sm text-gray-600">Credits remaining: <strong>{credits}</strong></p>
          )}

          {titles.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Suggestions</h2>
              <ul className="list-disc pl-6 space-y-2">
                {titles.map((t, i) => (
                  <li key={i} className="text-gray-800">
                    {typeof t === 'string' ? t : (t?.title ?? JSON.stringify(t))}
                    {typeof t === 'object' && t?.seoScore !== undefined && (
                      <span className="ml-2 text-sm text-gray-500">(SEO: {t.seoScore})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
