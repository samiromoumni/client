import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaBox, FaCalendarCheck, FaImages, FaDollarSign, FaClock, FaCheckCircle } from 'react-icons/fa'
import { adminService, DashboardStats } from '../../services/adminService'
import LoadingSpinner from '../../components/LoadingSpinner'

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await adminService.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (!stats) {
    return <div className="text-center text-gray-500">Erreur lors du chargement des statistiques</div>
  }

  const statCards = [
    {
      title: 'Packages',
      value: stats.totalPackages,
      icon: FaBox,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Réservations',
      value: stats.totalReservations,
      icon: FaCalendarCheck,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'En attente',
      value: stats.pendingReservations,
      icon: FaClock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Confirmées',
      value: stats.confirmedReservations,
      icon: FaCheckCircle,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Revenus',
      value: `${stats.totalRevenue.toLocaleString()} DZD`,
      icon: FaDollarSign,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Images Galerie',
      value: stats.totalGalleryImages,
      icon: FaImages,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre site</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card.bgColor} rounded-xl p-6 shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="text-white text-xl" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage

