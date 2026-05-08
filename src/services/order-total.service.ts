import { CreateOrderProductDTO } from "@/dtos/create-order.dto"

export function calculateOrderTotal(products: CreateOrderProductDTO[]) {
  return products.reduce((acc, p) => {
    // Soma dos extras gerais
    const extrasTotal =
      p.extras?.reduce(
        (sum: number, e: { price?: number }) => sum + (e.price || 0),
        0,
      ) || 0

    // Soma dos adicionais do sabor 1 (ou sabor único)
    const additionalTotal =
      p.additionalIngredients?.reduce(
        (sum: number, e: { price?: number }) => sum + (e.price || 0),
        0,
      ) || 0

    // Soma dos adicionais do sabor 2
    const flavor2AdditionalTotal =
      p.flavor2Details?.extras?.reduce(
        (sum: number, e: { price?: number }) => sum + (e.price || 0),
        0,
      ) || 0

    const base =
      p.price + extrasTotal + additionalTotal + flavor2AdditionalTotal

    return acc + base * (p.quantity || 1)
  }, 0)
}
