import { getProductDetails } from "@/app/actions/get-product-details";
import HeaderImage from "@/components/HeaderImage";
import ProductDetails from "@/components/ProductDetails";
import QrCode from "@/components/QrCode";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { slug, productId } = await params;

  const data = await getProductDetails(slug, productId);

  const deliveryFeeBase = await db.restaurant.findUnique({
    where: { slug },
    select: { deliveryFee: true },
  });

  // Defensive parse: Prisma `Decimal` or unexpected values can break serialization in production.
  let deliveryFee = 0;
  try {
    const raw = deliveryFeeBase?.deliveryFee;
    if (raw !== undefined && raw !== null) {
      const parsed = Number(String(raw));
      deliveryFee = Number.isFinite(parsed) ? parsed : 0;
    }
  } catch (err) {
    // Log to server logs (Vercel) to help debug production-only errors without leaking details to users.
    console.error(
      "Failed to parse deliveryFee for restaurant",
      slug,
      deliveryFeeBase,
      err,
    );
    deliveryFee = 0;
  }

  if (!data) {
    return notFound();
  }

  const { restaurant, additionalIngredients, product } = data;
  const { avatarImageUrl, name, isOpen, consumptionMethods } = restaurant;

  return (
    <div className="relative min-h-screen bg-yellow-50 sm:py-6">
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <QrCode />
      </div>
      <div className="mx-auto flex max-w-xl flex-col bg-white shadow-all-sides">
        <HeaderImage image={product.imageUrl} alt={product.name} />
        <ProductDetails
          product={product}
          additionalIngredients={additionalIngredients}
          isOpen={isOpen}
          deliveryFee={deliveryFee}
          avatarImageUrl={avatarImageUrl}
          restaurantName={name}
          consumptionMethods={consumptionMethods}
        />
      </div>
      <div className="fixed bottom-8 right-8 hidden lg:block">
        <QrCode />
      </div>
    </div>
  );
}
