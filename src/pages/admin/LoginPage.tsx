import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'
import { FaPlane, FaMapMarkerAlt, FaSuitcase, FaGlobe } from 'react-icons/fa'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  // Watch for authentication changes after login
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Connexion réussie!')
      // Navigation will happen via useEffect when isAuthenticated changes
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Handle timeout errors (Render.com free tier can be slow to wake up)
      if (error.isTimeout || error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        toast.error('Le serveur prend du temps à démarrer. Veuillez réessayer dans quelques secondes.')
        return
      }
      
      // Handle network errors - check multiple conditions
      const isNetworkError = 
        error.isNetworkError || 
        !error.response || // No response usually means network error
        error.code === 'ERR_NETWORK' || 
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.message?.includes('Network Error') ||
        error.message?.includes('Failed to fetch') ||
        error.message?.includes('Network request failed')
      
      if (isNetworkError) {
        toast.error('Le serveur backend n\'est pas accessible. Vérifiez la connexion au serveur.')
        return
      }
      
      // Handle other errors
      const errorMessage = error.response?.data?.message || error.message || 'Erreur de connexion'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Travel Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80')",
          }}
        />
      </motion.div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0.85 }}
        animate={{ opacity: [0.85, 0.9, 0.85] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.85) 0%, rgba(99, 102, 241, 0.8) 50%, rgba(139, 92, 246, 0.75) 100%)',
        }}
      />

      {/* Floating Travel Icons */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000
          const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800
          const randomSize = 20 + Math.random() * 30
          const randomDuration = 15 + Math.random() * 10
          
          return (
            <motion.div
              key={i}
              className="absolute text-white/20"
              initial={{
                x: randomX,
                y: randomY,
                rotate: 0,
              }}
              animate={{
                y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : randomY + 100],
                x: [null, typeof window !== 'undefined' ? Math.random() * window.innerWidth : randomX + 100],
                rotate: [0, 360],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              style={{
                fontSize: `${randomSize}px`,
              }}
            >
              {i % 4 === 0 && <FaPlane />}
              {i % 4 === 1 && <FaMapMarkerAlt />}
              {i % 4 === 2 && <FaSuitcase />}
              {i % 4 === 3 && <FaGlobe />}
            </motion.div>
          )
        })}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-20 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20"
      >
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <FaPlane className="text-4xl text-indigo-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Admin Panel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 font-medium"
          >
            Reliqua Travel
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
              placeholder="votre@email.com"
            />
          </motion.div>

          {/* Password Field with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Mot de passe
            </label>
            <motion.input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
              placeholder="••••••••"
            />
          </motion.div>

          {/* Submit Button with Animation */}
          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Connexion...
              </motion.span>
            ) : (
              'Se connecter'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default LoginPage

