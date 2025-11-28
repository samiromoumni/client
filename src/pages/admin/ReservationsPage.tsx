import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaTimesCircle, FaClock, FaEye, FaTimes } from 'react-icons/fa'
import { adminService, Reservation } from '../../services/adminService'
import { toast } from 'react-hot-toast'
import LoadingSpinner from '../../components/LoadingSpinner'

function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = async () => {
    try {
      const data = await adminService.getReservations()
      setReservations(data)
    } catch (error) {
      toast.error('Erreur lors du chargement des réservations')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await adminService.updateReservation(id, { status })
      toast.success('Statut mis à jour avec succès')
      loadReservations()
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle />
      case 'cancelled':
        return <FaTimesCircle />
      default:
        return <FaClock />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion des Réservations</h1>
        <p className="text-gray-600">Consultez et gérez les réservations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Voyage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Personnes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {reservation.firstName} {reservation.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{reservation.email}</p>
                      <p className="text-sm text-gray-500">{reservation.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {reservation.package?.title || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {reservation.startDate && reservation.endDate
                      ? `${new Date(reservation.startDate).toLocaleDateString('fr-FR')} - ${new Date(reservation.endDate).toLocaleDateString('fr-FR')}`
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{reservation.numberOfPersons}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {reservation.totalPrice.toLocaleString()} DZD
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 w-fit ${getStatusBadge(
                        reservation.status
                      )}`}
                    >
                      {getStatusIcon(reservation.status)}
                      <span className="capitalize">{reservation.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedReservation(reservation)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                      >
                        <FaEye />
                      </button>
                      {reservation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => reservation._id && handleStatusChange(reservation._id, 'confirmed')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => reservation._id && handleStatusChange(reservation._id, 'cancelled')}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          >
                            Annuler
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Détails de la Réservation</h2>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Informations Client</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <span className="font-medium">Nom:</span> {selectedReservation.firstName}{' '}
                    {selectedReservation.lastName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {selectedReservation.email}
                  </p>
                  <p>
                    <span className="font-medium">Téléphone:</span> {selectedReservation.phone}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Détails du Voyage</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <span className="font-medium">Package:</span>{' '}
                    {selectedReservation.package?.title || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Date de départ:</span>{' '}
                    {selectedReservation.startDate
                      ? new Date(selectedReservation.startDate).toLocaleDateString('fr-FR')
                      : 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Date de retour:</span>{' '}
                    {selectedReservation.endDate
                      ? new Date(selectedReservation.endDate).toLocaleDateString('fr-FR')
                      : 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Nombre de personnes:</span> {selectedReservation.numberOfPersons}
                  </p>
                  <p>
                    <span className="font-medium">Prix total:</span>{' '}
                    {selectedReservation.totalPrice.toLocaleString()} DZD
                  </p>
                  <p>
                    <span className="font-medium">Statut:</span>{' '}
                    <span className="capitalize">{selectedReservation.status}</span>
                  </p>
                </div>
              </div>
              {selectedReservation.specialRequests && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Demandes spéciales</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedReservation.specialRequests}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ReservationsPage

