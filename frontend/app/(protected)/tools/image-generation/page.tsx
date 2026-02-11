 'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { aiToolsService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

export default function ImageGenerationPage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [dimensions, setDimensions] = useState('1024x1024');
  const [quality, setQuality] = useState('high');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return toast.error('Please enter a prompt');
    // cost check (requires 5 credits)
    if ((user?.subscription?.credits ?? 0) < 5) {
      toast.error('Insufficient credits. Image generation requires 5 credits.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await aiToolsService.generateImage({ prompt, style, dimensions, quality });
      setImageUrl(response.data?.imageUrl || null);
      setCredits(response.creditsRemaining ?? null);
      toast.success('Image generated');
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Generation</h1>
            <p className="text-gray-600 mb-6">Create images from text prompts using AI.</p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prompt</label>
                <textarea
                  name="prompt"
                  placeholder="A futuristic city skyline at sunset"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="input-field h-28 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                  <select value={style} onChange={(e) => setStyle(e.target.value)} className="input-field">
                    <option value="realistic">Realistic</option>
                    <option value="illustration">Illustration</option>
                    <option value="anime">Anime</option>
                    <option value="digital">Digital Art</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                  <select value={dimensions} onChange={(e) => setDimensions(e.target.value)} className="input-field">
                    <option value="512x512">512x512</option>
                    <option value="768x768">768x768</option>
                    <option value="1024x1024">1024x1024</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                <select value={quality} onChange={(e) => setQuality(e.target.value)} className="input-field">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <Button type="submit" isLoading={isLoading} variant="primary" className="w-full">Generate</Button>
            </form>

            {credits !== null && (
              <p className="mt-4 text-sm text-gray-600">Credits remaining: <strong>{credits}</strong></p>
            )}
          </div>

          <div className="card p-8">
            <h2 className="text-xl font-bold mb-4">Result</h2>
            {imageUrl ? (
              <div>
                <img src={imageUrl} alt="Generated" className="w-full rounded-md mb-4" />
                <a href={imageUrl} target="_blank" rel="noreferrer" className="text-primary-600">Open full image</a>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">Your generated image will appear here</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
