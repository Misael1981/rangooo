import { db } from "@/lib/prisma";
import {
  AdditionalIngredientDTO,
  EstablishmentMenuDataDTO,
} from "@/dtos/establishment-menu-data.dto";

export async function getProductDetails(
  restaurantSlug: string,
  productId: string,
  userId?: string,
) {
  try {
    const systemSettings = await db.systemSettings.findFirst();

    let userAreaType = null;

    if (userId) {
      const defaultAddress = await db.address.findFirst({
        where: { userId, isDefault: true },
        select: { areaType: true },
      });
      userAreaType = defaultAddress?.areaType || null;
    }

    const product = await db.product.findFirst({
      where: {
        id: productId,
        restaurant: { slug: restaurantSlug },
      },
      include: {
        restaurant: {
          include: { consumptionMethods: true, deliveryAreas: true },
        },
        menuCategory: {
          include: {
            additionalIngredients: true,
          },
        },
      },
    });

    if (!product) return null;

    const additionalIngredients = await db.additionalIngredient.findMany({
      where: { menuCategoryId: product.menuCategoryId },
    });

    const serializedAdditionals: AdditionalIngredientDTO[] =
      additionalIngredients.map((ing) => ({
        id: ing.id,
        name: ing.name,
        price: Number(ing.price),
      }));

    const { menuCategory, ...productWithoutCategory } = product;

    const serializedProduct = {
      ...productWithoutCategory,
      price: Number(product.price),
      additionalIngredients: serializedAdditionals,
      restaurant: {
        ...product.restaurant,
        deliveryFee: Number(product.restaurant.deliveryFee),
        userAreaType,
        latitude: Number(product.restaurant.latitude),
        longitude: Number(product.restaurant.longitude),
        deliveryAreas: product.restaurant.deliveryAreas.map((area) => ({
          ...area,
          fee: Number(area.fee),
        })),
        systemSettings: systemSettings
          ? {
              ...systemSettings,
              urbanDeliveryFee: Number(systemSettings.urbanDeliveryFee),
              ruralDeliveryFee: Number(systemSettings.ruralDeliveryFee),
              districtDeliveryFee: Number(systemSettings.districtDeliveryFee),
            }
          : null,
      } as unknown as EstablishmentMenuDataDTO,
    };

    return {
      product: serializedProduct,
      restaurant: serializedProduct.restaurant,
      additionalIngredients: serializedAdditionals,
      category: menuCategory,
    };
  } catch (err) {
    console.error("ERRO CRÍTICO NA ACTION:", err);
    return null;
  }
}
