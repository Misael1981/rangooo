import { PrismaClient } from "@prisma/client";

const isProd = process.env.NODE_ENV === "production";
const globalForPrisma = globalThis;

// Declaramos a constante com export direto
export const prisma =
  globalForPrisma.cachedPrisma ??
  new PrismaClient({
    log: isProd ? ["error"] : ["warn", "error"],
  });

if (!isProd) {
  globalForPrisma.cachedPrisma = prisma;
}

// Mantemos esses para compatibilidade com o que você já escreveu em outros arquivos
export const db = prisma;
export default prisma;
