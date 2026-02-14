import HeaderMenu from "@/components/HeaderMenu";
import ProductDetails from "@/components/ProductDetails";
import QrCodeImage from "@/components/QrCodeImage";
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

  return (
    <div className=" lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:fixed lg:inset-0 lg:-z-10">
      <div className="bg-black/40 min-h-screen">
        <div className="relative min-h-screen sm:py-6">
          <QrCodeImage direction="left" />
          <div className="mx-auto max-w-xl shadow-lg bg-white overflow-y-auto h-screen scrollbar-hide">
            <HeaderMenu image={product.imageUrl} alt={product.name} />
            <main className=" bg-white min-h-50 -mt-6 z-50 relative rounded-t-3xl p-4 space-y-4">
              <ProductDetails
                establishmentName={establishmentData.name}
                establishmentImage={establishmentData.avatarImageUrl}
                product={product}
                deliveryFee={deliveryFee}
              />
            </main>
          </div>
          <QrCodeImage direction="right" />
        </div>
      </div>
    </div>
  );
}
