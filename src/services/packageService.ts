import api from './api'

export interface Package {
  _id: string
  title: string
  description: string
  destination: string
  duration: number
  price: number
  currency: string
  images: string[]
  inclusions: string[]
  exclusions: string[]
  availability: boolean
  maxPersons: number
  createdAt: string
  updatedAt: string
}

export interface PackageFilters {
  destination?: string
  minPrice?: number
  maxPrice?: number
  minDuration?: number
  maxDuration?: number
  availability?: boolean
}

export const packageService = {
  getAll: async (filters?: PackageFilters): Promise<Package[]> => {
    const response = await api.get('/packages', { params: filters })
    return response.data
  },

  getById: async (id: string): Promise<Package> => {
    const response = await api.get(`/packages/${id}`)
    return response.data
  },
}


