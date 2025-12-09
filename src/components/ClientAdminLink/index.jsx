"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserStar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getSlugByUser } from "@/app/actions/get-slug-by-user";
import { useEffect, useRef, useState } from "react";

export function ClientAdminLink() {
  const { data: session, status } = useSession();
  const [slug, setSlug] = useState(null);
  const [loading, setLoading] = useState(true);
  const slugCache = useRef(new Map());

  useEffect(() => {
    async function fetchSlug() {
      if (status === "loading" || !session?.user?.id) {
        setLoading(false);
        return;
      }

      // ADMIN não precisa buscar slug, vai para /admin/rangooo
      if (session.user.role === "ADMIN") {
        setLoading(false);
        return;
      }

      const cacheKey = `${session.user.id}-${session.user.role}`;

      if (slugCache.current.has(cacheKey)) {
        setSlug(slugCache.current.get(cacheKey));
        setLoading(false);
        return;
      }

      try {
        const userSlug = await getSlugByUser(session.user.id);
        setSlug(userSlug);
        slugCache.current.set(cacheKey, userSlug);
      } catch (error) {
        console.error("Erro ao buscar slug:", error);
        setSlug(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSlug();
  }, [session, status]);

  if (status === "loading" || loading) {
    return null;
  }

  if (!session?.user) {
    return null;
  }

  const { role } = session.user;
  const isAuthorized = role === "ADMIN" || role === "RESTAURANT_OWNER";

  if (!isAuthorized) {
    return null;
  }

  // Se for RESTAURANT_OWNER mas não tem slug, não mostra o link
  if (role === "RESTAURANT_OWNER" && !slug) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={role === "ADMIN" ? "/admin/rangooo" : `/admin/${slug}`}
        className="w-full rounded px-2 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <span className="flex items-center gap-2">
          <UserStar className="text-yellow-500" />
          {role === "ADMIN" ? "Painel Admin" : "Dashboard Administrativo"}
        </span>
      </Link>
      <Separator className="bg-gray-500" />
    </div>
  );
}
