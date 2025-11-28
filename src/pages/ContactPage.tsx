import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa'
import ContactForm from '../components/ContactForm'

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact - Reliqua Travel</title>
        <meta name="description" content="Contactez Reliqua Travel pour toute question ou réservation." />
      </Helmet>

      {/* Hero Section with Background */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80')",
            }}
          />
        </motion.div>
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.9) 0%, rgba(0, 31, 63, 0.85) 100%)',
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-heading font-bold mb-4 drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-accent bg-clip-text text-transparent">
              Contactez-nous
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-100 drop-shadow-lg"
          >
            Nous sommes là pour répondre à toutes vos questions
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 bg-neutral-light overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-heading font-bold text-neutral mb-6"
              >
                Envoyez-nous un message
              </motion.h2>
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-heading font-bold text-neutral mb-6"
                >
                  Informations de contact
                </motion.h2>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-primary/10 p-3 rounded-lg"
                    >
                      <FaMapMarkerAlt className="text-primary text-xl" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-neutral mb-1">Adresse</h3>
                      <p className="text-gray-600">
                        Zone Urbaine Cité Sidi Ali Cherif N° 12 Batiment N° 3,<br />
                        À Coté De AGB Banque,<br />
                        Ain Temouchent
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-primary/10 p-3 rounded-lg"
                    >
                      <FaPhone className="text-primary text-xl" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-neutral mb-2">Téléphone</h3>
                      <div className="space-y-2">
                        <div>
                          <a
                            href="tel:+21343778080"
                            className="text-primary hover:underline flex items-center"
                          >
                            <FaPhone className="mr-2" size={14} />
                            ☎ +213 43 77 80 80
                          </a>
                        </div>
                        <div>
                          <a
                            href="https://wa.me/213670050063"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 hover:underline flex items-center"
                          >
                            <FaWhatsapp className="mr-2" size={16} />
                            📱 +213 670 050 063 (Viber / WhatsApp)
                          </a>
                        </div>
                        <div>
                          <a
                            href="https://wa.me/213793579209"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 hover:underline flex items-center"
                          >
                            <FaWhatsapp className="mr-2" size={16} />
                            📱 +213 793 579 209 (Viber / WhatsApp)
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-primary/10 p-3 rounded-lg"
                    >
                      <FaEnvelope className="text-primary text-xl" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-neutral mb-1">Email</h3>
                      <a
                        href="mailto:Reliquatravel.B@Gmail.Com"
                        className="text-primary hover:underline"
                      >
                        Reliquatravel.B@Gmail.Com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-primary/10 p-3 rounded-lg"
                    >
                      <FaClock className="text-primary text-xl" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-neutral mb-1">Horaires d'ouverture</h3>
                      <p className="text-gray-600">
                        Samedi - Jeudi: 8h00 - 18h00<br />
                        Vendredi: Fermé
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Google Maps */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.5!2d-1.12054!3d35.31208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzVAsDE4JzQzLjUiTiAxwrAwNycxNC4wIlc!5e0!3m2!1sfr!2sdz!4v1234567890123!5m2!1sfr!2sdz&q=Zone+Urbaine+Cité+Sidi+Ali+Cherif+N°+12+Batiment+N°+3,+À+Coté+De+AGB+Banque,+Ain+Temouchent,+Algeria"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Reliqua Travel - Zone Urbaine Cité Sidi Ali Cherif N° 12 Batiment N° 3, À Coté De AGB Banque, Ain Temouchent"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage

