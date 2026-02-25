import { RestaurantCategory } from "@/generated/prisma/enums";

const CATEGORY_MAP = {
  RESTAURANT: "restaurantes",
  PIZZARIA: "pizzarias",
  HAMBURGUERIA: "hamburguerias",
  SORVETERIA: "sorveterias",
  ADEGA: "adegas",
};

export function enumCategoryToRoute(categoryEnum: RestaurantCategory) {
  return CATEGORY_MAP[categoryEnum] ?? "restaurantes";
}

export const VALID_ROUTE_SLUGS = Object.values(CATEGORY_MAP);
