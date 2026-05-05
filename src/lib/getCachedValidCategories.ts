import { unstable_cache } from "next/cache"
import { db } from "./prisma"
import { CATEGORY_TO_SLUG } from "@/constants/maps-options"

export const getCachedValidCategories = unstable_cache(
  async () => {
    const distinctCategories = await db.restaurant.findMany({
      select: { category: true },
      distinct: ["category"],
    })
    return distinctCategories
      .map((c) => CATEGORY_TO_SLUG[c.category])
      .filter((slug): slug is string => !!slug)
  },
  ["valid-category-slugs"],
  { revalidate: 3600, tags: ["categories"] },
)
