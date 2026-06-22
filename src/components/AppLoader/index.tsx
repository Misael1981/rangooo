"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import SplashScreen from "../SplashScreen"

type AppLoaderProps = {
  children: React.ReactNode
}

function getInitialShowSplash() {
  if (typeof window === "undefined") return false

  const alreadySeen = localStorage.getItem("rangooo-splash")
  if (alreadySeen) return false

  localStorage.setItem("rangooo-splash", "true")
  return true
}

export default function AppLoader({ children }: AppLoaderProps) {
  const [showSplash, setShowSplash] = useState(getInitialShowSplash)

  useEffect(() => {
    if (!showSplash) return

    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [showSplash])

  return (
    <AnimatePresence mode="wait">
      {showSplash ? <SplashScreen key="splash" /> : <>{children}</>}
    </AnimatePresence>
  )
}
