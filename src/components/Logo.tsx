import { Link } from 'react-router-dom'
import logoImage from '../assets/logo.svg'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

function Logo({ className = '', showText = true, size = 'md', variant = 'dark' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 md:w-16 md:h-16',
    lg: 'w-20 h-20 md:w-24 md:h-24',
  }

  const textSizeClasses = {
    sm: 'text-sm md:text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl md:text-3xl',
  }

  const textColor = variant === 'light' ? 'text-white' : 'text-primary-dark'
  const subtitleColor = variant === 'light' ? 'text-gray-200' : 'text-gray-600'

  return (
    <Link to="/" className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} flex-shrink-0 relative`}>
        <img
          src={logoImage}
          alt="Reliqua Travel Logo"
          className="w-full h-full object-contain"
          style={{ display: 'block' }}
          onError={(e) => {
            console.error('Logo image failed to load, using fallback')
            // Fallback visuel si l'image ne charge pas
            const target = e.target as HTMLImageElement
            if (target) {
              target.style.display = 'none'
            }
          }}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-heading font-bold ${textColor}`}>
            RELIQUA TRAVEL
          </span>
          <span className={`text-xs md:text-sm ${subtitleColor} hidden md:block`}>
            Agence de voyage
          </span>
        </div>
      )}
    </Link>
  )
}

export default Logo

