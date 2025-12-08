"use server";

import { db } from "@/lib/prisma";

export async function getProductDataBySlugs(restaurantSlug, productId) {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug: restaurantSlug },
      select: {
        id: true,
        name: true,
        slug: true,
        coverImageUrl: true,
        avatarImageUrl: true,
        description: true,
        address: true,
        street: true,
        number: true,
        neighborhood: true,
        city: true,
        state: true,
        category: true,
        brandColors: true,
        consumptionMethods: {
          orderBy: { displayOrder: "asc" },
          where: { isActive: true },
        },
        menuCategories: {
          select: {
            id: true,
            name: true,
            updatedAt: true,
            createdAt: true,
            additionalIngredients: true,
            products: {
              select: {
                id: true,
                name: true,
                price: true, // Decimal
                description: true,
                imageUrl: true,
                ingredients: true,
                updatedAt: true,
                createdAt: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!establishment) {
      return null;
    }

    const product = await db.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true, // Decimal
        description: true,
        imageUrl: true,
        ingredients: true,
        restaurantId: true,
      },
    });

    if (!product) {
      return null;
    }

    // --- INÍCIO DA LÓGICA DE SERIALIZAÇÃO ---
    const serializedCategories = establishment.menuCategories.map((cat) => ({
      ...cat,
      createdAt: cat.createdAt?.toISOString() ?? null,
      updatedAt: cat.updatedAt?.toISOString() ?? null,

      // NOVO: Serialização dos AdditionalIngredients (onde estava o erro)
      additionalIngredients: cat.additionalIngredients.map((ing) => ({
        ...ing,
        price: ing.price?.toNumber() ?? Number(ing.price),
        createdAt: ing.createdAt?.toISOString() ?? null,
        updatedAt: ing.updatedAt?.toISOString() ?? null,
      })),

      products: cat.products.map((p) => ({
        ...p,
        price: p.price?.toNumber() ?? Number(p.price),

        createdAt: p.createdAt?.toISOString() ?? null,
        updatedAt: p.updatedAt?.toISOString() ?? null,
      })),
    }));

    const serializedProduct = {
      ...product,
      price: product.price?.toNumber() ?? Number(product.price),
    };

    return {
      establishment: establishment,
      product: serializedProduct,
      menuCategories: serializedCategories,
    };
  } catch (err) {
    console.error("Erro ao buscar dados de menu e serializar:", err);
    return null;
  }
}
