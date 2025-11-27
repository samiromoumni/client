import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa'
import { packageService, Package } from '../services/packageService'
import { formatPrice, formatDuration } from '../utils/format'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

function PackageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [pkg, setPackage] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) {
        navigate('/packages')
        return
      }

      try {
        const data = await packageService.getById(id)
        setPackage(data)
      } catch (error: any) {
        toast.error('Forfait non trouvé')
        navigate('/packages')
      } finally {
        setLoading(false)
      }
    }
    fetchPackage()
  }, [id, navigate])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!pkg) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>{pkg.title} - Reliqua Travel</title>
        <meta name="description" content={pkg.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/80 z-10" />
        {pkg.images[0] && (
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${pkg.images[0]})` }}
          />
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">{pkg.title}</h1>
          <p className="text-xl text-gray-100">{pkg.destination}</p>
        </motion.div>
      </section>

      {/* Package Details */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-heading font-bold text-neutral mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
              </motion.div>

              {/* Images Gallery */}
              {pkg.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h2 className="text-3xl font-heading font-bold text-neutral mb-6">
                    Galerie
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {pkg.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${pkg.title} - Image ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-heading font-bold text-neutral mb-4 flex items-center">
                    <FaCheck className="text-accent mr-2" />
                    Inclus
                  </h3>
                  <ul className="space-y-2">
                    {pkg.inclusions.length > 0 ? (
                      pkg.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck className="text-accent mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">Aucune inclusion spécifiée</li>
                    )}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-heading font-bold text-neutral mb-4 flex items-center">
                    <FaTimes className="text-red-500 mr-2" />
                    Non inclus
                  </h3>
                  <ul className="space-y-2">
                    {pkg.exclusions.length > 0 ? (
                      pkg.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaTimes className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">Aucune exclusion spécifiée</li>
                    )}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-8 sticky top-24"
              >
                <div className="text-center mb-6">
                  <p className="text-4xl font-heading font-bold text-primary mb-2">
                    {formatPrice(pkg.price, pkg.currency)}
                  </p>
                  <p className="text-gray-600">par personne</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="text-primary mr-3" />
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="text-primary mr-3" />
                    <span>{formatDuration(pkg.duration)}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaUsers className="text-primary mr-3" />
                    <span>Jusqu'à {pkg.maxPersons} personnes</span>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        pkg.availability
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {pkg.availability ? 'Disponible' : 'Complet'}
                    </span>
                  </div>
                </div>

                {pkg.availability ? (
                  <Link
                    to="/reservation"
                    state={{ packageId: pkg._id }}
                    className="btn-primary w-full text-center block"
                  >
                    Réserver maintenant
                  </Link>
                ) : (
                  <button
                    disabled
                    className="btn-primary w-full opacity-50 cursor-not-allowed"
                  >
                    Non disponible
                  </button>
                )}

                <Link
                  to="/contact"
                  className="btn-secondary w-full text-center block mt-4"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PackageDetailPage

