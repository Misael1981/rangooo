"use client"

import { UserDTO } from "@/dtos/profile-status.dto"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export function useProfileStatus() {
  const { data: session, status } = useSession()

  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean | null>(
    null,
  )
  const [userData, setUserData] = useState<UserDTO | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return

    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile-status")
        if (!res.ok) throw new Error()

        const json = await res.json()

        setIsProfileCompleted(json.isProfileCompleted)
        setUserData(json.userData)
      } catch (error) {
        setIsProfileCompleted(null)
        setUserData(null)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [status, session?.user?.id])

  const isUnauthenticated = status === "unauthenticated"

  return {
    isProfileCompleted: isUnauthenticated ? false : isProfileCompleted,
    userData: isUnauthenticated ? null : userData,
    isLoading: status === "loading" || loading,
  }
}
