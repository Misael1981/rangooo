import { z } from "zod";

export const ownerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome obrigatório e deve ter pelo menos 2 caracteres." })
    .default(""), // <--- CORREÇÃO PRINCIPAL: Trata 'undefined' como ""
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .regex(
      /^(\+\d{1,3}\s?)?(\(?\d{2}\)?[\s-]?)?\d{4,5}[-.\s]?\d{4}$/,
      "Formato inválido (ex: (11) 99999-9999 ou 11999999999)",
    )
    .transform((val) => {
      // Remove tudo que não é número
      return val.replace(/\D/g, "");
    }),
  email: z.string().email({ message: "E-mail inválido." }).default(""), // <--- CORREÇÃO: Trata 'undefined'
});

export const ownerDefaultValues = {
  name: "",
  phone: "",
  email: "",
};
