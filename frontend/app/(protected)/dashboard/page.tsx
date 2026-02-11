'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardService } from '@/services/api.service';
import { MdDownload, MdFavorite, MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

interface UsageItem {
  _id: string;
  toolName: string;
  status: string;
  creditsUsed: number;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [usage, setUsage] = useState<UsageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsageHistory();
  }, []);

  const fetchUsageHistory = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardService.getUsageHistory({ limit: 10 });
      setUsage(response.data);
    } catch (error) {
      toast.error('Failed to fetch usage history');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        {/* Welcome Section */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome, {user?.name}! 👋
              </h1>
              <p className="text-gray-600">Manage your AI tools and track your usage</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Credits Available</p>
              <p className="text-3xl font-bold text-primary-600">{user?.subscription.credits}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Plan', value: user?.subscription.plan || 'Free' },
            { label: 'Total Used', value: '0 credits' },
            { label: 'Next Reset', value: 'In 30 days' },
          ].map((stat, idx) => (
            <div key={idx} className="card p-6 text-center">
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Usage History */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Recent Usage</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tool</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Credits</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : usage.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No usage history yet
                    </td>
                  </tr>
                ) : (
                  usage.map(item => (
                    <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                        {item.toolName.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'success'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {item.creditsUsed}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
