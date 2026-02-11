 'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { aiToolsService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

export default function BackgroundRemovalPage() {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return toast.error('Please enter an image URL');
    if ((user?.subscription?.credits ?? 0) < 2) {
      toast.error('Insufficient credits. Background removal requires 2 credits.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await aiToolsService.removeBackground({ imageUrl });
      setResultUrl(response.data?.processedUrl || null);
      setCredits(response.creditsRemaining ?? null);
      toast.success('Background removed');
    } catch (err: any) {
      toast.error(err.message || 'Background removal failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Background Removal</h1>
          <p className="text-gray-600 mb-6">Remove the background of an image via URL.</p>

          <form onSubmit={handleProcess} className="space-y-4">
            <Input label="Image URL" name="imageUrl" value={imageUrl} onChange={(e:any)=>setImageUrl(e.target.value)} placeholder="https://.../image.jpg" />
            <Button type="submit" isLoading={isLoading} variant="primary" className="w-full">Process</Button>
          </form>

          {credits !== null && (
            <p className="mt-4 text-sm text-gray-600">Credits remaining: <strong>{credits}</strong></p>
          )}

          {resultUrl && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Processed Image</h2>
              <img src={resultUrl} alt="Processed" className="w-full rounded-md" />
              <a href={resultUrl} target="_blank" rel="noreferrer" className="text-primary-600">Open processed image</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
