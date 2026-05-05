import { Prisma, RestaurantCategory } from "@misael1981/rangooo-database"

export interface EstablishmentDto {
  id: string
  name: string
  slug: string
  avatarImageUrl: string | null
  brandColors: Prisma.JsonValue
  category: RestaurantCategory
  isOpen: boolean
}
