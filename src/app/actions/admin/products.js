// app/actions/admin/products.js
"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct({ name, price, categoryId, restaurantId }) {
  try {
    await db.product.create({
      data: {
        name,
        price: parseFloat(price), // Converte a string do input para número
        menuCategoryId: categoryId,
        restaurantId: restaurantId,
      },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
