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
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      
      // Don't redirect if already on login page
      if (currentPath.includes('/admin/login')) {
        return Promise.reject(error);
      }

      // Remove token
      localStorage.removeItem('adminToken');
      
      // Check if token was just set (within last 3 seconds) - if so, don't redirect
      const tokenJustSet = sessionStorage.getItem('tokenJustSet');
      if (!tokenJustSet) {
        // Use a small delay to avoid redirect loops and allow state to update
        setTimeout(() => {
          const stillOnProtectedRoute = !window.location.pathname.includes('/admin/login');
          if (stillOnProtectedRoute) {
            window.location.href = '/admin/login';
          }
        }, 200);
      } else {
        // Clear the flag after a delay
        setTimeout(() => {
          sessionStorage.removeItem('tokenJustSet');
        }, 3000);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

