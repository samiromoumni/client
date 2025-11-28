// EXEMPLE DE CONFIGURATION POUR App.tsx
// Copiez ce code dans votre fichier App.tsx ou main.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/admin/LoginPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ReservationsPage from './pages/admin/ReservationsPage';
// Importez vos autres pages ici

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Route publique - Login */}
          <Route path="/admin/login" element={<LoginPage />} />
          
          {/* Routes protégées - Nécessitent l'authentification */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                {/* Remplacez par votre DashboardPage */}
                <div>Dashboard</div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute>
                <ReservationsPage />
              </ProtectedRoute>
            }
          />
          
          {/* Redirection par défaut */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

