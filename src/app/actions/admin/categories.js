"use server"; // <-- OBRIGATÓRIO: roda apenas no servidor

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(data) {
  try {
    // 1. Pegar a última ordem para definir o displayOrder da nova categoria
    const lastCategory = await db.menuCategory.findFirst({
      where: { restaurantId: data.restaurantId },
      orderBy: { displayOrder: "desc" },
    });

    const nextOrder = lastCategory ? lastCategory.displayOrder + 1 : 0;

    // 2. Criar no banco
    const newCategory = await db.menuCategory.create({
      data: {
        name: data.name,
        restaurantId: data.restaurantId,
        displayOrder: nextOrder,
      },
    });

    // 3. Revalidar cache do Next
    revalidatePath("/admin/products"); // rota do painel

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return { success: false, error: "Falha ao criar categoria" };
  }
}

export async function deleteCategory(categoryId) {
  try {
    // 1. Deletar no banco (O Prisma cuida do resto pelo Cascade)
    await db.menuCategory.delete({
      where: { id: categoryId },
    });

    // 2. Revalidar para a sidebar atualizar na hora
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return { success: false, error: "Não foi possível excluir a categoria." };
  }
}
