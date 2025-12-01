import { z } from "zod";

const CategoryUi = [
  "restaurant",
  "pizzaria",
  "hamburgueria",
  "sorveteria",
  "acai",
  "saudavel",
  "doces",
];

const productSchema = z.object({
  name: z.string().trim().min(2, "Nome é obrigatório").max(80),
  description: z.string().trim().min(10, "Descrição é obrigatória"),
  price: z.coerce.number().min(0.01, "Preço inválido"),
  category: z.string().trim().min(1, "Categoria do produto é obrigatória"),
  ingredients: z
    .array(z.string().trim().min(1, "Ingrediente é obrigatório"))
    .min(1, "Adicione pelo menos um ingrediente"),
});

const additionalIngredientsSchema = z.object({
  name: z.string().trim().min(2, "Nome é obrigatório").max(80),
  price: z.coerce.number().min(0.01, "Preço inválido"),
});

export const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Campo obrigatório.",
    }),
    phone: z
      .string({ required_error: "Campo obrigatório." })
      .min(10, { message: "Campo obrigatório." }),
    email: z
      .string({ required_error: "Campo obrigatório." })
      .email({ message: "Email inválido." }),
    establishmentName: z.string().min(2, {
      message: "Campo obrigatório.",
    }),
    slogan: z
      .string({ required_error: "Campo obrigatório." })
      .min(10, { message: "Mínimo de 10 caracteres." })
      .max(25, { message: "Máximo de 25 caracteres." }),
    category: z.enum(CategoryUi, { required_error: "Selecione uma categoria" }),
    emailEstablishment: z
      .string({ required_error: "Campo obrigatório." })
      .email({ message: "Email inválido." }),
    contacts: z
      .array(z.string().min(1, "Contato é obrigatório"))
      .min(1, "Pelo menos um contato é necessário"),
    socialMedia: z.object({
      facebook: z.string().url({ message: "URL inválida" }).optional(),
      instagram: z.string().url({ message: "URL inválida" }).optional(),
    }),
    street: z.string().min(2, {
      message: "Campo obrigatório.",
    }),
    number: z.string().min(2, {
      message: "Campo obrigatório.",
    }),
    complement: z.string().optional(),
    city: z.string().min(2, {
      message: "Campo obrigatório.",
    }),
    state: z.string().min(2, {
      message: "Campo obrigatório.",
    }),
    menuCategory: z
      .array(z.string().trim().min(1, "Categoria é obrigatória"))
      .min(1, "Selecione pelo menos uma categoria")
      .refine((arr) => new Set(arr).size === arr.length, {
        message: "Categorias duplicadas não são permitidas",
      }),
    products: z.array(productSchema).min(1, "Adicione pelo menos um produto"),
    businessHours: z
      .array(
        z.object({
          dayOfWeek: z.number().int().min(0).max(6),
          isClosed: z.boolean().default(false),
          timeSlots: z
            .array(
              z.object({
                open: z.string().regex(/^\d{2}:\d{2}$/),
                close: z.string().regex(/^\d{2}:\d{2}$/),
                type: z.enum(["BREAKFAST", "LUNCH", "DINNER"]).optional(),
              }),
            )
            .default([]),
        }),
      )
      .length(7),
    additionalIngredients: z.array(additionalIngredientsSchema).default([]),
    paymentMethods: z
      .array(
        z.enum(["CREDIT_CARD", "DEBIT_CARD", "PIX", "BANK_TRANSFER", "CASH"], {
          required_error: "Método de pagamento é obrigatório",
        }),
      )
      .min(1, "Selecione pelo menos um método de pagamento"),
    consumptionMethods: z
      .array(
        z.enum(["DINE_IN", "PICKUP", "DELIVERY"], {
          required_error: "Método de consumo é obrigatório",
        }),
      )
      .min(1, "Selecione pelo menos um método de consumo"),
  })
  .superRefine((val, ctx) => {
    const allowed = new Set(val.menuCategory);
    val.products.forEach((p, i) => {
      if (!allowed.has(p.category)) {
        ctx.addIssue({
          code: "custom",
          message: "Produto em categoria não selecionada",
          path: ["products", i, "category"],
        });
      }
    });
  });

export const defaultValues = {
  username: "",
  phone: "",
  email: "",
  establishmentName: "",
  slogan: "",
  category: "",
  emailEstablishment: "",
  contacts: [""],
  socialMedia: {
    facebook: "",
    instagram: "",
  },
  street: "",
  number: "",
  complement: "",
  city: "",
  state: "",
  menuCategory: [],
  products: [],
  additionalIngredients: [],
  consumptionMethods: ["DINE_IN"],
  paymentMethods: ["CASH"],
  businessHours: Array.from({ length: 7 }).map((_, i) => ({
    dayOfWeek: i,
    isClosed: false,
    timeSlots: [],
  })),
};
