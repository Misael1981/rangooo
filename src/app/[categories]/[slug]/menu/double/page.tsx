import { getDoubleProductDetails } from "@/data/get-double-product-details";
import HeaderDoubleImages from "./components/HeaderDoubleImages";
import ProductDoubleDetailsWrapper from "./components/ProductDoubleDetailsWrapper";
import { PageContainer } from "@/components/PageContainer";

interface DoublePizzaPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ flavor1: string; flavor2: string }>;
}

export default async function DoublePizzaPage({
  params,
  searchParams,
}: DoublePizzaPageProps) {
  const { slug } = await params;
  const { flavor1, flavor2 } = await searchParams;

  const data = await getDoubleProductDetails(slug, flavor1, flavor2);

  if (!data) {
    return (
      <div className="p-10 text-center">Ops! Sabores não encontrados.</div>
    );
  }

  const { flavor1: f1, flavor2: f2, restaurant } = data;

  const flavor1WithExtras = {
    ...f1,
    additionalIngredients: f1.additionalIngredients || [],
    ingredients: f1.ingredients || [],
  };

  const flavor2WithExtras = {
    ...f2,
    additionalIngredients: f2.additionalIngredients || [],
    ingredients: f2.ingredients || [],
  };

  const deliveryFee = restaurant.deliveryFee;
  const establishmentOpen = restaurant.isOpen;

  return (
    <PageContainer>
      <HeaderDoubleImages
        imageUrl1={f1.imageUrl}
        imageUrl2={f2.imageUrl}
        alt1={f1.name}
        alt2={f2.name}
      />
      <main className=" bg-white min-h-50 -mt-6 z-50 relative rounded-t-3xl p-4 space-y-4">
        <ProductDoubleDetailsWrapper
          establishmentName={restaurant.name}
          establishmentImage={restaurant.avatarImageUrl}
          flavor1={flavor1WithExtras}
          flavor2={flavor2WithExtras}
          establishmentOpen={establishmentOpen}
          restaurantDeliveryAreas={restaurant.deliveryAreas}
          systemSettings={restaurant.systemSettings}
          useRangoooDelivery={restaurant.useRangoooDelivery}
        />
      </main>
    </PageContainer>
  );
}
