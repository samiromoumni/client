import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { packageService, Package } from '../services/packageService'
import { galleryService, GalleryImage } from '../services/galleryService'
import PackageCard from '../components/PackageCard'
import LoadingSpinner from '../components/LoadingSpinner'

function HomePage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesData, galleryData] = await Promise.all([
          packageService.getAll({ availability: true }),
          galleryService.getAll(),
        ])
        setPackages(packagesData.slice(0, 6))
        setGalleryImages(galleryData.slice(0, 8))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Reliqua Travel - Agence de Voyage à Ain Temouchent</title>
        <meta
          name="description"
          content="Reliqua travel vous garantit un voyage agréable et confortable à des prix très compétitifs. Découvrez nos forfaits et réservez votre voyage dès maintenant."
        />
      </Helmet>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Animated Background Images */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80')",
            }}
          />
        </motion.div>
        
        {/* Gradient Overlay with Animation */}
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.8, 0.9, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 31, 63, 0.85) 0%, rgba(74, 144, 226, 0.75) 50%, rgba(80, 200, 120, 0.6) 100%)',
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 z-[15] overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-accent bg-clip-text text-transparent">
              JOURNEY TO EXPLORE WORLD
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg"
          >
            Reliqua travel vous garantit un voyage agréable et confortable à des prix très compétitifs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/packages" className="btn-primary text-lg px-8 py-4 inline-block">
                SEE OUR PACKAGES
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/reservation" className="btn-secondary text-lg px-8 py-4 bg-white text-primary inline-block">
                RESERVATION
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Packages Section with Background */}
      <section className="relative py-20 bg-neutral-light overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')",
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              CHECKOUT OUR PACKAGES
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Découvrez nos forfaits soigneusement sélectionnés pour vous offrir des expériences inoubliables
            </motion.p>
          </motion.div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <PackageCard key={pkg._id} package={pkg} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-12">
                  <p>Aucun packages disponible pour le moment.</p>
                </div>
              )}
            </div>
          )}

          {packages.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/packages" className="btn-primary">
                Voir tous les forfaits
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section with Background */}
      <section className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-accent/10 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              PHOTO'S FROM TRAVELLERS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-lg"
            >
              Découvrez les moments magiques partagés par nos voyageurs
            </motion.p>
          </motion.div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.length > 0 ? (
                galleryImages.map((image, index) => (
                  <motion.div
                    key={image._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-12">
                  <p>Aucune photo disponible pour le moment.</p>
                </div>
              )}
            </div>
          )}

          {galleryImages.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/gallery" className="btn-primary">
                Voir toute la galerie
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section with Animated Background */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80')",
            }}
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.9) 0%, rgba(80, 200, 120, 0.8) 100%)',
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-6 drop-shadow-2xl"
            >
              READY FOR UNFORGETTABLE TRAVEL. REMEMBER US!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-8 text-gray-100 drop-shadow-lg"
            >
              Réservez dès maintenant et vivez une expérience inoubliable
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/reservation" className="btn-secondary bg-white text-primary text-lg px-8 py-4 inline-block shadow-2xl">
                  Réserver maintenant
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default HomePage

