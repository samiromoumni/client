import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import LogoImage from './LogoImage'

function Footer() {
  const quickLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À Propos' },
    { path: '/packages', label: 'All Packages' },
    { path: '/gallery', label: 'Galerie' },
    { path: '/contact', label: 'Contact' },
    { path: '/reservation', label: 'Réservation' },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="bg-primary-dark text-white mt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <LogoImage showText={true} size="md" variant="light" className="mb-4" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 mb-4"
            >
              Votre agence de voyage de confiance à Ain Temouchent. Nous vous garantissons un voyage agréable et confortable à des prix très compétitifs.
            </motion.p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/share/18Fk1BV4ms/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, rotate: 360, y: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-white hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/reliquatravel?igsh=MXQ1cG1hcjFxdzF0OQ=="
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, rotate: 360, y: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-white hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@reliquatravel?_r=1&_t=ZN-91kg9kFt3UE"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, rotate: 360, y: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-white hover:text-accent transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h4
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-heading font-semibold mb-4 text-white"
            >
              Liens Rapides
            </motion.h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    <motion.span
                      whileHover={{ x: 5, scale: 1.05 }}
                      className="inline-block"
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h4
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-heading font-semibold mb-4 text-white"
            >
              Contact
            </motion.h4>
            <ul className="space-y-3">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-start space-x-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaMapMarkerAlt className="text-accent mt-1" />
                </motion.div>
                <span className="text-gray-300">
                  Zone Urbaine Cité Sidi Ali Cherif N° 12 Batiment N° 3,<br />
                  À Coté De AGB Banque,<br />
                  Ain Temouchent
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-start space-x-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaPhone className="text-accent mt-1" />
                </motion.div>
                <div className="flex flex-col space-y-1">
                  <motion.a
                    href="tel:+21343778080"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    ☎ +213 43 77 80 80
                  </motion.a>
                  <motion.a
                    href="https://wa.me/213670050063"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-1"
                  >
                    <FaWhatsapp size={16} />
                    <span>📱 +213 670 050 063 (Viber / WhatsApp)</span>
                  </motion.a>
                  <motion.a
                    href="https://wa.me/213793579209"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-1"
                  >
                    <FaWhatsapp size={16} />
                    <span>📱 +213 793 579 209 (Viber / WhatsApp)</span>
                  </motion.a>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaEnvelope className="text-accent" />
                </motion.div>
                <motion.a
                  href="mailto:Reliquatravel.B@Gmail.Com"
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  Reliquatravel.B@Gmail.Com
                </motion.a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Reliqua Travel. Tous droits réservés.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xs text-gray-500 mt-2"
          >
            Developed by{' '}
            <motion.span
              whileHover={{ scale: 1.2, color: '#4A90E2' }}
              className="text-gray-400"
            >
              xinos
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

