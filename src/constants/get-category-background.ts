import { restaurantCategories } from "./maps-options"

export function getCategoryBackground(category: string) {
  const found = restaurantCategories.find((item) => item.value === category)

  return found?.background || "#111827"
}
