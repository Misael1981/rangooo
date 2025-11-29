import { z } from "zod";

export const ownerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

export const addressSchema = z.object({
  street: z.string().min(2),
  number: z.string().min(1),
  complement: z.string().optional(),
  neighborhood: z.string().min(2),
  city: z.string().min(2),
  state: z
    .string()
    .length(2)
    .transform((s) => s.toUpperCase()),
  zipCode: z.string().min(8),
});

export const restaurantSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  category: z.string().min(2),
  brandColors: z.array(z.string()).optional(),
  address: addressSchema,
});

export const formSchema = z.object({
  owner: ownerSchema,
  restaurant: restaurantSchema,
  termsAccepted: z
    .boolean()
    .refine((v) => v === true, "É necessário aceitar os termos"),
});

export const defaultValues = {
  owner: { name: "", email: "", phone: "" },
  restaurant: {
    name: "",
    slug: "",
    description: "",
    category: "",
    brandColors: [],
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  termsAccepted: false,
};
