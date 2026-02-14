import { AreaType } from "@/generated/prisma/enums";
import z from "zod";

export const addressSchema = z.object({
  street: z.string().trim().min(1),
  number: z.string().trim().min(1),
  neighborhood: z.string().trim().min(1),
  city: z.string().trim().min(1),
  state: z.string().length(2).toUpperCase(),
  complement: z.string().trim().optional(),
  areaType: z.nativeEnum(AreaType),
  reference: z.string().trim().max(100).optional(),
});
