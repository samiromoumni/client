import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { contactService } from '../services/contactService'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type ContactFormData = z.infer<typeof contactSchema>

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      await contactService.send(data)
      toast.success('Message envoyé avec succès! Nous vous répondrons bientôt.')
      reset()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'envoi du message')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-neutral mb-2">
          Nom complet *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="input-field"
          placeholder="Votre nom"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-neutral mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="input-field"
          placeholder="votre@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-neutral mb-2">
          Téléphone
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="input-field"
          placeholder="+213 XXX XX XX XX"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-neutral mb-2">
          Sujet *
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          className="input-field"
          placeholder="Sujet de votre message"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-neutral mb-2">
          Message *
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          className="input-field resize-none"
          placeholder="Votre message..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </motion.form>
  )
}

export default ContactForm

