import { Prisma } from "@/generated/prisma/client";

export function serializeOrder<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      value instanceof Prisma.Decimal ? value.toNumber() : value,
    ),
  );
}
