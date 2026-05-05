import { METHOD_BASE, MethodType } from "@/constants/maps-options"

export function getMethodOption(method: MethodType, category: string) {
  const base = METHOD_BASE[method]

  const validCategories = [
    "restaurantes",
    "pizzarias",
    "hamburguerias",
    "sorveterias",
    "adegas",
  ]
  const folder = validCategories.includes(category.toLowerCase())
    ? category.toLowerCase()
    : "default"

  return {
    ...base,
    imageUrl: `/images/${folder}/${method.toUpperCase()}.png`,
  }
}
