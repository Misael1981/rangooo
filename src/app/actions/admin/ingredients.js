"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAdditionalIngredient({
  name,
  price,
  menuCategoryId,
}) {
  try {
    await db.additionalIngredient.create({
      data: {
        name,
        price: parseFloat(price),
        menuCategory: {
          connect: { id: menuCategoryId },
        },
      },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateAdditionalIngredient({
  ingredientId,
  name,
  price,
}) {
  try {
    await db.additionalIngredient.update({
      where: { id: ingredientId },
      data: {
        name,
        price: parseFloat(price),
      },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteIngredient(ingredientId) {
  try {
    await db.additionalIngredient.delete({
      where: { id: ingredientId },
    });

    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return { success: false, error: "Não foi possível excluir o ingrediente." };
  }
}
