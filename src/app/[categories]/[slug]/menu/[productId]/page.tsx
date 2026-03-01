import HeaderMenu from "@/components/HeaderMenu";
import { PageContainer } from "@/components/PageContainer";
import ProductDetails from "@/components/ProductDetails";
import { getProductDetails } from "@/data/get-product-details";

interface ProductPageProps {
  params: Promise<{
    slug: string;
    productId: string;
    category: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;

  const data = await getProductDetails(slug, productId);

  if (!data) {
    return <div>Produto não encontrado ou restaurante inválido.</div>;
  }

  const { product, restaurant } = data;

  const establishmentData = {
    name: restaurant.name,
    avatarImageUrl: restaurant.avatarImageUrl,
  };

  const deliveryFee = restaurant.deliveryFee;

  const establishmentOpen = restaurant.isOpen;

  return (
    <PageContainer>
      <div className="flex flex-col min-h-screen">
        <HeaderMenu image={product.imageUrl} alt={product.name} />
        <main className="flex-1 bg-white -mt-6 z-50 relative rounded-t-3xl p-4 space-y-4">
          <ProductDetails
            establishmentName={establishmentData.name}
            establishmentImage={establishmentData.avatarImageUrl}
            product={product}
            deliveryFee={deliveryFee}
            establishmentOpen={establishmentOpen}
          />
        </main>
      </div>
    </PageContainer>
  );
}
