'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { MdMenu, MdClose, MdLogout } from 'react-icons/md';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">SmartAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {!isAuthenticated ? (
              <>
                <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
                  Home
                </Link>
                <Link href="/#features" className="text-gray-700 hover:text-primary-600 font-medium">
                  Features
                </Link>
                <Link href="/#pricing" className="text-gray-700 hover:text-primary-600 font-medium">
                  Pricing
                </Link>
                <Link href="/login" className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg">
                  Sign In
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/tools" className="text-gray-700 hover:text-primary-600 font-medium">
                  Tools
                </Link>
                <Link href="/pricing" className="text-gray-700 hover:text-primary-600 font-medium">
                  Pricing
                </Link>
                <Link href="/profile" className="text-gray-700 hover:text-primary-600 font-medium">
                  Profile
                </Link>
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-red-600 transition"
                  >
                    <MdLogout size={20} />
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Home
                </Link>
                <Link href="/#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Features
                </Link>
                <Link href="/login" className="block px-4 py-2 text-primary-600 hover:bg-primary-50 rounded">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
