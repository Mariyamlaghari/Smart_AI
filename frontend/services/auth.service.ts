'use client';

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authService = {
  async register(data: { name: string; email: string; password: string; confirmPassword: string }) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },
};

export const userService = {
  async getProfile() {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async updateProfile(data: { name?: string; avatar?: string }) {
    try {
      const token = authService.getToken();
      const response = await axios.put(`${API_URL}/api/auth/me`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};
