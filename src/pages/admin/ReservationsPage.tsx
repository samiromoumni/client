import { useEffect, useState } from 'react';
import { reservationService, Reservation } from '../../services/reservationService';
import toast from 'react-hot-toast';
import { FaTrash, FaCalendar, FaEnvelope, FaPhone, FaUsers, FaDollarSign, FaBox } from 'react-icons/fa';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationService.getAll();
      setReservations(data);
    } catch (error: any) {
      toast.error('Erreur lors du chargement des réservations');
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      return;
    }

    try {
      setDeletingId(id);
      await reservationService.delete(id);
      toast.success('Réservation supprimée avec succès');
      setReservations(reservations.filter((r) => r._id !== id));
    } catch (error: any) {
      toast.error('Erreur lors de la suppression de la réservation');
      console.error('Error deleting reservation:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'cancelled':
        return 'Annulée';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Réservations</h1>
        <p className="text-gray-600 mt-2">Gérez toutes les réservations de votre site</p>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">Aucune réservation pour le moment</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {reservation.firstName} {reservation.lastName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        reservation.status
                      )}`}
                    >
                      {getStatusText(reservation.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <FaBox className="w-4 h-4" />
                    <span className="font-medium">{reservation.packageId?.title || 'Package supprimé'}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(reservation._id)}
                  disabled={deletingId === reservation._id}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Supprimer la réservation"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaEnvelope className="w-4 h-4 text-gray-500" />
                  <span>{reservation.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaPhone className="w-4 h-4 text-gray-500" />
                  <span>{reservation.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUsers className="w-4 h-4 text-gray-500" />
                  <span>{reservation.numberOfPersons} personne(s)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCalendar className="w-4 h-4 text-gray-500" />
                  <span>Du {formatDate(reservation.startDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCalendar className="w-4 h-4 text-gray-500" />
                  <span>Au {formatDate(reservation.endDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaDollarSign className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{reservation.totalPrice} DZD</span>
                </div>
              </div>

              {reservation.specialRequests && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Demandes spéciales :</span>{' '}
                    {reservation.specialRequests}
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Réservation créée le {formatDate(reservation.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;


