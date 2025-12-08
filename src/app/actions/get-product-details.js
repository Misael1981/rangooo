"use server";

import { db } from "@/lib/prisma";

export async function getProductDetails(restaurantSlug, productId) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true, // Decimal
        description: true,
        imageUrl: true,
        ingredients: true,
        restaurant: {
          select: {
            id: true,
            slug: true,
            category: true,
            brandColors: true,
            avatarImageUrl: true,
            name: true,

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
    if (!product.menuCategory) {
      return {
        product: product,
        restaurant: product.restaurant,
        additionalIngredients: [],
      };
    }
    const additionalIngredients = await db.additionalIngredient.findMany({
      where: { menuCategoryId: product.menuCategory.id },
    });

    // --- INÍCIO DA LÓGICA DE SERIALIZAÇÃO ---

    const { restaurant, menuCategory, ...restOfProduct } = product;

    const serializedRestaurant = {
      ...restaurant,
      createdAt: restaurant.createdAt?.toISOString() ?? null,
      updatedAt: restaurant.updatedAt?.toISOString() ?? null,
    };

    const serializedProduct = {
      ...restOfProduct,
      price: restOfProduct.price?.toNumber() ?? Number(restOfProduct.price),
      createdAt: restOfProduct.createdAt?.toISOString() ?? null,
      updatedAt: restOfProduct.updatedOf?.toISOString() ?? null,
    };

    const serializedAdditionalIngredients = additionalIngredients.map(
      (ing) => ({
        ...ing,
        price: ing.price?.toNumber() ?? Number(ing.price),
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
