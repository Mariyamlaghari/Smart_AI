 'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { aiToolsService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

export default function ResumeReviewerPage() {
  const { user } = useAuth();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return toast.error('Please paste your resume');
    try {
      if ((user?.subscription?.credits ?? 0) < 2) {
        toast.error('Insufficient credits. Resume review requires 2 credits.');
        return;
      }
      setIsLoading(true);
      const response = await aiToolsService.reviewResume({ resumeText, jobDescription });
      setResult(response.data || null);
      setCredits(response.creditsRemaining ?? null);
      toast.success('Resume reviewed');
    } catch (err: any) {
      toast.error(err.message || 'Resume review failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Reviewer</h1>
          <p className="text-gray-600 mb-6">Paste your resume and (optionally) a job description for tailored feedback.</p>

          <form onSubmit={handleReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="input-field h-40 resize-none"
                placeholder="Paste your resume text here"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description (optional)</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="input-field h-28 resize-none"
                placeholder="Paste job description to tailor feedback"
              />
            </div>

            <Button type="submit" isLoading={isLoading} variant="primary" className="w-full">Review Resume</Button>
          </form>

          {credits !== null && (
            <p className="mt-4 text-sm text-gray-600">Credits remaining: <strong>{credits}</strong></p>
          )}

          {result && (
            <div className="mt-6 prose max-w-none">
              <h2 className="text-lg font-semibold">Result</h2>
              {result.score !== undefined && <p><strong>Score:</strong> {result.score}</p>}
              {result.feedback && <div className="bg-gray-50 p-4 rounded">{result.feedback}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
