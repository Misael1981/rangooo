import { getProductDetails } from "@/app/actions/get-product-details";
import HeaderImage from "@/components/HeaderImage";
import ProductDetails from "@/components/ProductDetails";
import QrCode from "@/components/QrCode";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { slug, productId } = await params;

  const data = await getProductDetails(slug, productId);

  if (!data) {
    return notFound();
  }

  const { restaurant, additionalIngredients, product } = data;

  return (
    <div className="relative min-h-screen bg-yellow-50 sm:py-6">
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <QrCode />
      </div>
      <div className="mx-auto flex max-w-xl flex-col bg-white shadow-all-sides">
        <HeaderImage image={product.imageUrl} alt={product.name} />
        <ProductDetails
          product={product}
          restaurant={restaurant}
          additionalIngredients={additionalIngredients}
          isOpen={restaurant.isOpen}
        />
      </div>
      <div className="fixed bottom-8 right-8 hidden lg:block">
        <QrCode />
      </div>
    </div>
  );
}
