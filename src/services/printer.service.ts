import { CreateOrderInputDTO, OrderExtraDTO } from "@/dtos/create-order.dto"
import { parseJsonArray } from "@/helpers/parse-json-array"
import { db } from "@/lib/prisma"
import { sendOrderToPrint } from "@/lib/send-order-to-print"
import { $Enums } from "@misael1981/rangooo-database"
import {
  Decimal,
  JsonValue,
} from "@misael1981/rangooo-database/generated-client/runtime/library"

type PrinterOrder = {
  id: string
  orderNumber: number | null
  consumptionMethod: $Enums.ConsumptionMethod
  deliveryFee: Decimal
  paymentMethod: string | null
  totalAmount: Decimal
  deliveryAddress: JsonValue | null
  restaurantId: string
  createdAt: Date
  updatedAt: Date
  userId: string
  customName: string | null
  extras: string | null
  printId: string | null
  deliveryPersonId: string | null
  status: $Enums.OrderStatus
  user: {
    id: string
    name: string | null
    phone: string | null
  }
  restaurant: {
    id: string
    name: string
    slug: string
  }
  items: {
    id: string
    quantity: number
    priceAtOrder: Decimal
    customName: string | null
    isDouble: boolean
    flavor1Name: string | null
    flavor1additionalIngredients: JsonValue | null
    flavor1Removed: JsonValue | null
    flavor2Name: string | null
    flavor2additionalIngredients: JsonValue | null
    flavor2Removed: JsonValue | null
    extras: JsonValue | null
    removedIngredients: JsonValue | null
    product: {
      menuCategory: {
        name: string
      }
    }
  }[]
}

export async function processOrderPrinting(
  order: PrinterOrder,
  input: CreateOrderInputDTO,
) {
  console.log("Como está chegando o pedido para impressão: ", order)
  try {
    const printData = {
      id: order.id,
      restaurantName: order.restaurant.name,
      number: `#${String(order.orderNumber).padStart(2, "0")}`,
      customerName: input.customer?.name || order.user.name || "Cliente",
      customerPhone: input.customer?.phone || order.user.phone || "",
      method: order.consumptionMethod,
      deliveryFee: Number(order.deliveryFee),
      payment: order.paymentMethod,
      items: order.items.map((item) => mapPrinterItem(item)),
      total: Number(order.totalAmount),
      details: order.deliveryAddress,
    }

    // Lógica de Timeout e Envio
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout Impressora")), 15000),
    )

    const printId = await Promise.race([
      sendOrderToPrint(order.restaurantId, printData),
      timeoutPromise,
    ])

    if (printId) {
      // Atualiza o ID da impressão no banco de forma isolada
      await db.order.update({
        where: { id: order.id },
        data: { printId: printId as string },
      })
      return { success: true, printId }
    }

    return { success: false, error: "Nenhum ID de impressão retornado" }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.warn(
      `⚠️ Falha na impressora (#${order.orderNumber}):`,
      errorMessage,
    )
    return { success: false, error: errorMessage }
  }
}

// Função auxiliar interna para não poluir o código principal
function mapPrinterItem(item: PrinterOrder["items"][number]) {
  const flavor1Extras = parseJsonArray<OrderExtraDTO>(item.extras)
    .map((e) => e.name || e.title)
    .filter((e): e is string => !!e)
  const flavor1Removed = parseJsonArray<string>(item.removedIngredients)

  let flavor2Info = null
  if (item.isDouble && item.flavor2Name) {
    const f2Extras = parseJsonArray<OrderExtraDTO>(
      item.flavor2additionalIngredients,
    )
      .map((e) => e.name || e.title)
      .filter((e): e is string => !!e)
    const f2Removed = parseJsonArray<string>(item.flavor2Removed)

    flavor2Info = {
      name: item.flavor2Name,
      extras: f2Extras,
      removed: f2Removed,
    }
  }

  return {
    name: item.customName,
    category: item.product?.menuCategory?.name || "Geral",
    quantity: item.quantity,
    price: Number(item.priceAtOrder),
    extras: flavor1Extras,
    removedIngredients: flavor1Removed,
    isDouble: item.isDouble,
    flavor2: flavor2Info,
  }
}
