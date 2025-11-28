import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaUpload, FaTimes } from 'react-icons/fa'
import { adminService, Package } from '../../services/adminService'
import { toast } from 'react-hot-toast'
import LoadingSpinner from '../../components/LoadingSpinner'

function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [formData, setFormData] = useState<Omit<Package, '_id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    description: '',
    destination: '',
    price: 0,
    currency: 'DZD',
    duration: 1,
    maxPersons: 1,
    availability: true,
    inclusions: [],
    exclusions: [],
    images: [],
  })

  useEffect(() => {
    loadPackages()
  }, [])

  const loadPackages = async () => {
    try {
      const data = await adminService.getPackages()
      setPackages(data)
    } catch (error) {
      toast.error('Erreur lors du chargement des packages')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingPackage?._id) {
        await adminService.updatePackage(editingPackage._id, formData)
        toast.success('Package modifié avec succès')
      } else {
        await adminService.createPackage(formData)
        toast.success('Package créé avec succès')
      }
      setShowModal(false)
      setEditingPackage(null)
      resetForm()
      loadPackages()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce package?')) return

    try {
      await adminService.deletePackage(id)
      toast.success('Package supprimé avec succès')
      loadPackages()
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg)
    setFormData({
      title: pkg.title,
      description: pkg.description,
      destination: pkg.destination,
      price: pkg.price,
      currency: pkg.currency,
      duration: pkg.duration,
      maxPersons: pkg.maxPersons,
      availability: pkg.availability,
      inclusions: pkg.inclusions,
      exclusions: pkg.exclusions,
      images: pkg.images,
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      destination: '',
      price: 0,
      currency: 'DZD',
      duration: 1,
      maxPersons: 1,
      availability: true,
      inclusions: [],
      exclusions: [],
      images: [],
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} n'est pas une image`)
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} est trop grande (max 10MB)`)
        }

        const url = await adminService.uploadPackageImage(file)
        return url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setFormData({
        ...formData,
        images: [...formData.images, ...uploadedUrls],
      })
      toast.success(`${uploadedUrls.length} image(s) uploadée(s) avec succès`)
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'upload des images')
    } finally {
      setUploadingImages(false)
      e.target.value = '' // Reset input
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion des Packages</h1>
          <p className="text-gray-600">Créez et gérez vos forfaits de voyage</p>
        </div>
        <button
          onClick={() => {
            setEditingPackage(null)
            resetForm()
            setShowModal(true)
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center space-x-2"
        >
          <FaPlus />
          <span>Nouveau Package</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durée</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disponibilité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {packages.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{pkg.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{pkg.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {pkg.price.toLocaleString()} {pkg.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{pkg.duration} jours</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pkg.availability
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {pkg.availability ? 'Disponible' : 'Indisponible'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => pkg._id && handleDelete(pkg._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingPackage ? 'Modifier le Package' : 'Nouveau Package'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Destination *</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prix *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Durée (jours) *</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max personnes *</label>
                  <input
                    type="number"
                    value={formData.maxPersons}
                    onChange={(e) => setFormData({ ...formData, maxPersons: Number(e.target.value) })}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-semibold text-gray-700">Disponible</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
                <div className="space-y-4">
                  {/* Upload Button */}
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition">
                    <div className="flex flex-col items-center">
                      <FaUpload className="text-gray-400 mb-2" size={24} />
                      <span className="text-sm text-gray-600">
                        {uploadingImages ? 'Upload en cours...' : 'Cliquez pour uploader des images'}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 10MB)</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploadingImages}
                      className="hidden"
                    />
                  </label>

                  {/* Preview Images */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.images.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingPackage(null)
                    resetForm()
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingPackage ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default PackagesPage

