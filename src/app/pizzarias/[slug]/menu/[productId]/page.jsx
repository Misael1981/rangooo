import HeaderImage from "@/components/HeaderImage";
import ProductDetails from "@/components/ProductDetails";
import { db } from "@/lib/prisma";
import { toPlain } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ProductPage({ params, searchParams }) {
  const { slug, productId } = await params;
  const { flavor2 } = await searchParams;
  const product = await db.Product.findUnique({
    where: { id: productId },
    include: {
      menuCategory: true,
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  if (product.restaurant.slug !== slug) {
    return notFound();
  }

  const productPlain = toPlain(product);
  const restaurantPlain = productPlain.restaurant;
  let secondProductPlain = null;
  if (flavor2) {
    const product2 = await db.Product.findUnique({
      where: { id: String(flavor2) },
      include: {
        menuCategory: true,
        restaurant: true,
      },
    });
    if (!product2 || product2.restaurant.slug !== slug) {
      return notFound();
    }
    secondProductPlain = toPlain(product2);
  }

  return (
    <div className="flex flex-col">
      <HeaderImage image={product.imageUrl} alt={product.name} />
      <ProductDetails
        product={productPlain}
        restaurant={restaurantPlain}
        secondProduct={secondProductPlain}
      />
    </div>
  );
}
