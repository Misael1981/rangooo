"use client"

import { useEffect, useState } from "react"
import SplashScreen from "../SplashScreen"

type AppLoaderProps = {
  children: React.ReactNode
}

function getInitialShowSplash() {
  // No SSR não existe window/localStorage, então protege isso
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

  return showSplash ? <SplashScreen /> : children
}
