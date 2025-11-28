import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaTrash, FaUpload } from 'react-icons/fa'
import { adminService, GalleryImage } from '../../services/adminService'
import { toast } from 'react-hot-toast'
import LoadingSpinner from '../../components/LoadingSpinner'

function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const data = await adminService.getGalleryImages()
      setImages(data)
    } catch (error) {
      toast.error('Erreur lors du chargement des images')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('L\'image est trop grande (max 10MB)')
      return
    }

    setUploading(true)
    try {
      await adminService.uploadGalleryImage(file)
      toast.success('Image uploadée avec succès')
      loadImages()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'upload')
    } finally {
      setUploading(false)
      e.target.value = '' // Reset input
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image?')) return

    try {
      await adminService.deleteGalleryImage(id)
      toast.success('Image supprimée avec succès')
      loadImages()
    } catch (error) {
      toast.error('Erreur lors de la suppression')
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion de la Galerie</h1>
          <p className="text-gray-600">Ajoutez et gérez les images de votre galerie</p>
        </div>
        <label className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center space-x-2 cursor-pointer">
          <FaUpload />
          <span>{uploading ? 'Upload en cours...' : 'Uploader une image'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">Aucune image dans la galerie</p>
          <p className="text-gray-400 mt-2">Commencez par uploader une image</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden group relative"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={image.url}
                  alt={image.alt || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 truncate">{image.alt || 'Sans titre'}</p>
                {image.createdAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(image.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => image._id && handleDelete(image._id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GalleryPage

