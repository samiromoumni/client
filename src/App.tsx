import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './layouts/Layout'
import AdminLayout from './layouts/AdminLayout'
import PageTransition from './components/PageTransition'
import ProtectedRoute from './components/admin/ProtectedRoute'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import PackagesPage from './pages/PackagesPage'
import PackageDetailPage from './pages/PackageDetailPage'
import ContactPage from './pages/ContactPage'
import ReservationPage from './pages/ReservationPage'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import AdminPackagesPage from './pages/admin/PackagesPage'
import ReservationsPage from './pages/admin/ReservationsPage'
import GalleryAdminPage from './pages/admin/GalleryPage'

function App() {
  const location = useLocation()

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/*"
        element={
          <Layout>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <HomePage />
                    </PageTransition>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PageTransition>
                      <AboutPage />
                    </PageTransition>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <PageTransition>
                      <GalleryPage />
                    </PageTransition>
                  }
                />
                <Route
                  path="/packages"
                  element={
                    <PageTransition>
                      <PackagesPage />
                    </PageTransition>
                  }
                />
                <Route
                  path="/packages/:id"
                  element={
                    <PageTransition>
                      <PackageDetailPage />
                    </PageTransition>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageTransition>
                      <ContactPage />
                    </PageTransition>
                  }
                />
                <Route
                  path="/reservation"
                  element={
                    <PageTransition>
                      <ReservationPage />
                    </PageTransition>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Layout>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="packages" element={<AdminPackagesPage />} />
                <Route path="reservations" element={<ReservationsPage />} />
                <Route path="gallery" element={<GalleryAdminPage />} />
                <Route path="*" element={<DashboardPage />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App

