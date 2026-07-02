import { sendPushToDeliveryPersons } from "@/app/action/send-push-to-delivery-persons"
import { sendPushToEstablishments } from "@/app/action/send-push-to-establishments"
import { sendPushToKDS } from "@/app/action/send-push-to-kds"
import { pusherServer } from "@/lib/pusher"
import { $Enums } from "@misael1981/rangooo-database"
import {
  Decimal,
  JsonValue,
} from "@misael1981/rangooo-database/generated-client/runtime/library"

type OrderWithRestaurant = {
  restaurantId: string
  id: string
  orderNumber: number | null
  consumptionMethod: $Enums.ConsumptionMethod
  createdAt: Date
  updatedAt: Date
  status: $Enums.OrderStatus
  userId: string
  totalAmount: Decimal
  deliveryFee: Decimal
  deliveryAddress: JsonValue | null
  customName: string | null
  extras: string | null
  printId: string | null
  paymentMethod: string | null
  deliveryPersonId: string | null
  restaurant: {
    id: string
    name: string
    slug: string
  }
}

export async function notifyNewOrder(order: OrderWithRestaurant) {
  const restaurantChannel = `restaurant-${order.restaurantId}`
  const kdsChannel = `kds-${order.restaurantId}`

  const pusherNotification = pusherServer
    .trigger([restaurantChannel, kdsChannel], "order:created", {
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        restaurantName: order.restaurant.name,
      },
    })
    .catch((err) => console.error("❌ Erro Pusher:", err))

  // 2. Web Push - Interceptando o erro 410 aqui
  const pushRestaurant = sendPushToEstablishments({
    slug: order.restaurant.slug,
    restaurantId: order.restaurantId,
  }).catch(async (err) => {
    if (err.statusCode === 410 || err.message?.includes("410")) {
      console.warn(`⚠️ Token expirado em Estabelecimentos (410).`)
      // Aqui você pode rodar a lógica para deletar as subs antigas do restauranteId se quiser
    } else {
      console.error("❌ Erro WebPush Estabelecimentos:", err)
    }
  })

  const pushKDS = sendPushToKDS({
    slug: order.restaurant.slug,
    restaurantId: order.restaurantId,
  }).catch((err) => console.error("❌ Erro WebPush KDS:", err))

  // Criamos o array de promises limpo
  const notifications: Promise<unknown>[] = [
    pusherNotification,
    pushRestaurant,
    pushKDS,
  ]

  // 3. Notificar Entregadores (Se for Delivery)
  if (order.consumptionMethod === "DELIVERY") {
    const pusherDelivery = pusherServer
      .trigger("delivery-orders", "order:created", {
        orderId: order.id,
        restaurantName: order.restaurant.name,
      })
      .catch((err) => console.error("❌ Erro Pusher Delivery:", err))

    const pushDelivery = sendPushToDeliveryPersons().catch((err) =>
      console.error("❌ Erro WebPush Entregadores:", err),
    )

    notifications.push(pusherDelivery, pushDelivery)
  }

  return Promise.allSettled(notifications)
}
