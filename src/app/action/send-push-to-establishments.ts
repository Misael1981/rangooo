"use server";

import webpush from "web-push";
import { db } from "@/lib/prisma";

webpush.setVapidDetails(
  "mailto:seu@email.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function sendPushToEstablishments({ slug }: { slug: string }) {
  const subscriptions = await db.pushSubscription.findMany();

  const notifications = subscriptions.map((sub) =>
    webpush
      .sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { auth: sub.auth, p256dh: sub.p256dh },
        },
        JSON.stringify({
          title: "Novo pedido disponível!",
          body: "Toque para ver o pedido",
          url: `https://admin-rangooo.vercel.app/${slug}/pedidos`,
        }),
      )
      .catch((err) => console.error("Erro ao enviar push:", err)),
  );

  await Promise.all(notifications);
}
