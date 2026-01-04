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

    const rawFee = restaurant.deliveryFee ?? 0;
    const deliveryFee =
      typeof rawFee === "object" &&
      rawFee !== null &&
      typeof rawFee.toNumber === "function"
        ? rawFee.toNumber()
        : Number(rawFee);

    const serializedRestaurant = {
      id: restaurant.id,
      slug: restaurant.slug,
      name: restaurant.name,
      avatarImageUrl: restaurant.avatarImageUrl,
      brandColors: restaurant.brandColors,
      isOpen: restaurant.isOpen,
      category: restaurant.category,
      deliveryFee: deliveryFee,
      consumptionMethods: restaurant.consumptionMethods,
      createdAt: restaurant.createdAt?.toISOString() ?? null,
      updatedAt: restaurant.updatedAt?.toISOString() ?? null,
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
    console.error("Erro ao buscar detalhes do produto:", err);
    return null;
  }
}
