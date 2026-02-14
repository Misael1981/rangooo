import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  cachedPrisma: PrismaClient | undefined;
};

const isProd = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL as string;
const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.cachedPrisma ??
  new PrismaClient({
    adapter,
    log: isProd ? ["error"] : ["warn", "error"],
  });

if (!isProd) {
  globalForPrisma.cachedPrisma = prisma;
}

export const db = prisma;
export default prisma;
