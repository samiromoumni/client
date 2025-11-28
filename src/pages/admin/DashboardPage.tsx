import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaBox, FaCalendarCheck, FaImages, FaDollarSign, FaClock, FaCheckCircle, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa'
import { adminService, DashboardStats, ContactMessage } from '../../services/adminService'
import LoadingSpinner from '../../components/LoadingSpinner'
import { format } from 'date-fns'

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, messages] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getContactMessages(),
        ])
        setStats(statsData)
        // Get 5 most recent messages
        setRecentMessages(messages.slice(0, 5))
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
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
    {
      title: 'Messages',
      value: stats.totalContactMessages,
      icon: FaEnvelope,
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
    },
    {
      title: 'Non lus',
      value: stats.unreadContactMessages,
      icon: FaEnvelopeOpen,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      highlight: stats.unreadContactMessages > 0,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre site</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card.bgColor} rounded-xl p-6 shadow-sm ${
                card.highlight ? 'ring-2 ring-orange-300' : ''
              }`}
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

      {/* Recent Contact Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Messages de Contact Récents</h2>
            <p className="text-sm text-gray-600 mt-1">Derniers messages envoyés depuis le formulaire de contact</p>
          </div>
          <button
            onClick={() => navigate('/admin/contact')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Voir tous
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {recentMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FaEnvelope className="mx-auto text-4xl mb-4 text-gray-300" />
              <p>Aucun message de contact</p>
            </div>
          ) : (
            recentMessages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate('/admin/contact')}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{message.name}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          message.status === 'new'
                            ? 'bg-blue-100 text-blue-800'
                            : message.status === 'read'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {message.status === 'new' ? 'Nouveau' : message.status === 'read' ? 'Lu' : 'Répondu'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                    <p className="font-medium text-gray-800 mb-2">{message.subject}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                    {message.createdAt && (
                      <p className="text-xs text-gray-400 mt-2">
                        {format(new Date(message.createdAt), 'dd MMMM yyyy à HH:mm')}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

