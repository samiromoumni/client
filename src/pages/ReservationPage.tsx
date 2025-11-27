import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/datepicker.css'
import { packageService, Package } from '../services/packageService'
import { reservationService, CreateReservationDto } from '../services/reservationService'
import { formatPrice } from '../utils/format'
import LoadingSpinner from '../components/LoadingSpinner'

const reservationSchema = z.object({
  packageId: z.string().min(1, 'Please select a package'),
  fullName: z.string().min(2, 'Full name must contain at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  numberOfPersons: z.number().min(1, 'At least 1 person').max(20, 'Maximum 20 people'),
  startDate: z.date({ required_error: 'Please select a departure date' }),
  endDate: z.date({ required_error: 'Please select an arrival date' }),
  message: z.string().optional(),
}).refine((data) => data.endDate > data.startDate, {
  message: 'Arrival date must be after departure date',
  path: ['endDate'],
})

type ReservationFormData = z.infer<typeof reservationSchema>

function ReservationPage() {
  const location = useLocation()
  const [packages, setPackages] = useState<Package[]>([])
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      packageId: (location.state as any)?.packageId || '',
    },
  })

  const packageId = watch('packageId')
  const numberOfPersons = watch('numberOfPersons') || 1

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packageService.getAll({ availability: true })
        setPackages(data)
      } catch (error) {
        console.error('Error fetching packages:', error)
        toast.error('Erreur lors du chargement des forfaits')
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  useEffect(() => {
    if (packageId) {
      const pkg = packages.find((p) => p._id === packageId)
      setSelectedPackage(pkg || null)
    } else {
      setSelectedPackage(null)
    }
  }, [packageId, packages])

  const calculateTotalPrice = () => {
    if (!selectedPackage) return 0
    return selectedPackage.price * numberOfPersons
  }

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true)
    try {
      // Split fullName into firstName and lastName for backend
      const nameParts = data.fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || ''
      
      const reservationData: CreateReservationDto = {
        packageId: data.packageId,
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        numberOfPersons: data.numberOfPersons,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        specialRequests: data.message,
      }
      await reservationService.create(reservationData)
      toast.success('Reservation created successfully! You will receive a confirmation email.')
      reset()
      setStartDate(null)
      setEndDate(null)
      setSelectedPackage(null)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error creating reservation')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Réservation - Reliqua Travel</title>
        <meta name="description" content="Réservez votre voyage avec Reliqua Travel." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-heading font-bold mb-4"
          >
            Réservez votre voyage
          </motion.h1>
          <p className="text-xl text-gray-100">
            Remplissez le formulaire ci-dessous pour réserver votre forfait
          </p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-xl shadow-lg p-8 space-y-6"
            >
              {/* Package Selection (Where to) */}
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2">
                  Where to: *
                </label>
                <select
                  {...register('packageId')}
                  className="input-field"
                >
                  <option value="">-- Select a package --</option>
                  {packages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.title} - {pkg.destination}
                    </option>
                  ))}
                </select>
                {errors.packageId && (
                  <p className="mt-1 text-sm text-red-500">{errors.packageId.message}</p>
                )}
              </div>

              {selectedPackage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-primary/10 p-4 rounded-lg"
                >
                  <h3 className="font-semibold text-neutral mb-2">{selectedPackage.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{selectedPackage.description}</p>
                  <p className="text-sm text-gray-600">
                    Prix par personne: {formatPrice(selectedPackage.price, selectedPackage.currency)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Durée: {selectedPackage.duration} jour{selectedPackage.duration > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-600">
                    Maximum: {selectedPackage.maxPersons} personnes
                  </p>
                </motion.div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2">
                  Full Name: *
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2">
                  Email: *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="input-field"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2">
                  Phone Number: *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="input-field"
                  placeholder="Phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2">
                  Number of people: *
                </label>
                <input
                  type="number"
                  {...register('numberOfPersons', { valueAsNumber: true })}
                  min={1}
                  max={selectedPackage?.maxPersons || 20}
                  className="input-field"
                  placeholder="1"
                />
                {errors.numberOfPersons && (
                  <p className="mt-1 text-sm text-red-500">{errors.numberOfPersons.message}</p>
                )}
                {selectedPackage && (
                  <p className="mt-1 text-sm text-gray-500">
                    Maximum: {selectedPackage.maxPersons} people
                  </p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral mb-2">
                    Leaving: *
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date)
                      setValue('startDate', date as Date, { shouldValidate: true })
                    }}
                    minDate={new Date()}
                    className="input-field w-full"
                    placeholderText="mm/dd/yyyy --:-- --"
                    dateFormat="MM/dd/yyyy"
                    showTimeSelect
                    timeFormat="HH:mm"
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral mb-2">
                    Arrival: *
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date)
                      setValue('endDate', date as Date, { shouldValidate: true })
                    }}
                    minDate={startDate || new Date()}
                    className="input-field w-full"
                    placeholderText="mm/dd/yyyy --:-- --"
                    dateFormat="MM/dd/yyyy"
                    showTimeSelect
                    timeFormat="HH:mm"
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              {/* Message Section */}
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2">
                  Message:
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Enter your message or special requests..."
                />
              </div>

              {/* Total Price */}
              {selectedPackage && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-neutral">Prix total:</span>
                    <span className="text-2xl font-heading font-bold text-primary">
                      {formatPrice(calculateTotalPrice(), selectedPackage.currency)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {numberOfPersons} personne{numberOfPersons > 1 ? 's' : ''} ×{' '}
                    {formatPrice(selectedPackage.price, selectedPackage.currency)}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !selectedPackage}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Traitement en cours...' : 'Confirmer la réservation'}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </>
  )
}

export default ReservationPage

