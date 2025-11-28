import api from './api';

export interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  image?: string;
  destination?: string;
  included?: string[];
  createdAt?: string;
}

export const packageService = {
  getAll: async (): Promise<Package[]> => {
    const response = await api.get('/packages');
    return response.data;
  },

  getById: async (id: string): Promise<Package> => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },
};

