import axios from 'axios';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'https://server-ut7a.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login if it's a 401 error AND we're not already on the login page
    if (error.response?.status === 401 && !window.location.pathname.includes('/admin/login')) {
      localStorage.removeItem('adminToken');
      // Use a small delay to avoid redirect loops
      setTimeout(() => {
        window.location.href = '/admin/login';
      }, 100);
    }
    return Promise.reject(error);
  }
);

export default api;

