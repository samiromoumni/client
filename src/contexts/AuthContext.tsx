import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

  useEffect(() => {
    // Check if user is already logged in on mount
    const initializeAuth = () => {
      const token = authService.getToken();
      if (token) {
        // Token exists, user is considered authenticated
        // Set a default user object
        setUser({ _id: '', email: '', role: 'admin' });
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      authService.setToken(response.token);
      // Set user immediately after login
      const userData = response.user || { _id: '', email: credentials.email, role: 'admin' };
      setUser(userData);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Check authentication status - always check localStorage first
  // This ensures persistence across page refreshes
  const isAuthenticated = authService.isAuthenticated();

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

