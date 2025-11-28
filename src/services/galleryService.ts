import api from './api'

export interface GalleryImage {
  _id: string
  url: string
  title: string
  description?: string
  destination?: string
  uploadedAt: string
}

export const galleryService = {
  getAll: async (destination?: string): Promise<GalleryImage[]> => {
    const response = await api.get('/gallery', { params: { destination } })
    return response.data
  },
}




