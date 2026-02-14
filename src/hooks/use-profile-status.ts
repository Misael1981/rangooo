"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { UserDTO as anyUserDTO } from "@/dtos/profile-status.dto";

// Tipagem para ajudar o TS e evitar o 'any'
interface ProfileData {
  isProfileCompleted: boolean | null;
  userData: anyUserDTO | null;
  loading: boolean;
}

export function useProfileStatus() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<ProfileData>({
    isProfileCompleted: null,
    userData: null,
    loading: true,
  });

  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile-status");
      if (!res.ok) throw new Error();
      const json = await res.json();

      setData({
        isProfileCompleted: json.isProfileCompleted,
        userData: json.userData,
        loading: false,
      });
    } catch (error) {
      setData({ isProfileCompleted: false, userData: null, loading: false });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      setData({ isProfileCompleted: false, userData: null, loading: false });
      return;
    }

    if (status === "authenticated" && session?.user?.id) {
      loadProfile();
    }
  }, [status, session?.user?.id, loadProfile]);

  return data;
}
