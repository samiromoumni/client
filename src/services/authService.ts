import api from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  username: string
  email: string
  role: string
}

export interface LoginResponse {
  token: string
  user: User
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  getToken: (): string | null => {
    return localStorage.getItem('token')
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token')
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<any>('/auth/me')
    // Normalize the response - backend returns _id, we need id
    return {
      id: response.data._id || response.data.id,
      username: response.data.username,
      email: response.data.email,
      role: response.data.role,
    }
  },
}

