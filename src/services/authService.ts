import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  },

  getToken: (): string | null => {
    return localStorage.getItem('adminToken');
  },

  setToken: (token: string): void => {
    localStorage.setItem('adminToken', token);
    // Set a flag to prevent immediate redirect on 401
    sessionStorage.setItem('tokenJustSet', 'true');
    // Clear the flag after 2 seconds
    setTimeout(() => {
      sessionStorage.removeItem('tokenJustSet');
    }, 2000);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('adminToken');
  },
};

