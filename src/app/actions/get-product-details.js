"use server";

import { db } from "@/lib/prisma";

export async function getProductDetails(restaurantSlug, productId) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        imageUrl: true,
        ingredients: true,
        createdAt: true,
        restaurant: {
          select: {
            id: true,
            slug: true,
            category: true,
            brandColors: true,
            avatarImageUrl: true,
            name: true,
            isOpen: true,
            deliveryFee: true,
            consumptionMethods: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        menuCategory: { select: { id: true } },
      },
    });

    if (!product || product.restaurant.slug !== restaurantSlug) {
      return null;
    }

    const additionalIngredients = product.menuCategory
      ? await db.additionalIngredient.findMany({
          where: { menuCategoryId: product.menuCategory.id },
        })
      : [];

    // --- LÓGICA DE SERIALIZAÇÃO BLINDADA ---

    const { restaurant, ...restOfProduct } = product;

    // 1. Limpando o Restaurante (incluindo a Taxa de Entrega)
    const serializedRestaurant = {
      ...restaurant,
      // TRATAMENTO DO DELIVERY FEE AQUI:
      deliveryFee: restaurant.deliveryFee ? Number(restaurant.deliveryFee) : 0,
      createdAt: restaurant.createdAt?.toISOString() ?? null,
      updatedAt: restaurant.updatedAt?.toISOString() ?? null,
    };

    // 2. Limpando o Produto (Preço)
    const serializedProduct = {
      ...restOfProduct,
      price: Number(restOfProduct.price ?? 0),
      createdAt: restOfProduct.createdAt?.toISOString() ?? null,
      // Corrigi o nome da propriedade aqui (era updatedOf no seu, geralmente é updatedAt)
      updatedAt: restOfProduct.updatedAt?.toISOString() ?? null,
    };

    // 3. Limpando os Adicionais (Preços)
    const serializedAdditionalIngredients = additionalIngredients.map(
      (ing) => ({
        ...ing,
        price: Number(ing.price ?? 0),
        createdAt: ing.createdAt?.toISOString() ?? null,
        updatedAt: ing.updatedAt?.toISOString() ?? null,
      }),
    );

    return {
      product: serializedProduct,
      restaurant: serializedRestaurant,
      additionalIngredients: serializedAdditionalIngredients,
    };
  } catch (err) {
    console.error("Erro ao buscar detalhes do produto:", err);
    return null;
  }
}
