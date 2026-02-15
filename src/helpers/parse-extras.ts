import { OrderExtraDTO } from "@/dtos/create-order.dto";

export function parseExtras(extras: string | null): OrderExtraDTO[] {
  if (!extras) return [];

  try {
    return JSON.parse(extras) as OrderExtraDTO[];
  } catch {
    return [];
  }
}
