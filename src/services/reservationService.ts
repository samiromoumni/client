import api from './api'

export interface Reservation {
  _id: string
  packageId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  numberOfPersons: number
  startDate: string
  endDate: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  specialRequests?: string
  createdAt: string
}

export interface CreateReservationDto {
  packageId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  numberOfPersons: number
  startDate: string
  endDate: string
  specialRequests?: string
}

export const reservationService = {
  create: async (data: CreateReservationDto): Promise<Reservation> => {
    const response = await api.post('/reservations', data)
    return response.data
  },
}


