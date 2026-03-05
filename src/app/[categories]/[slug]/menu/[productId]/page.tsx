import HeaderMenu from "@/components/HeaderMenu";
import { PageContainer } from "@/components/PageContainer";
import ProductDetailsWrapper from "@/components/ProductDetailsWrapper";
import { getProductDetails } from "@/data/get-product-details";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface ProductPageProps {
  params: Promise<{
    slug: string;
    productId: string;
    category: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const data = await getProductDetails(slug, productId, userId);

  if (!data) {
    return <div>Produto não encontrado ou restaurante inválido.</div>;
  }

  const { product, restaurant } = data;

  const establishmentData = {
    name: restaurant.name,
    avatarImageUrl: restaurant.avatarImageUrl,
  };

  const establishmentOpen = restaurant.isOpen;

  const restaurantDeliveryAreas = restaurant.deliveryAreas;
  const systemSettings = restaurant.systemSettings;
  const useRangoooDelivery = restaurant.useRangoooDelivery;
  const userAreaType = restaurant.userAreaType;

  return (
    <PageContainer>
      <div className="flex flex-col min-h-screen">
        <HeaderMenu image={product.imageUrl} alt={product.name} />
        <main className="flex-1 bg-white -mt-6 z-50 relative rounded-t-3xl p-4 space-y-4">
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
  );
}
