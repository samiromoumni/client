import { motion } from 'framer-motion'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  )
}

export default LoadingSpinner


