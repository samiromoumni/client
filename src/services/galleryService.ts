import api from './api';

export interface GalleryImage {
  _id: string;
  image: string;
  title?: string;
  description?: string;
  createdAt?: string;
}

export const galleryService = {
  getAll: async (): Promise<GalleryImage[]> => {
    const response = await api.get('/gallery');
    return response.data;
  },
};

