'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { aiToolsService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';
import { MdContentCopy } from 'react-icons/md';

export default function ArticleWriterPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    prompt: '',
    tone: 'professional',
    wordLimit: 1000,
    language: 'english',
  });
  const [result, setResult] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    // Premium gating: require premium for large word limits
    const requestedWords = Number(formData.wordLimit) || 0;
    if ((user?.subscription?.plan ?? 'free') !== 'premium' && requestedWords > 1000) {
      toast.error('This feature requires a Premium plan. Please upgrade to generate longer articles.');
      return;
    }
    // credits check (1 credit)
    if ((user?.subscription?.credits ?? 0) < 1) {
      toast.error('Insufficient credits. Generating an article requires 1 credit.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await aiToolsService.generateArticle({
        ...formData,
        wordLimit: Number(formData.wordLimit),
      });

      setResult(response.data.article);
      toast.success(`Article generated! Credits remaining: ${response.creditsRemaining}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate article');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Article Writer</h1>
            <p className="text-gray-600 mb-8">Generate high-quality articles with AI</p>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                <textarea
                  name="prompt"
                  placeholder="Write an article about..."
                  value={formData.prompt}
                  onChange={handleChange}
                  className="input-field h-24 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option>professional</option>
                    <option>casual</option>
                    <option>formal</option>
                    <option>humorous</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Word Limit</label>
                  <select
                    name="wordLimit"
                    value={formData.wordLimit}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value={500}>500 words</option>
                    <option value={1000}>1000 words</option>
                    <option value={1500}>1500 words</option>
                  </select>
                </div>
              </div>

              <Button type="submit" isLoading={isLoading} variant="primary" size="lg" className="w-full">
                Generate Article
              </Button>
            </form>
          </div>

          {/* Result */}
          <div className="card p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Result</h2>
              {result && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded transition"
                >
                  <MdContentCopy /> Copy
                </button>
              )}
            </div>

            <div className="prose prose-sm max-w-none">
              {result ? (
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
                  {result}
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-400">
                  Your generated article will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
