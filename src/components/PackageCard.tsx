import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package } from '../services/packageService'
import { formatPrice, formatDuration } from '../utils/format'
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'

interface PackageCardProps {
  package: Package
  index?: number
}

function PackageCard({ package: pkg, index = 0 }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.images[0] || '/placeholder-travel.jpg'}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {!pkg.availability && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Complet
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-neutral mb-2">{pkg.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="text-primary mr-2" />
            <span>{pkg.destination}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="text-primary mr-2" />
            <span>{formatDuration(pkg.duration)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaUsers className="text-primary mr-2" />
            <span>Jusqu'à {pkg.maxPersons} personnes</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-2xl font-heading font-bold text-primary">
              {formatPrice(pkg.price, pkg.currency)}
            </p>
            <p className="text-sm text-gray-500">par personne</p>
          </div>
          <Link
            to={`/packages/${pkg._id}`}
            className="btn-primary"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default PackageCard

