import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaBox, FaCalendarCheck, FaImages, FaDollarSign, FaClock, FaCheckCircle, FaEnvelope, FaEnvelopeOpen, FaTimes, FaUser, FaPhone, FaCalendar } from 'react-icons/fa'
import { adminService, DashboardStats, ContactMessage } from '../../services/adminService'
import LoadingSpinner from '../../components/LoadingSpinner'
import { format } from 'date-fns'

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [allMessages, setAllMessages] = useState<ContactMessage[]>([])
  const [showAllMessages, setShowAllMessages] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
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
        setAllMessages(messages)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const displayedMessages = showAllMessages ? allMessages : allMessages.slice(0, 5)

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
            <p className="text-sm text-gray-600 mt-1">
              {showAllMessages ? 'Tous les messages' : 'Derniers messages envoyés depuis le formulaire de contact'}
            </p>
          </div>
          <div className="flex gap-2">
            {allMessages.length > 5 && (
              <button
                onClick={() => setShowAllMessages(!showAllMessages)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                {showAllMessages ? 'Voir moins' : `Voir tous (${allMessages.length})`}
              </button>
            )}
            <button
              onClick={() => navigate('/admin/contact')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Gérer
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {displayedMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FaEnvelope className="mx-auto text-4xl mb-4 text-gray-300" />
              <p>Aucun message de contact</p>
            </div>
          ) : (
            displayedMessages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedMessage(message)}
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

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setSelectedMessage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Détails du Message</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaUser className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">Nom</span>
                    </div>
                    <p className="text-gray-800">{selectedMessage.name}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaEnvelope className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">Email</span>
                    </div>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  {selectedMessage.phone && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FaPhone className="text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700">Téléphone</span>
                      </div>
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-700">Sujet</span>
                    </div>
                    <p className="text-gray-800">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-700">Message</span>
                    </div>
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  {selectedMessage.createdAt && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FaCalendar className="text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700">Date</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {format(new Date(selectedMessage.createdAt), 'dd MMMM yyyy à HH:mm')}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedMessage(null)
                        navigate('/admin/contact')
                      }}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Gérer ce message
                    </button>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DashboardPage

