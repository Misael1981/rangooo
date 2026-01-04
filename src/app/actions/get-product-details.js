"use server";

import { db } from "@/lib/prisma";

export async function getProductDetails(restaurantSlug, productId) {
  try {
    const product = await db.product.findFirst({
      where: {
        id: productId,
        restaurant: {
          slug: restaurantSlug,
        },
      },
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

    if (!product) {
      return null;
    }

    const additionalIngredients = product.menuCategory
      ? await db.additionalIngredient.findMany({
          where: { menuCategoryId: product.menuCategory.id },
        })
      : [];

    const { restaurant, ...restOfProduct } = product;

    // Helper simples para garantir que Decimal vire Number
    const toNumber = (value) => {
      if (value == null) return 0;
      if (typeof value === "object" && value.toNumber) return value.toNumber();
      return Number(value);
    };

    const serializedRestaurant = {
      id: restaurant.id,
      slug: restaurant.slug,
      name: restaurant.name,
      avatarImageUrl: restaurant.avatarImageUrl,
      brandColors: restaurant.brandColors,
      isOpen: restaurant.isOpen,
      category: restaurant.category,
      consumptionMethods: restaurant.consumptionMethods,

      deliveryFee: toNumber(restaurant.deliveryFee),
      createdAt: restaurant.createdAt?.toISOString() || null,
      updatedAt: restaurant.updatedAt?.toISOString() || null,
    };

    const serializedProduct = {
      ...restOfProduct,
      price: Number(restOfProduct.price ?? 0),
      createdAt: restOfProduct.createdAt?.toISOString() ?? null,
      updatedAt: restOfProduct.updatedAt?.toISOString() ?? null,
    };

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
    console.error("ERRO CRÍTICO NA ACTION:", err);

    // Em vez de retornar null (que gera o 404), vamos jogar o erro para cima
    // para ver se o Next.js mostra algo mais útil ou use um valor de fallback
    throw err;
  }
}
