import { Link } from 'react-router-dom'
// IMPORTANT: Remplacez cette ligne par le chemin de votre logo
// Exemples:
// import logoImage from '../assets/logo.png'
// import logoImage from '../assets/logo.jpg'
// import logoImage from '../assets/mon-logo.svg'
import logoImage from '../assets/logo.jpg'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

/**
 * Composant Logo utilisant une image (PNG, JPG, SVG)
 * 
 * Pour utiliser votre propre logo:
 * 1. Placez votre fichier logo dans client/src/assets/
 * 2. Modifiez l'import en haut de ce fichier
 * 3. Le logo s'affichera automatiquement
 */
function LogoImage({ className = '', showText = true, size = 'md', variant = 'dark' }: LogoProps) {
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

  // Determine text color based on variant
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
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span 
            className={`${textSizeClasses[size]} font-heading font-bold ${textColor} transition-colors duration-500 ease-in-out`}
          >
            RELIQUA TRAVEL
          </span>
          <span className={`text-xs md:text-sm ${subtitleColor} hidden md:block transition-colors duration-500 ease-in-out`}>
            Agence de voyage
          </span>
        </div>
      )}
    </Link>
  )
}

export default LogoImage

