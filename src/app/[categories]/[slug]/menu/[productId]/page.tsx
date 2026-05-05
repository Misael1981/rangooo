import HeaderMenu from "@/components/HeaderMenu"
import { PageContainer } from "@/components/PageContainer"
import ProductDetailsWrapper from "@/components/ProductDetailsWrapper"
import { RestaurantInitializer } from "@/components/RestaurantInitializer"
import { getProductDetails } from "@/data/get-product-details"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

interface ProductPageProps {
  params: Promise<{
    slug: string
    productId: string
    category: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  const data = await getProductDetails(slug, productId, userId)

  if (!data) {
    return <div>Produto não encontrado ou restaurante inválido.</div>
  }

  const { product, restaurant } = data

  const establishmentData = {
    name: restaurant.name,
    avatarImageUrl: restaurant.avatarImageUrl,
  }

  const establishmentOpen = restaurant.isOpen

  const systemSettings = restaurant.systemSettings
  const useRangoooDelivery = restaurant.useRangoooDelivery
  const userAreaType = restaurant.userAreaType
  const restaurantDeliveryAreas = restaurant.deliveryAreas.map((area) => ({
    ...area,
    fee: area.fee / 100,
  }))

  return (
    <PageContainer>
      <RestaurantInitializer
        systemSettings={systemSettings}
        restaurantDeliveryAreas={restaurantDeliveryAreas}
        useRangoooDelivery={useRangoooDelivery}
        userAreaType={userAreaType}
      />
      <div className="flex min-h-screen flex-col">
        <HeaderMenu image={product.imageUrl} alt={product.name} />
        <main className="relative z-50 -mt-6 flex-1 space-y-4 rounded-t-3xl bg-white p-4">
          <ProductDetailsWrapper
            establishmentName={establishmentData.name}
            establishmentImage={establishmentData.avatarImageUrl}
            product={product}
            establishmentOpen={establishmentOpen}
            restaurantDeliveryAreas={restaurantDeliveryAreas}
            systemSettings={systemSettings}
            useRangoooDelivery={useRangoooDelivery}
            userAreaType={userAreaType}
          />
        </main>
      </div>
    </PageContainer>
  )
}
