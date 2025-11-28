import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaTimes } from 'react-icons/fa'
import { galleryService, GalleryImage } from '../services/galleryService'
import LoadingSpinner from '../components/LoadingSpinner'

function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await galleryService.getAll()
        setImages(data)
        setFilteredImages(data)
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  useEffect(() => {
    if (selectedDestination === 'all') {
      setFilteredImages(images)
    } else {
      setFilteredImages(images.filter((img) => img.destination === selectedDestination))
    }
  }, [selectedDestination, images])

  const destinations = ['all', ...Array.from(new Set(images.map((img) => img.destination).filter(Boolean)))]

  return (
    <>
      <Helmet>
        <title>Galerie - Reliqua Travel</title>
        <meta name="description" content="Découvrez les photos de nos voyageurs et les destinations que nous proposons." />
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
              backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
            }}
          />
        </motion.div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.9) 0%, rgba(80, 200, 120, 0.7) 100%)',
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
              Galerie Photos
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-100 drop-shadow-lg"
          >
            Découvrez les moments magiques partagés par nos voyageurs
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {destinations.map((dest) => (
              <button
                key={dest}
                onClick={() => setSelectedDestination(dest)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedDestination === dest
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {dest === 'all' ? 'Toutes' : dest}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          {loading ? (
            <LoadingSpinner />
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                    <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="font-semibold">{image.title}</h3>
                      {image.destination && (
                        <p className="text-sm text-gray-200">{image.destination}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>Aucune photo disponible pour cette destination.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <FaTimes size={32} />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <h3 className="text-xl font-semibold mb-1">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-gray-300">{selectedImage.description}</p>
                )}
                {selectedImage.destination && (
                  <p className="text-sm text-gray-400 mt-2">📍 {selectedImage.destination}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GalleryPage

