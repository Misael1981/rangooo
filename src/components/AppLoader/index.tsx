"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import SplashScreen from "../SplashScreen"

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const alreadySeen = localStorage.getItem("rangooo-splash")

    if (alreadySeen) {
      // Adia a execução para fora do fluxo de render síncrono do React
      setTimeout(() => {
        setShowSplash(false)
      }, 0)
      return
    }

    const timer = setTimeout(() => {
      localStorage.setItem("rangooo-splash", "true")
      setShowSplash(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <div key="content" className="animate-in fade-in duration-500">
            {children}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
