"use server"

import webpush from "web-push"
import { db } from "@/lib/prisma"

webpush.setVapidDetails(
  "mailto:seu@email.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

export async function sendPushToDeliveryPersons() {
  const subscriptions = await db.pushSubscription.findMany()

  const notifications = subscriptions.map(async (sub) => {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { auth: sub.auth, p256dh: sub.p256dh },
        },
        JSON.stringify({
          title: "🛵 Novo pedido disponível!",
          body: "Toque para ver o pedido",
          url: "/entregador/dashboard",
        }),
      )
    } catch (err: unknown) {
      if ((err as { statusCode: number }).statusCode === 410) {
        console.warn(`🧹 Limpando token expirado de entregador ID: ${sub.id}`)

        await db.pushSubscription
          .delete({
            where: { id: sub.id },
          })
          .catch((dbErr) =>
            console.error("Erro ao deletar subscription:", dbErr),
          )
      } else {
        console.error(`❌ Erro no push para o entregador ${sub.id}:`, err)
      }
    }
  })

  await Promise.all(notifications)
}
