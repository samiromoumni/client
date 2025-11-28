import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaHome,
  FaBox,
  FaCalendarCheck,
  FaImages,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-hot-toast'

interface AdminLayoutProps {
  children: React.ReactNode
}

function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Déconnexion réussie')
    navigate('/admin/login')
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FaChartBar },
    { path: '/admin/packages', label: 'Packages', icon: FaBox },
    { path: '/admin/reservations', label: 'Réservations', icon: FaCalendarCheck },
    { path: '/admin/gallery', label: 'Galerie', icon: FaImages },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            x: sidebarOpen ? 0 : window.innerWidth >= 1024 ? 0 : -280,
          }}
          className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:shadow-none border-r border-gray-200"
        >
          <div className="h-full flex flex-col">
            {/* Logo/Header */}
            <div className="p-6 border-b border-gray-200">
              <Link to="/admin/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <FaHome className="text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">Reliqua Admin</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      isActive(item.path)
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-gray-200 space-y-3">
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Connecté en tant que</p>
                <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

