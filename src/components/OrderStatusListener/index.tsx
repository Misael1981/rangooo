"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getPusherClient } from "@/lib/pusher"

export function OrderStatusListener() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.user?.id) return

    const pusher = getPusherClient()
    const channel = pusher.subscribe(`client-${session.user.id}`)

    channel.bind(
      "order-updated",
      (data: { orderNumber: number; status: string }) => {
        toast.success(`Pedido #${data.orderNumber} atualizado!`)
        router.refresh() // atualiza os cards da página
      },
    )

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(`client-${session.user.id}`)
    }
  }, [session?.user?.id, router])

  return null
}
