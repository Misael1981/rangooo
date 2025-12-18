// app/actions/admin/products.js
"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(data) {
  const {
    name,
    price,
    description,
    ingredients,
    imageUrl,
    menuCategoryId,
    restaurantId,
  } = data;

  const parsedIngredients = ingredients
    ? ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  try {
    const product = await db.product.create({
      data: {
        name,
        price,
        description,
        ingredients: parsedIngredients,
        imageUrl,
        menuCategoryId,
        restaurantId,
      },
    });

    const safeProduct = {
      ...product,
      price: Number(product.price), // 👈 AQUI
    };

    revalidatePath("/admin/menu");
    return { success: true, data: safeProduct };
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return { success: false, error: "Erro interno no banco de dados" };
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

    const safeProduct = {
      ...product,
      price: Number(product.price), // 👈 AQUI
    };

    revalidatePath("/admin/menu");

    return { success: true, data: safeProduct };
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
