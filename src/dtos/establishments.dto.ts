import { RestaurantCategory, Prisma } from "@/generated/prisma/client";

export interface EstablishmentDto {
  id: string;
  name: string;
  slug: string;
  avatarImageUrl: string | null;
  brandColors: Prisma.JsonValue;
  category: RestaurantCategory;
  isOpen: boolean;
}
