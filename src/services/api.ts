import axios from 'axios'

// Use environment variable if set, otherwise use Render.com backend
const API_URL = import.meta.env.VITE_API_URL || 'https://server-ut7a.onrender.com/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds timeout (Render.com free tier can be slow to wake up)
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Don't set Content-Type for FormData - let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging
    console.error('API Error:', {
      code: error.code,
      message: error.message,
      response: error.response,
      request: error.request,
    })
    
    // Handle timeout errors (server might be spinning up on Render.com)
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout') || error.message === 'timeout of 30000ms exceeded') {
      error.message = 'Request timeout - Le serveur prend trop de temps à répondre. Veuillez réessayer.'
      error.isTimeout = true
    }
    
    // Handle network errors - no response means network issue
    // Check multiple conditions to catch all network error cases
    const isNetworkError = 
      !error.response && // No response from server
      (error.code === 'ERR_NETWORK' || 
       error.code === 'ECONNREFUSED' ||
       error.code === 'ETIMEDOUT' ||
       error.message?.includes('Network Error') ||
       error.message?.includes('Failed to fetch') ||
       error.message?.includes('Network request failed'))
    
    if (isNetworkError) {
      error.message = 'Erreur réseau - Impossible de se connecter au serveur. Vérifiez votre connexion internet.'
      error.isNetworkError = true
    }
    
    // Only handle 401 errors, and only if we're not already on login page
    if (error.response?.status === 401 && !window.location.pathname.includes('/admin/login')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Use replace to avoid adding to history
      window.location.replace('/admin/login')
    }
    return Promise.reject(error)
  }
)

export default api


