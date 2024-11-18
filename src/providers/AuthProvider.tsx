import React, { useState, useCallback } from 'react';
import { AuthContext, User } from '../lib/auth';

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'client' | 'artist';
  profileImage?: File | null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    setError(message);
    throw new Error(message);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/logout', { 
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setUser(null);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      isLoading,
      error,
    }}>
      {children}
    </AuthContext.Provider>
  );
}