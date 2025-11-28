import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaCalendar, FaEnvelope, FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../services/api';

interface Statistics {
  totalPackages: number;
  totalReservations: number;
  totalMessages: number;
  pendingReservations: number;
}

const DashboardPage = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    totalPackages: 0,
    totalReservations: 0,
    totalMessages: 0,
    pendingReservations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch statistics from different endpoints
      const [packagesRes, reservationsRes, messagesRes] = await Promise.allSettled([
        api.get('/packages'),
        api.get('/reservations'),
        api.get('/contact'),
      ]);

      const stats: Statistics = {
        totalPackages: 0,
        totalReservations: 0,
        totalMessages: 0,
        pendingReservations: 0,
      };

      // Handle packages
      if (packagesRes.status === 'fulfilled') {
        stats.totalPackages = packagesRes.value.data?.length || 0;
      }

      // Handle reservations
      if (reservationsRes.status === 'fulfilled') {
        const reservations = reservationsRes.value.data || [];
        stats.totalReservations = reservations.length;
        stats.pendingReservations = reservations.filter(
          (r: any) => r.status === 'pending'
        ).length;
      }

      // Handle messages
      if (messagesRes.status === 'fulfilled') {
        stats.totalMessages = messagesRes.value.data?.length || 0;
      }

      setStatistics(stats);
    } catch (err: any) {
      console.error('Error fetching statistics:', err);
      // Don't show error toast, just set error state
      setError('Erreur lors du chargement des statistiques');
      // Don't redirect to login, just show the error
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de votre site</p>
      </div>

      {error && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={fetchStatistics}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Réessayer
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Packages Card */}
        <Link
          to="/admin/packages"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Packages</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {statistics.totalPackages}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaBox className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Link>

        {/* Reservations Card */}
        <Link
          to="/admin/reservations"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Réservations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {statistics.totalReservations}
              </p>
              {statistics.pendingReservations > 0 && (
                <p className="text-sm text-yellow-600 mt-1">
                  {statistics.pendingReservations} en attente
                </p>
              )}
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaCalendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Link>

        {/* Messages Card */}
        <Link
          to="/admin/messages"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Messages</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {statistics.totalMessages}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaEnvelope className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Link>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Actions Rapides</p>
              <div className="mt-2 space-y-2">
                <Link
                  to="/admin/packages"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  Gérer les packages
                </Link>
                <Link
                  to="/admin/reservations"
                  className="block text-green-600 hover:text-green-800 text-sm"
                >
                  Voir les réservations
                </Link>
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <FaUsers className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Activité Récente</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Réservations en attente</p>
              <p className="text-sm text-gray-600">
                {statistics.pendingReservations} réservation(s) nécessitent votre attention
              </p>
            </div>
            <Link
              to="/admin/reservations"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Voir →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

