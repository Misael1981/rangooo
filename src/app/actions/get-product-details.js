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

    const { ...restaurantData } = product.restaurant;

    const additionalIngredients = product.menuCategory
      ? await db.additionalIngredient.findMany({
          where: { menuCategoryId: product.menuCategory.id },
        })
      : [];

    const { restaurant, ...restOfProduct } = product;

    const serializedRestaurant = {
      ...restaurantData,
      createdAt: product.restaurant.createdAt?.toISOString() || null,
      updatedAt: product.restaurant.updatedAt?.toISOString() || null,
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
    throw err;
  }
}
