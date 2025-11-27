import api from './api'

export interface ContactMessage {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export const contactService = {
  send: async (data: ContactMessage): Promise<void> => {
    await api.post('/contact', data)
  },
}


