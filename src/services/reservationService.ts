import api from './api';

export interface Reservation {
  _id: string;
  packageId: {
    _id: string;
    title: string;
    image?: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numberOfPersons: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

export const reservationService = {
  getAll: async (): Promise<Reservation[]> => {
    const response = await api.get('/reservations');
    return response.data;
  },

  getById: async (id: string): Promise<Reservation> => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<Reservation>): Promise<Reservation> => {
    const response = await api.put(`/reservations/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/reservations/${id}`);
  },
};


