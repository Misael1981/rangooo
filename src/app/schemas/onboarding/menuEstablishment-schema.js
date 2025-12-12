// schemas/onboarding/menuEstablishment-schema.js
import { z } from "zod";

// Schema para ingrediente adicional (agora com categoria)
export const additionalIngredientSchema = z.object({
  name: z.string().trim().min(2, "Nome é obrigatório").max(80),
  price: z.coerce.number().min(0.01, "Preço inválido"),
  categories: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
});

// Schema do produto permanece igual
export const productSchema = z.object({
  name: z.string().trim().min(2, "Nome é obrigatório").max(80),
  description: z.string().trim().min(10, "Descrição é obrigatória"),
  price: z.coerce.number().min(0.01, "Preço inválido"),
  category: z.string().trim().min(1, "Categoria do produto é obrigatória"),
  imageUrl: z
    .string()
    .url({ message: "URL inválida" })
    .optional()
    .or(z.literal("")),
  ingredients: z
    .array(z.string().trim().min(1, "Ingrediente é obrigatório"))
    .min(1, "Adicione pelo menos um ingrediente"),
});

// Schema do menu atualizado
export const menuSchema = z
  .object({
    menuCategory: z
      .array(z.string().trim().min(1, "Categoria é obrigatória"))
      .min(1, "Selecione pelo menos uma categoria")
      .refine((arr) => new Set(arr).size === arr.length, {
        message: "Categorias duplicadas não são permitidas",
      }),

    products: z.array(productSchema).min(1, "Adicione pelo menos um produto"),

    additionalIngredients: z.array(additionalIngredientSchema).default([]),
  })
  .superRefine((val, ctx) => {
    const allowedCategories = new Set(val.menuCategory);

    // Valida produtos
    val.products.forEach((p, index) => {
      if (!allowedCategories.has(p.category)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Produto em categoria não selecionada",
          path: ["products", index, "category"],
        });
      }
    });

    // Valida ingredientes adicionais
    val.additionalIngredients.forEach((ing, index) => {
      ing.categories.forEach((cat, catIndex) => {
        if (!allowedCategories.has(cat)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Categoria inválida para ingrediente adicional",
            path: ["additionalIngredients", index, "categories", catIndex],
          });
        }
      });
    });
  });

export const menuDefaultValues = {
  menuCategory: [],
  products: [],
  additionalIngredients: [],
};
