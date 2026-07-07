"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { saveSubscriptionAction } from "@/app/action/save-subscription"

// Função utilitária obrigatória para o navegador aceitar sua chave VAPID
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function PushInitializer() {
  const { data: session } = useSession()

  useEffect(() => {
    // Só tenta registrar se o usuário estiver logado e se o navegador suportar push
    if (
      !session?.user?.id ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window)
    ) {
      return
    }

    async function initPush() {
      try {
        // 1. Registra o arquivo sw.js na pasta public
        const registration = await navigator.serviceWorker.register("/sw.js")

        // 2. Pede permissão para mandar notificações
        const permission = await Notification.requestPermission()
        if (permission !== "granted") {
          console.log("🔒 Permissão de notificação negada pelo usuário.")
          return
        }

        // 3. Gera a assinatura (o endereço único do dispositivo)
        const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        if (!publicKey) {
          console.error(
            "❌ NEXT_PUBLIC_VAPID_PUBLIC_KEY não configurada no .env",
          )
          return
        }

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        })

        // Converte o objeto do navegador para o formato texto/JSON limpo
        const subData = subscription.toJSON()

        if (!subData.endpoint || !subData.keys?.auth || !subData.keys?.p256dh) {
          return
        }

        // 4. Manda para a nossa Server Action salvar no banco do Rangooo
        await saveSubscriptionAction({
          endpoint: subData.endpoint,
          auth: subData.keys.auth,
          p256dh: subData.keys.p256dh,
        })

        console.log("🚀 Web Push inicializado e salvo com sucesso!")
      } catch (error) {
        console.error("❌ Erro ao inicializar o Web Push:", error)
      }
    }

    initPush()
  }, [session?.user?.id])

  return null
}
