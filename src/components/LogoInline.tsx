import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

function LogoInline({ className = '', showText = true, size = 'md', variant = 'dark' }: LogoProps) {
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
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="airplaneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>
          
          {/* Globe */}
          <circle cx="150" cy="150" r="100" fill="url(#globeGradient)" />
          
          {/* Continents */}
          <path
            d="M 50 60 Q 55 55 60 60 Q 65 65 70 70 Q 75 75 80 80 Q 75 85 70 90 Q 65 95 60 100 Q 55 105 50 100 Z"
            fill="#1E3A8A"
            opacity="0.85"
          />
          <path
            d="M 70 120 Q 75 115 80 120 Q 85 125 90 130 Q 95 135 100 140 Q 95 150 90 160 Q 85 165 80 170 Q 75 175 70 170 Z"
            fill="#1E3A8A"
            opacity="0.85"
          />
          <path
            d="M 180 80 Q 185 75 190 80 Q 195 85 200 90 Q 205 95 210 100 Q 205 105 200 110 Q 195 115 190 120 Q 185 125 180 120 Z"
            fill="#1E3A8A"
            opacity="0.85"
          />
          <path
            d="M 200 120 Q 205 115 210 120 Q 215 125 220 130 Q 225 140 230 150 Q 225 160 220 170 Q 215 175 210 180 Q 205 185 200 180 Z"
            fill="#1E3A8A"
            opacity="0.85"
          />
          <path
            d="M 220 70 Q 225 65 230 70 Q 235 75 240 80 Q 245 85 250 90 Q 245 100 240 110 Q 235 115 230 120 Q 225 125 220 120 Z"
            fill="#1E3A8A"
            opacity="0.85"
          />
          
          {/* Avion */}
          <g transform="translate(150, 150) rotate(-10)" filter="url(#shadow)">
            <ellipse cx="0" cy="0" rx="70" ry="12" fill="url(#airplaneGradient)" />
            <path d="M -30 -8 L -50 -25 L -45 -8 L -30 -8 Z" fill="url(#airplaneGradient)" />
            <path d="M -30 8 L -50 25 L -45 8 L -30 8 Z" fill="url(#airplaneGradient)" />
            <path d="M 30 -8 L 50 -25 L 45 -8 L 30 -8 Z" fill="url(#airplaneGradient)" />
            <path d="M 30 8 L 50 25 L 45 8 L 30 8 Z" fill="url(#airplaneGradient)" />
            <ellipse cx="-35" cy="-18" rx="6" ry="8" fill="#1E40AF" opacity="0.9" />
            <ellipse cx="-35" cy="-18" rx="4" ry="5" fill="#60A5FA" />
            <ellipse cx="-40" cy="-20" rx="5" ry="7" fill="#1E40AF" opacity="0.9" />
            <ellipse cx="-40" cy="-20" rx="3" ry="4" fill="#60A5FA" />
            <ellipse cx="35" cy="-18" rx="6" ry="8" fill="#1E40AF" opacity="0.9" />
            <ellipse cx="35" cy="-18" rx="4" ry="5" fill="#60A5FA" />
            <ellipse cx="40" cy="-20" rx="5" ry="7" fill="#1E40AF" opacity="0.9" />
            <ellipse cx="40" cy="-20" rx="3" ry="4" fill="#60A5FA" />
            <path d="M -60 0 L -75 -15 L -75 15 Z" fill="url(#airplaneGradient)" />
            <rect x="55" y="-6" width="12" height="12" rx="2" fill="#93C5FD" opacity="0.9" />
            <rect x="57" y="-4" width="8" height="8" rx="1" fill="#DBEAFE" />
          </g>
        </svg>
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

export default LogoInline


