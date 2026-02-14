import { db } from "@/lib/prisma";
import {
  EstablishmentMenuDataDTO,
  ProductDTO,
} from "@/dtos/establishment-menu-data.dto";

type PrismaProductResult = NonNullable<
  Awaited<ReturnType<typeof db.product.findFirst>>
>;

export async function getDoubleProductDetails(
  restaurantSlug: string,
  id1: string,
  id2: string,
) {
  try {
    const [product1, product2] = await Promise.all([
      db.product.findFirst({
        where: { id: id1, restaurant: { slug: restaurantSlug } },
        include: { restaurant: { include: { consumptionMethods: true } } },
      }),
      db.product.findFirst({
        where: { id: id2, restaurant: { slug: restaurantSlug } },
        include: { restaurant: { include: { consumptionMethods: true } } },
      }),
    ]);

    if (!product1 || !product2) return null;

    const categoryIds = Array.from(
      new Set([product1.menuCategoryId, product2.menuCategoryId]),
    );

    const additionalIngredients = await db.additionalIngredient.findMany({
      where: { menuCategoryId: { in: categoryIds } },
    });

    const allAdditionalsFormatted = additionalIngredients.map((ing) => ({
      ...ing,
      price: Number(ing.price),
    }));

    const formatProduct = (p: PrismaProductResult): ProductDTO => {
      const productAdditionals = allAdditionalsFormatted.filter(
        (ing) => ing.menuCategoryId === p.menuCategoryId,
      );

      return {
        ...p,
        price: Number(p.price),
        ingredients: p.ingredients.filter((i): i is string => i !== null),
        additionalIngredients: productAdditionals,
        restaurant: {
          ...product1.restaurant,
          deliveryFee: Number(product1.restaurant.deliveryFee),
          latitude: Number(product1.restaurant.latitude),
          longitude: Number(product1.restaurant.longitude),
        } as unknown as EstablishmentMenuDataDTO,
      } as unknown as ProductDTO;
    };

    return {
      flavor1: formatProduct(product1),
      flavor2: formatProduct(product2),
      restaurant: {
        ...product1.restaurant,
        deliveryFee: Number(product1.restaurant.deliveryFee),
        latitude: Number(product1.restaurant.latitude),
        longitude: Number(product1.restaurant.longitude),
      } as unknown as EstablishmentMenuDataDTO,
      allAdditionals: allAdditionalsFormatted,
    };
  } catch (err) {
    console.error("Erro ao buscar sabores meio-a-meio:", err);
    return null;
  }
}
