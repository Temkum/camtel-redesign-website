'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  service: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for cookie on mount to sync state
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const authData = getCookie('auth_user');
    if (authData) setUser(JSON.parse(decodeURIComponent(authData)));
    setIsLoading(false);
  }, []);

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const dummyUser = {
        id: '1',
        name: 'KUM JUDE THADDEUS TEM',
        service: credentials.serviceId,
      };

      // Set State
      setUser(dummyUser);

      // Set Cookie (Expires in 7 days)
      const cookieValue = encodeURIComponent(JSON.stringify(dummyUser));
      document.cookie = `auth_user=${cookieValue}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; samesite=lax`;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    document.cookie =
      'auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/'; // Force redirect to landing
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
