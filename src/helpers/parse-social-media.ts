import { SocialMedia } from "@/dtos/about-establishment.dto";

export function parseSocialMedia(value: unknown): SocialMedia[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is SocialMedia =>
      !!item &&
      typeof item === "object" &&
      "url" in item &&
      typeof (item as Record<string, unknown>).url === "string" &&
      "name" in item &&
      typeof (item as Record<string, unknown>).name === "string",
  );
}
