import { EstablishmentMenuDataDTO } from "@/dtos/establishment-menu-data.dto";
import { db } from "@/lib/prisma";

export async function getEstablishmentMenuData(
  slug: string,
): Promise<EstablishmentMenuDataDTO | null> {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        avatarImageUrl: true,
        coverImageUrl: true,
        isOpen: true,
        category: true,
        description: true,
        street: true,
        number: true,
        neighborhood: true,
        city: true,
        state: true,
        complement: true,
        deliveryFee: true,
        useRangoooDelivery: true,
        consumptionMethods: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
        },
        menuCategories: {
          orderBy: { createdAt: "asc" },
          include: {
            products: {
              where: { isVisible: true },
              orderBy: { name: "asc" },
            },
          },
        },
      },
    });

    if (!establishment) return null;

    const cleanedData = {
      ...establishment,
      deliveryFee: Number(establishment.deliveryFee),
      menuCategories: establishment.menuCategories.map((cat) => ({
        ...cat,
        products: cat.products.map((prod) => ({
          ...prod,
          price: Number(prod.price),
        })),
      })),
    } as unknown as EstablishmentMenuDataDTO;

    return cleanedData;
  } catch (err) {
    console.error("Erro ao buscar dados do cardápio:", err);
    return null;
  }
}
