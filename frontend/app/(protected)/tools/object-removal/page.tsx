 'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { aiToolsService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

export default function ObjectRemovalPage() {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState('');
  const [coordinatesText, setCoordinatesText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return toast.error('Please enter an image URL');
    let coordinates = null;
    try {
      coordinates = coordinatesText ? JSON.parse(coordinatesText) : null;
    } catch (err) {
      return toast.error('Coordinates must be valid JSON');
    }

    try {
      if ((user?.subscription?.credits ?? 0) < 3) {
        toast.error('Insufficient credits. Object removal requires 3 credits.');
        return;
      }
      setIsLoading(true);
      const response = await aiToolsService.removeObject({ imageUrl, coordinates });
      setResultUrl(response.data?.processedUrl || null);
      setCredits(response.creditsRemaining ?? null);
      toast.success('Object removed');
    } catch (err: any) {
      toast.error(err.message || 'Object removal failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Object Removal</h1>
          <p className="text-gray-600 mb-6">Provide an image URL and coordinates (JSON) of the object to remove.</p>

          <form onSubmit={handleProcess} className="space-y-4">
            <Input label="Image URL" name="imageUrl" value={imageUrl} onChange={(e:any)=>setImageUrl(e.target.value)} placeholder="https://.../image.jpg" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coordinates (JSON)</label>
              <textarea
                value={coordinatesText}
                onChange={(e) => setCoordinatesText(e.target.value)}
                placeholder='e.g. { "x": 10, "y": 20, "w": 100, "h": 80 }'
                className="input-field h-28 resize-none"
              />
            </div>

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
