import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import prisma from "@/lib/prisma";

export async function getRestaurantsByCategory(category) {
  return prisma.restaurant.findMany({
    where: { category },
    select: {
      id: true,
      name: true,
      slug: true,
      avatarImageUrl: true,
      brandColors: true,
    },
    orderBy: { name: "asc" },
  });
}

export function toPlain(input) {
  if (input === null || input === undefined) return input;

  if (Array.isArray(input)) {
    return input.map((item) => toPlain(item));
  }

  if (typeof input !== "object") {
    return input;
  }

  // Date -> string ISO
  if (input instanceof Date) {
    return input.toISOString();
  }

  // Prisma Decimal -> number
  if (typeof input.toNumber === "function") {
    try {
      return input.toNumber();
    } catch {
      // Fallback genérico
      const n = Number(input);
      return Number.isFinite(n) ? n : input.toString();
    }
  }

  // Objeto: processa recursivamente
  const plain = {};
  for (const [key, value] of Object.entries(input)) {
    plain[key] = toPlain(value);
  }
  return plain;
}
