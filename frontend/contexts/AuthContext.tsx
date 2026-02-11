'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, userService } from '@/services/auth.service';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: {
    plan: string;
    credits: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  signup?: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Restore user from localStorage/token on initial load
  React.useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          const userProfile = await userService.getProfile();
          if (userProfile && userProfile.user) {
            setUser(userProfile.user);
          } else {
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        authService.logout();
      } finally {
        setIsInitialized(true);
      }
    };

    restoreSession();
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, confirmPassword: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, password, confirmPassword });
      // After signup, do not auto-login. Redirect user to sign-in page.
      // Clear any token that may have been saved by the service.
      authService.logout();
      toast.success('Registration successful! Please sign in.');
      router.push('/login');
    } catch (error: any) {
      const message = error.message || 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.message || 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    authService.logout();
    toast.success('Logged out successfully');
    router.push('/');
  }, [router]);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isInitialized,
        isAuthenticated: !!user,
        register,
        signup: register,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
