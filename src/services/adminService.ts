import api from './api'

export interface Package {
  _id?: string
  title: string
  description: string
  destination: string
  price: number
  currency: string
  duration: number
  maxPersons: number
  availability: boolean
  inclusions: string[]
  exclusions: string[]
  images: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Reservation {
  _id?: string
  packageId: string
  package?: Package
  firstName: string
  lastName: string
  email: string
  phone: string
  travelDate: string
  numberOfPersons: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  specialRequests?: string
  createdAt?: string
  updatedAt?: string
}

export interface GalleryImage {
  _id?: string
  url: string
  alt?: string
  createdAt?: string
}

export interface DashboardStats {
  totalPackages: number
  totalReservations: number
  pendingReservations: number
  confirmedReservations: number
  totalRevenue: number
  totalGalleryImages: number
}

export const adminService = {
  // Packages
  getPackages: async (): Promise<Package[]> => {
    const response = await api.get<Package[]>('/packages')
    return response.data
  },

  getPackage: async (id: string): Promise<Package> => {
    const response = await api.get<Package>(`/packages/${id}`)
    return response.data
  },

  createPackage: async (data: Omit<Package, '_id' | 'createdAt' | 'updatedAt'>): Promise<Package> => {
    const response = await api.post<Package>('/packages', data)
    return response.data
  },

  updatePackage: async (id: string, data: Partial<Package>): Promise<Package> => {
    const response = await api.put<Package>(`/packages/${id}`, data)
    return response.data
  },

  deletePackage: async (id: string): Promise<void> => {
    await api.delete(`/packages/${id}`)
  },

  uploadPackageImage: async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', file)
    // Don't set Content-Type header - let axios set it automatically with boundary
    const response = await api.post<{ url: string }>('/packages/upload-image', formData)
    return response.data.url
  },

  // Reservations
  getReservations: async (): Promise<Reservation[]> => {
    const response = await api.get<Reservation[]>('/reservations')
    return response.data
  },

  getReservation: async (id: string): Promise<Reservation> => {
    const response = await api.get<Reservation>(`/reservations/${id}`)
    return response.data
  },

  updateReservation: async (id: string, data: Partial<Reservation>): Promise<Reservation> => {
    const response = await api.put<Reservation>(`/reservations/${id}`, data)
    return response.data
  },

  // Gallery
  getGalleryImages: async (): Promise<GalleryImage[]> => {
    const response = await api.get<GalleryImage[]>('/gallery')
    return response.data
  },

  uploadGalleryImage: async (file: File): Promise<GalleryImage> => {
    const formData = new FormData()
    formData.append('image', file)
    // Don't set Content-Type header - let axios set it automatically with boundary
    const response = await api.post<GalleryImage>('/gallery', formData)
    return response.data
  },

  deleteGalleryImage: async (id: string): Promise<void> => {
    await api.delete(`/gallery/${id}`)
  },

  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const [packages, reservations, gallery] = await Promise.all([
      adminService.getPackages(),
      adminService.getReservations(),
      adminService.getGalleryImages(),
    ])

    const totalRevenue = reservations
      .filter((r) => r.status === 'confirmed')
      .reduce((sum, r) => sum + (r.totalPrice || 0), 0)

    return {
      totalPackages: packages.length,
      totalReservations: reservations.length,
      pendingReservations: reservations.filter((r) => r.status === 'pending').length,
      confirmedReservations: reservations.filter((r) => r.status === 'confirmed').length,
      totalRevenue,
      totalGalleryImages: gallery.length,
    }
  },
}

