'use client';

import React, { useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent (demo)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        <div className="card p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-6">Have questions or feedback? Send us a message and we'll get back to you.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" name="name" value={form.name} onChange={handleChange as any} />
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange as any} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange as any} className="input-field h-32" />
            </div>

            <Button type="submit" variant="primary">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
