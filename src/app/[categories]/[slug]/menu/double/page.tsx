import { getDoubleProductDetails } from "@/data/get-double-product-details";
import QrCodeImage from "@/components/QrCodeImage";
import HeaderDoubleImages from "./components/HeaderDoubleImages";
import ProductDoubleDetails from "./components/ProductDoubleDetails";

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

  return (
    <div className="lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:fixed lg:inset-0 lg:-z-10">
      <div className="bg-black/40 min-h-screen">
        <div className="relative min-h-screen sm:py-6">
          <QrCodeImage direction="left" />

          <div className="mx-auto max-w-xl bg-white shadow-2xl min-h-screen">
            <HeaderDoubleImages
              imageUrl1={f1.imageUrl}
              imageUrl2={f2.imageUrl}
              alt1={f1.name}
              alt2={f2.name}
            />
            <main className=" bg-white min-h-50 -mt-6 z-50 relative rounded-t-3xl p-4 space-y-4">
              <ProductDoubleDetails
                establishmentName={restaurant.name}
                establishmentImage={restaurant.avatarImageUrl}
                flavor1={flavor1WithExtras}
                flavor2={flavor2WithExtras}
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
