"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import SplashScreen from "../SplashScreen"

type AppLoaderProps = {
  children: React.ReactNode
}

export default function AppLoader({ children }: AppLoaderProps) {
  const [mounted, setMounted] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)

      const alreadySeen = localStorage.getItem("rangooo-splash")

      if (alreadySeen) {
        setShowSplash(false)
      }
    }, 0)

    const alreadySeen =
      typeof window !== "undefined"
        ? localStorage.getItem("rangooo-splash")
        : null

    let timer: NodeJS.Timeout
    if (!alreadySeen) {
      timer = setTimeout(() => {
        localStorage.setItem("rangooo-splash", "true")
        setShowSplash(false)
      }, 1500)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  if (!mounted) {
    return <SplashScreen key="splash" />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!showSplash && children}
    </>
  )
}
