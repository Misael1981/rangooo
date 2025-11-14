import HeaderImage from "@/components/HeaderImage";
import ProductDetails from "@/components/ProductDetails";
import { db } from "@/lib/prisma";
import { toPlain } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function Double({ params, searchParams }) {
  const { slug } = await params;
  const flavor1 = String(searchParams?.flavor1 || "");
  const flavor2 = String(searchParams?.flavor2 || "");

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

  const productPlain = toPlain(p1);
  const secondProductPlain = toPlain(p2);
  const restaurantPlain = productPlain.restaurant;

  return (
    <div className="flex flex-col">
      <h1>
        pagina para dois sobores: {productPlain.name} +{" "}
        {secondProductPlain.name}
      </h1>
    </div>
  );
}
