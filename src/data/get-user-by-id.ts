import { db } from "@/lib/prisma";

export async function getUserById(userId: string) {
  try {
    return await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        phone: true,
        addresses: {
          where: { isDefault: true },
          take: 1,
          select: {
            id: true,
            street: true,
            number: true,
            complement: true,
            neighborhood: true,
            city: true,
            state: true,
            reference: true,
            areaType: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}
