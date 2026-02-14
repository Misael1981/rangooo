import { EstablishmentMenuDataDTO } from "@/dtos/establishment-menu-data.dto";
import { db } from "@/lib/prisma";

export async function getEstablishmentMenuData(
  slug: string,
): Promise<EstablishmentMenuDataDTO | null> {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug },
      include: {
        consumptionMethods: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
        },
        menuCategories: {
          orderBy: { createdAt: "asc" },
          include: {
            products: {
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
