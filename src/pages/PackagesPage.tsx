import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { packageService, Package } from '../services/packageService'
import LoadingSpinner from '../components/LoadingSpinner'

function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packageService.getAll({ availability: true })
        setPackages(data)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  return (
    <>
      <Helmet>
        <title>All Packages - Reliqua Travel</title>
        <meta name="description" content="Discover all our travel packages at competitive prices." />
      </Helmet>

      {/* Hero Section with Background */}
      <section className="relative py-20 text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')",
            }}
          />
        </motion.div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.9) 0%, rgba(0, 31, 63, 0.85) 100%)',
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-heading font-bold mb-4 drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-accent bg-clip-text text-transparent">
              All Packages
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-100 drop-shadow-lg"
          >
            Découvrez nos offres exceptionnelles pour votre prochain voyage
          </motion.p>
        </div>
      </section>

      {/* Packages List */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          {loading ? (
            <LoadingSpinner />
          ) : packages.length > 0 ? (
            <div className="space-y-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => navigate(`/packages/${pkg._id}`)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-1/3 h-64 md:h-auto">
                      <img
                        src={pkg.images[0] || '/placeholder-travel.jpg'}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-neutral mb-2">
                          {pkg.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {pkg.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {pkg.destination}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {pkg.duration} days
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            Up to {pkg.maxPersons} people
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-2xl font-heading font-bold text-primary">
                            {new Intl.NumberFormat('fr-DZ', {
                              style: 'currency',
                              currency: pkg.currency || 'DZD',
                              minimumFractionDigits: 0,
                            }).format(pkg.price)}
                          </p>
                          <p className="text-sm text-gray-500">per person</p>
                        </div>
                        <button className="btn-primary">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
                <div className="text-center text-gray-500 py-12">
                  <p>Aucun packages disponible pour le moment.</p>
                </div>
          )}
        </div>
      </section>
    </>
  )
}

export default PackagesPage

