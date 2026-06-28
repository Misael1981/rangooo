import {
  CreateOrderInputDTO,
  OrderExtraDTO,
  PrinterOrderDTO,
} from "@/dtos/create-order.dto"
import { parseJsonArray } from "@/helpers/parse-json-array"
import { db } from "@/lib/prisma"
import { sendOrderToPrint } from "@/lib/send-order-to-print"

export async function processOrderPrinting(
  order: PrinterOrderDTO,
  input: CreateOrderInputDTO,
) {
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

    // Log para Debug
    console.log(
      "DADOS ENVIADOS PARA O ELECTRON:",
      JSON.stringify(printData, null, 2),
    )

    // Lógica de Timeout e Envio
    let timeoutId: NodeJS.Timeout
    const timeoutPromise = new Promise(
      (_, reject) =>
        (timeoutId = setTimeout(
          () => reject(new Error("Timeout Impressora")),
          15000,
        )),
    )

    // Executa a corrida
    const printId = await Promise.race([
      sendOrderToPrint(order.restaurantId, printData),
      timeoutPromise,
    ]).finally(() => clearTimeout(timeoutId)) // Limpa o timer para não prender processo no Render

    if (printId) {
      console.log(
        `✅ Pedido ${printData.number} enviado e confirmado pelo Electron. ID: ${printId}`,
      )

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

function mapPrinterItem(item: PrinterOrderDTO["items"][number]) {
  let flavor1Info = null
  if (item.isDouble && item.flavor1Name) {
    const f1Extras = Array.isArray(item.flavor1additionalIngredients)
      ? (item.flavor1additionalIngredients as OrderExtraDTO[])
          .map((e) => e.name || e.title)
          .filter((e): e is string => !!e)
      : []

    const f1Removed = parseJsonArray<string>(item.flavor1Removed)

    flavor1Info = {
      name: item.flavor1Name,
      extras: f1Extras,
      removed: f1Removed,
    }
  }

  let flavor2Info = null
  if (item.isDouble && item.flavor2Name) {
    const f2Extras = Array.isArray(item.flavor2additionalIngredients)
      ? (item.flavor2additionalIngredients as OrderExtraDTO[])
          .map((e) => e.name || e.title)
          .filter((e): e is string => !!e)
      : []

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

    isDouble: item.isDouble,
    flavor1: flavor1Info,
    flavor2: flavor2Info,
  }
}
