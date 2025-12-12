import { z } from "zod";

// CORREÇÃO: Valores do Enum em UPPERCASE para coincidir com o Prisma
const CategoryUi = [
  "RESTAURANT",
  "PIZZARIA",
  "HAMBURGUERIA",
  "SORVETERIA",
  "ACAI",
  "SAUDAVEL",
  "DOCES",
];

const ConsumptionMethods = ["DELIVERY", "PICKUP", "DINE_IN"];
const PaymentMethods = [
  "CREDIT_CARD",
  "DEBIT_CARD",
  "PIX",
  "CASH",
  "MEAL_VOUCHER",
  "FOOD_VOUCHER",
  "ONLINE",
];

export const storeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome do estabelecimento obrigatório." })
    .default(""),
  slug: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens")
    .default(""),
  category: z.enum(CategoryUi, {
    required_error: "Selecione a categoria principal",
  }),

  street: z
    .string()
    .min(2, { message: "Rua/Avenida obrigatória." })
    .default(""),
  number: z.string().min(1, { message: "Número obrigatório." }).default(""),
  complement: z.string().optional().default(""),
  city: z.string().min(2, { message: "Cidade obrigatória." }).default(""),
  state: z
    .string()
    .length(2, { message: "Use a sigla do estado (ex: SP)" })
    .default(""),
  zipCode: z.string().min(8, "CEP inválido (Mínimo 8 dígitos)").default(""),
  neighborhood: z
    .string()
    .min(2, { message: "Bairro obrigatório." })
    .default(""),

  contacts: z
    .array(z.string().min(10, "Contato inválido"))
    .min(1, "Pelo menos um telefone/WhatsApp é necessário"),

  socialMedia: z
    .array(
      z.object({
        platform: z.enum(["facebook", "instagram", "tiktok", "x", "youtube"]),
        url: z.string().url({ message: "URL inválida" }).or(z.literal("")),
      }),
    )
    .default([]),

  consumptionMethods: z
    .array(z.enum(ConsumptionMethods))
    .min(1, "Selecione pelo menos um método de consumo"),

  paymentMethods: z
    .array(z.enum(PaymentMethods))
    .min(1, "Selecione pelo menos um método de pagamento"),

  avatarImageUrl: z
    .string()
    .url({ message: "URL da logo inválida" })
    .optional()
    .or(z.literal(""))
    .default(""),
  coverImageUrl: z
    .string()
    .url({ message: "URL da capa inválida" })
    .optional()
    .or(z.literal(""))
    .default(""),

  description: z
    .string({ required_error: "Descrição é obrigatória." })
    .min(10, { message: "Mínimo de 10 caracteres." })
    .max(500, { message: "Máximo de 500 caracteres." })
    .default(""),
});

export const storeDefaultValues = {
  name: "",
  category: "RESTAURANT",
  contacts: ["", ""],
  street: "",
  number: "",
  complement: "",
  city: "",
  state: "",
  zipCode: "",
  neighborhood: "",
  socialMedia: [],
  slug: "",
  consumptionMethods: ["DELIVERY"],
  paymentMethods: ["CASH"],
  avatarImageUrl: "",
  coverImageUrl: "",
  description: "",
};
