"use server"

import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

import { CreateOrderInputDTO } from "@/dtos/create-order.dto"
import { OrderResponseDTO } from "@/dtos/finish-order.dto"
import { serializeOrder } from "@/helpers/serialize-order"
import { generateOrderNumber } from "@/services/order-number.service"
import { calculateOrderTotal } from "@/services/order-total.service"
import { notifyNewOrder } from "@/services/notification.service"
import { processOrderPrinting } from "@/services/printer.service"
import { Prisma } from "@misael1981/rangooo-database"
import { waitUntil } from "@vercel/functions"

export const createOrder = async (
  input: CreateOrderInputDTO,
): Promise<OrderResponseDTO> => {
  const session = await getServerSession(authOptions)

  if (!session?.user) throw new Error("Não autenticado")

  const order = await db.$transaction(async (tx) => {
    const [user, restaurant] = await Promise.all([
      tx.user.findFirst({
        where: {
          OR: [
            { id: session.user.id },
            { email: session.user.email as string },
          ],
        },
      }),
      tx.restaurant.findUnique({
        where: { slug: input.slug },
        select: { id: true, name: true },
      }),
    ])

    if (!user || !restaurant)
      throw new Error("Usuário ou Restaurante não encontrado")

    const nextOrderNumber = await generateOrderNumber(tx, restaurant.id)

    const totalAmount = calculateOrderTotal(input.products)

    const finalDeliveryFee =
      input.consumptionMethod === "DELIVERY" ? (input.deliveryFee ?? 0) : 0

    const finalTotalAmount = totalAmount + finalDeliveryFee

    return tx.order.create({
      data: {
        userId: user.id,
        restaurantId: restaurant.id,
        orderNumber: nextOrderNumber,
        status: "PENDING",
        consumptionMethod: input.consumptionMethod,
        paymentMethod: input.payment?.paymentMethod || "NOT_DEFINED",

        deliveryAddress:
          input.consumptionMethod === "DELIVERY"
            ? input.delivery?.address
            : input.consumptionMethod === "DINE_IN"
              ? input.dineInDetails
              : input.pickupDetails,

        deliveryFee: finalDeliveryFee,
        totalAmount: finalTotalAmount,

        items: {
          create: input.products.map((p) => {
            if (!p.productId || !p.quantity) {
              throw new Error(`Produto ou quantidade inválida`)
            }

            return {
              product: {
                connect: { id: p.productId },
              },
              quantity: p.quantity,
              priceAtOrder: p.price,
              customName: p.name,

              // Estes são Strings no seu Schema, então JSON.stringify está correto aqui
              extras: JSON.stringify(p.extras || []),
              removedIngredients: JSON.stringify(p.removedIngredients || []),

              isDouble: p.isDouble || false,

              // IDs e Nomes (Strings no Schema)
              flavor1Id: p.isDouble ? p.flavor1Id : null,
              flavor1Name: p.isDouble ? p.flavor1Details?.name : null,
              flavor1Removed: p.isDouble
                ? JSON.stringify(p.flavor1Details?.removedIngredients || [])
                : null,

              flavor2Id: p.isDouble ? p.flavor2Id : null,
              flavor2Name: p.isDouble ? p.flavor2Details?.name : null,
              flavor2Removed: p.isDouble
                ? JSON.stringify(p.flavor2Details?.removedIngredients || [])
                : null,

              flavor1additionalIngredients: p.isDouble
                ? p.flavor1Details?.extras?.map((e) => ({
                    name: e.name,
                    price: e.price,
                  })) || []
                : Prisma.JsonNull,

              flavor2additionalIngredients: p.isDouble
                ? p.flavor2Details?.extras?.map((e) => ({
                    name: e.name,
                    price: e.price,
                  })) || []
                : Prisma.JsonNull,

              additionalIngredients: !p.isDouble
                ? p.extras || []
                : Prisma.JsonNull,
            }
          }),
        },
      },

      include: {
        user: true,
        restaurant: true,
        items: {
          include: {
            product: {
              include: { menuCategory: true },
            },
          },
        },
      },
    })
  })

  console.log("Pedido criado com sucesso:", order.id)

  /* ---------------- Processamento em Background ---------------- */
  waitUntil(
    processOrderPrinting(order, input).catch((err) =>
      console.error("❌ Falha crítica no fluxo de impressão:", err),
    ),
  )

  waitUntil(
    notifyNewOrder(order).catch((err) =>
      console.error("❌ Falha crítica no fluxo de notificações:", err),
    ),
  )

  return serializeOrder(order) as unknown as OrderResponseDTO
}
