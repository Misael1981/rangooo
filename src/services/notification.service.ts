import { sendPushToDeliveryPersons } from "@/app/action/send-push-to-delivery-persons"
import { sendPushToEstablishments } from "@/app/action/send-push-to-establishments"
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

  // 1. Notificar o Estabelecimento (Pusher)
  const pusherRestaurant = pusherServer
    .trigger(restaurantChannel, "order:created", {
      order: {
        id: order.id,
        restaurantName: order.restaurant.name,
        restaurantId: order.restaurantId,
      },
      consoleTolog: `Pedido #${order.orderNumber} disparado para canal: ${restaurantChannel}`,
    })
    .catch((err) => console.error("❌ Erro Pusher Estabelecimento:", err))

  // 2. Notificar o Estabelecimento (Web Push)
  const pushRestaurant = sendPushToEstablishments({
    slug: order.restaurant.slug,
    restaurantId: order.restaurantId,
  }).catch((err) => console.error("❌ Erro Push:", err))

  const notifications = [pusherRestaurant, pushRestaurant]

  // 3. Notificar Entregadores (Se for Delivery)
  if (order.consumptionMethod === "DELIVERY") {
    const pusherDelivery = pusherServer
      .trigger("delivery-orders", "order:created", {
        orderId: order.id,
        restaurantName: order.restaurant.name,
        restaurantId: order.restaurantId,
      })
      .catch((err) => console.error("❌ Erro Pusher Entregadores:", err))

    const pushDelivery = sendPushToDeliveryPersons().catch((err) =>
      console.error("❌ Erro Push Entregadores:", err),
    )

    notifications.push(pusherDelivery, pushDelivery)
  }

  // Usamos Promise.allSettled para que uma falha no Pusher não cancele o envio do Push
  return Promise.allSettled(notifications)
}
