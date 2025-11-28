import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaAward, FaUsers, FaGlobe, FaHeart } from 'react-icons/fa'

function AboutPage() {
  const features = [
    {
      icon: <FaAward className="text-4xl text-primary" />,
      title: 'Expérience',
      description: 'Des années d\'expérience dans l\'organisation de voyages mémorables',
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: 'Équipe Dédiée',
      description: 'Une équipe passionnée à votre service pour rendre votre voyage parfait',
    },
    {
      icon: <FaGlobe className="text-4xl text-primary" />,
      title: 'Destinations',
      description: 'Un large choix de destinations pour tous les goûts et budgets',
    },
    {
      icon: <FaHeart className="text-4xl text-primary" />,
      title: 'Passion',
      description: 'Notre passion pour le voyage se reflète dans chaque détail',
    },
  ]

  return (
    <>
      <Helmet>
        <title>À Propos - Reliqua Travel</title>
        <meta name="description" content="Découvrez Reliqua Travel, votre agence de voyage de confiance à Ain Temouchent, Algérie." />
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
              À Propos de Reliqua Travel
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-100 drop-shadow-lg"
          >
            Découvrez notre histoire et notre passion pour le voyage
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="relative py-20 bg-neutral-light overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')",
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl font-heading font-bold text-neutral mb-6"
              >
                Notre Mission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-700 text-lg leading-relaxed mb-6"
              >
                Reliqua Travel est une agence de voyage basée à Ain Temouchent, en Algérie, 
                dédiée à offrir des expériences de voyage exceptionnelles à nos clients. 
                Nous croyons que chaque voyage devrait être une aventure mémorable, 
                et nous nous engageons à rendre cela possible.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-700 text-lg leading-relaxed mb-6"
              >
                Notre mission est de vous garantir un voyage agréable et confortable à des prix 
                très compétitifs. Nous travaillons avec les meilleurs partenaires pour vous offrir 
                des forfaits de qualité supérieure, que vous souhaitiez explorer les merveilles 
                locales ou découvrir des destinations internationales.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-700 text-lg leading-relaxed"
              >
                Chez Reliqua Travel, votre satisfaction est notre priorité. Nous sommes là pour 
                vous accompagner à chaque étape de votre voyage, de la planification à votre retour, 
                en vous offrant un service personnalisé et attentionné.
              </motion.p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-heading font-bold text-neutral mb-8 text-center"
              >
                Nos Valeurs
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15,
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 rounded-lg bg-gradient-to-br from-white to-blue-50/50 hover:shadow-xl transition-shadow duration-300"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring' }}
                      className="flex justify-center mb-4"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold text-neutral mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact CTA with Background */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="relative rounded-xl shadow-lg p-8 md:p-12 text-center overflow-hidden"
            >
              {/* Background Image */}
              <motion.div
                className="absolute inset-0 z-0"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80')",
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
              <div className="relative z-20 text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-heading font-bold mb-4"
                >
                  Prêt à commencer votre aventure?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl mb-6 text-gray-100"
                >
                  Contactez-nous dès aujourd'hui pour planifier votre prochain voyage
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="/contact" className="btn-secondary bg-white text-primary inline-block">
                    Nous contacter
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage

