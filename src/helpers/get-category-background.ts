import { restaurantCategories } from "@/constants/maps-options";

export function getCategoryBackground(category: string) {
  const found = restaurantCategories.find((item) => item.value === category);

  return found?.background || "#111827";
}
