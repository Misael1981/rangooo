import { db } from "@/lib/prisma";
import { toPlain } from "@/lib/utils";
import { notFound } from "next/navigation";
import HeaderDoubleImages from "../../../../[categories]/[slug]/menu/components/HeaderDoubleImages";
import ProductDoubleDetails from "../../../../[categories]/[slug]/menu/components/ProductDoubleDetails";
import { getAdditionalIngredientByMenuCategory } from "@/data/get-AdditionalIngredient-by-menuCategory";
import QrCode from "@/components/QrCode";

export default async function Double({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const flavor1 = String(sp?.flavor1 || "");
  const flavor2 = String(sp?.flavor2 || "");

  if (!flavor1 || !flavor2) {
    return notFound();
  }

  const p1 = await db.Product.findUnique({
    where: { id: flavor1 },
    include: { menuCategory: true, restaurant: true },
  });
  const p2 = await db.Product.findUnique({
    where: { id: flavor2 },
    include: { menuCategory: true, restaurant: true },
  });

  if (!p1 || !p2) {
    return notFound();
  }
  if (p1.restaurant.slug !== slug || p2.restaurant.slug !== slug) {
    return notFound();
  }

  const additionalIngredients = await getAdditionalIngredientByMenuCategory(
    p1.menuCategoryId,
  );

  const productPlain = toPlain(p1);
  const secondProductPlain = toPlain(p2);
  const restaurantPlain = productPlain.restaurant;

  return (
    <div className="relative min-h-screen bg-yellow-50 sm:py-6">
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <QrCode />
      </div>
      <div className="mx-auto flex max-w-xl flex-col bg-white shadow-all-sides">
        <HeaderDoubleImages
          imageUrl1={productPlain.imageUrl}
          imageUrl2={secondProductPlain.imageUrl}
          alt1={productPlain.name}
          alt2={secondProductPlain.name}
        />
        <ProductDoubleDetails
          product={productPlain}
          secondProduct={secondProductPlain}
          restaurant={restaurantPlain}
          additionalIngredients={additionalIngredients}
        />
      </div>
      <div className="fixed bottom-8 right-8 hidden lg:block">
        <QrCode />
      </div>
    </div>
  );
}
