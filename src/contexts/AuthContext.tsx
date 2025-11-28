import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, LoginCredentials } from '../services/authService';

interface User {
  _id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status
  const checkAuth = () => {
    const token = authService.getToken();
    if (token) {
      // Token exists, user is considered authenticated
      // Set a default user object if we don't have user data yet
      if (!user) {
        setUser({ _id: '', email: '', role: 'admin' });
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Check if user is already logged in on mount
    checkAuth();
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      authService.setToken(response.token);
      // Set user immediately after login
      setUser(response.user || { _id: '', email: credentials.email, role: 'admin' });
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Check authentication status - prioritize token in localStorage
  const isAuthenticated = authService.isAuthenticated() || !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
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

