"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <Image
          src="/logo-rangooo.svg"
          width={120}
          height={120}
          alt="Logo do Rangooo"
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  )
}

export default SplashScreen
