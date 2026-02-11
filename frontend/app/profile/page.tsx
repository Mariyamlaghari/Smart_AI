'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';
import { MdEdit, MdCamera, MdCheck } from 'react-icons/md';

export default function ProfileSettingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: (user as any).phoneNumber || '',
        bio: (user as any).bio || '',
      });
      setPreview(user.avatar || '');
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      // Upload profile picture if selected
      if (profileImage) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('avatar', profileImage);

        const responseImage = await authService.post('/profile/upload-picture', formDataWithImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (!responseImage.data.success) {
          toast.error('Failed to upload profile picture');
          setIsSaving(false);
          return;
        }
      }

      // Update profile
      const response = await authService.put('/profile', {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        bio: formData.bio,
      });

      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        setProfileImage(null);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Profile Settings</h1>

        {/* Profile Picture Section */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Picture</h2>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white text-4xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={!isEditing}
                />
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                    isEditing
                      ? 'border-primary-600 bg-primary-50 text-primary-600 cursor-pointer'
                      : 'border-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <MdCamera size={20} />
                  Choose Photo
                </div>
              </label>
            </div>

            {/* Profile Completion */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Completion</span>
                    <span className="font-bold text-primary-600">
                      {(user as any)?.profileCompletion?.percentage || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary-600 h-3 rounded-full transition-all"
                      style={{ width: `${(user as any)?.profileCompletion?.percentage || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-3">
                    <MdCheck className="text-green-600" size={20} />
                    <span className="text-gray-700">Email verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {user?.name ? (
                      <MdCheck className="text-green-600" size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    )}
                    <span className="text-gray-700">Name added</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {(user as any)?.phoneNumber ? (
                      <MdCheck className="text-green-600" size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    )}
                    <span className="text-gray-700">Phone number added</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {user?.avatar ? (
                      <MdCheck className="text-green-600" size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    )}
                    <span className="text-gray-700">Profile picture added</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="card p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <MdEdit size={20} />
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="space-y-6">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Your full name"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              disabled
              placeholder="Your email address"
              helpText="Email cannot be changed"
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="+1 (555) 000-0000"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Tell us about yourself..."
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none resize-none ${
                  isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                }`}
                rows={4}
              />
            </div>

            {isEditing && (
              <Button
                onClick={handleSaveProfile}
                isLoading={isSaving}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>

        {/* Account Information Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Account Type</span>
              <span className="font-semibold text-gray-900">
                {user?.subscription?.plan ? user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1) : 'Free'}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Total Credits</span>
              <span className="font-semibold text-gray-900">{user?.subscription?.credits}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Member Since</span>
              <span className="font-semibold text-gray-900">
                {(user as any)?.createdAt ? new Date((user as any).createdAt).toLocaleDateString() : '-'}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-700">Next Credit Reset</span>
              <span className="font-semibold text-gray-900">
                {(user?.subscription as any)?.creditsReset
                  ? new Date((user?.subscription as any).creditsReset).toLocaleDateString()
                  : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
