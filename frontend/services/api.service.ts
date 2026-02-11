'use client';

import { apiClient } from '@/lib/api-client';

export const aiToolsService = {
  async generateArticle(data: {
    prompt: string;
    tone: string;
    wordLimit: number;
    language: string;
  }) {
    try {
      const response = await apiClient.post('/api/tools/article-writer', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async generateBlogTitles(data: { topic: string; count?: number }) {
    try {
      const response = await apiClient.post('/api/tools/blog-titles', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async generateImage(data: {
    prompt: string;
    style: string;
    dimensions: string;
    quality: string;
  }) {
    try {
      const response = await apiClient.post('/api/tools/image-generation', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async removeBackground(data: { imageUrl: string }) {
    try {
      const response = await apiClient.post('/api/tools/background-removal', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async removeObject(data: { imageUrl: string; coordinates: any }) {
    try {
      const response = await apiClient.post('/api/tools/object-removal', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async reviewResume(data: { resumeText: string; jobDescription?: string }) {
    try {
      const response = await apiClient.post('/api/tools/review-resume', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};

export const dashboardService = {
  async getUsageHistory(params?: { toolName?: string; limit?: number; page?: number }) {
    try {
      const response = await apiClient.get('/api/dashboard/usage-history', { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async getSavedContent(params?: { toolName?: string; isFavorite?: boolean; limit?: number; page?: number }) {
    try {
      const response = await apiClient.get('/api/dashboard/saved-content', { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async saveContent(data: {
    toolName: string;
    title: string;
    content: string;
    metadata?: any;
    tags?: string[];
  }) {
    try {
      const response = await apiClient.post('/api/dashboard/saved-content', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async updateSavedContent(id: string, data: any) {
    try {
      const response = await apiClient.put(`/api/dashboard/saved-content/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async deleteSavedContent(id: string) {
    try {
      const response = await apiClient.delete(`/api/dashboard/saved-content/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};

export const authService = apiClient;

export const paymentService = {
  async getPlans() {
    try {
      const response = await apiClient.get('/api/payments/plans');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async createPaymentIntent(data: { planId: string; creditsAmount: number }) {
    try {
      const response = await apiClient.post('/api/payments/create-intent', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async confirmPayment(data: { paymentIntentId: string }) {
    try {
      const response = await apiClient.post('/api/payments/confirm', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async getPaymentHistory(params?: { limit?: number; page?: number }) {
    try {
      const response = await apiClient.get('/api/payments/history', { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async calculateCreditsPrice(creditsAmount: number) {
    try {
      const response = await apiClient.get('/api/payments/calculate-price', {
        params: { creditsAmount },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async getPaymentDetails(paymentId: string) {
    try {
      const response = await apiClient.get(`/api/payments/${paymentId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};
