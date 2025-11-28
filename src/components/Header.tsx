import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebook, FaInstagram, FaPhone, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import LogoImage from './LogoImage'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT US' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/contact', label: 'CONTACT US' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-50 shadow-md bg-white"
    >
      <div className="flex h-20">
        {/* Logo Section - Always White */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white flex items-center px-4 md:px-8 flex-shrink-0"
        >
          <LogoImage />
        </motion.div>

        {/* Navigation Section */}
        <div className="flex-1 bg-white">
          <div className="container mx-auto px-4 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`font-semibold transition-all duration-300 relative ${
                        isActive(link.path)
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-neutral hover:text-primary'
                      }`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="inline-block"
                      >
                        {link.label}
                      </motion.span>
                      {isActive(link.path) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Right Side - Phone & Social */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden md:flex items-center space-x-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <motion.a
                    href="tel:+21343778080"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-neutral hover:text-primary transition-colors"
                    title="Téléphone"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <FaPhone className="text-primary" />
                    </motion.div>
                    <span className="font-semibold">043 77 80 80</span>
                  </motion.a>
                  <motion.a
                    href="https://wa.me/213670050063"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-green-600 hover:text-green-700 transition-colors"
                    title="WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </motion.a>
                </motion.div>
                <div className="flex items-center space-x-3">
                  <motion.a
                    href="https://www.facebook.com/share/18Fk1BV4ms/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 360, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-primary hover:text-primary-dark transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebook size={20} />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/reliquatravel?igsh=MXQ1cG1hcjFxdzF0OQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 360, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-primary hover:text-primary-dark transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={20} />
                  </motion.a>
                  <motion.a
                    href="https://www.tiktok.com/@reliquatravel?_r=1&_t=ZN-91kg9kFt3UE"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 360, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-primary hover:text-primary-dark transition-colors"
                    aria-label="TikTok"
                  >
                    <FaTiktok size={20} />
                  </motion.a>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/reservation"
                    className="btn-primary"
                  >
                    RESERVATION
                  </Link>
                </motion.div>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-semibold py-2 ${
                      isActive(link.path) ? 'text-primary' : 'text-neutral'
                    }`}
                  >
                    <motion.span
                      whileHover={{ x: 10, scale: 1.05 }}
                      className="inline-block"
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              <div className="space-y-2">
                <a
                href="tel:+21343778080"
                className="flex items-center space-x-2 text-neutral py-2"
              >
                <FaPhone className="text-primary" />
                <span className="font-semibold">☎ 043 77 80 80</span>
              </a>
              <a
                href="https://wa.me/213670050063"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-600 py-2"
              >
                <FaWhatsapp size={20} />
                <span className="font-semibold">📱 +213 670 050 063</span>
              </a>
              <a
                href="https://wa.me/213793579209"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-600 py-2"
              >
                <FaWhatsapp size={20} />
                <span className="font-semibold">📱 +213 793 579 209</span>
              </a>
              </div>
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://www.facebook.com/share/18Fk1BV4ms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com/reliquatravel?igsh=MXQ1cG1hcjFxdzF0OQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@reliquatravel?_r=1&_t=ZN-91kg9kFt3UE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                  aria-label="TikTok"
                >
                  <FaTiktok size={24} />
                </a>
              </div>
              <Link
                to="/reservation"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary block text-center mt-4"
              >
                RESERVATION
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header

