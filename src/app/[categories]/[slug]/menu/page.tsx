import { notFound, redirect } from "next/navigation"
import { PageContainer } from "@/components/PageContainer"
import { CATEGORY_TO_SLUG } from "@/constants/maps-options"
import { getCachedValidCategories } from "@/lib/getCachedValidCategories"
import { getEstablishmentMenuData } from "@/data/get-menu-data-for-establishment"
import AppMenuUI from "./components/AppMenuUI"

const isConsumptionMethod = (method: string | undefined) => {
  if (!method) return false
  return ["DINE_IN", "PICKUP", "DELIVERY"].includes(method.toUpperCase())
}

type MenuPageProps = {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string }>
}

export default async function MenuPage({
  params,
  searchParams,
}: MenuPageProps) {
  const { categories, slug } = await params
  const { consumptionMethod } = await searchParams

  if (!isConsumptionMethod(consumptionMethod)) {
    return notFound()
  }

  const validCategories = await getCachedValidCategories()
  if (!validCategories.includes(categories)) {
    return notFound()
  }

  const establishment = await getEstablishmentMenuData(slug)

  if (!establishment) {
    return notFound()
  }

  const correctCategoryPath =
    CATEGORY_TO_SLUG[establishment.category] ||
    establishment.category.toLowerCase() + "s"

  if (correctCategoryPath !== categories) {
    return redirect(
      `/${correctCategoryPath}/${slug}/menu?consumptionMethod=${consumptionMethod}`,
    )
  }

  return (
    <PageContainer>
      <AppMenuUI
        category={
          categories as
            | "pizzarias"
            | "restaurantes"
            | "hamburguerias"
            | "sorveterias"
            | "adegas"
        }
        establishment={establishment}
      />
    </PageContainer>
  )
}
