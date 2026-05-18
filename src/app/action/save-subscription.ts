"use server"

import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth" // Ou a sua estratégia de pegar sessão no server
import { authOptions } from "@/lib/auth" // Adapte para onde estão suas opções do NextAuth

interface SaveSubArgs {
  endpoint: string
  auth: string
  p256dh: string
}

export async function saveSubscriptionAction({
  endpoint,
  auth,
  p256dh,
}: SaveSubArgs) {
  // 1. Pega o usuário logado na sessão de forma segura (Server-side)
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("Não autorizado")
  }

  const userId = session.user.id

  // 2. Salva no banco. Usamos 'upsert' usando o endpoint como chave única
  // Isso evita duplicar o mesmo navegador várias vezes se o usuário deslogar/logar
  await db.clientPushSubscription.upsert({
    where: {
      endpoint: endpoint, // Lembra de colocar @unique no campo 'endpoint' na sua model do Prisma!
    },
    update: {
      userId: userId, // Atualiza o dono caso mude de conta no mesmo navegador
      auth,
      p256dh,
    },
    create: {
      userId,
      endpoint,
      auth,
      p256dh,
    },
  })

  return { success: true }
}
