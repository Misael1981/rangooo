// app/actions/admin/products.js
"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(data) {
  const {
    name,
    price,
    menuCategoryId,
    restaurantId,
    description,
    ingredients,
    imageUrl,
  } = data;

  try {
    const product = await db.product.create({
      data: {
        name,
        price, // Já vem como número do Zod
        description,
        ingredients,
        imageUrl,
        menuCategoryId,
        restaurantId,
      },
    });

    revalidatePath("/admin/menu");

    return { success: true, data: product };
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return {
      success: false,
      error: "Não foi possível cadastrar o produto. Verifique os dados.",
    };
  }
}

export async function updateProduct(productId, data) {
  const { name, price, description, ingredients, imageUrl, menuCategoryId } =
    data;

  try {
    const product = await db.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        description,
        ingredients,
        imageUrl,
        menuCategoryId,
      },
    });

    revalidatePath("/admin/menu");

    return { success: true, data: product };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return {
      success: false,
      error: "Não foi possível atualizar o produto.",
    };
  }
}

export async function deleteProduct(productId) {
  try {
    await db.product.delete({
      where: { id: productId },
    });

    revalidatePath("/admin/menu");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return { success: false, error: "Não foi possível excluir o produto." };
  }
}
