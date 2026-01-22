import { PrismaClient } from "@prisma/client";

const isProd = process.env.NODE_ENV === "production";
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.cachedPrisma ??
  new PrismaClient({
    log: isProd ? ["error"] : ["warn", "error"],
  });

if (!isProd) {
  globalForPrisma.cachedPrisma = prisma;
}

export const db = prisma;
export default prisma;
