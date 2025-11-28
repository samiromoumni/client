import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, User } from '../services/authService'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser()
          if (currentUser) {
            // Verify token is still valid
            try {
              const verifiedUser = await authService.getMe()
              setUser(verifiedUser)
            } catch (error) {
              // Token invalid, logout
              authService.logout()
              setUser(null)
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        authService.logout()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })
      setUser(response.user)
      return response
    } catch (error) {
      console.error('Login error in context:', error)
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

