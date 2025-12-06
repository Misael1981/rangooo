import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { toPlain } from "@/lib/utils";
import HeaderImage from "@/components/HeaderImage";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }) {
  const { slug, productId } = await params;
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
  return (
    <div className="flex flex-col">
      <HeaderImage image={product.imageUrl} alt={product.name} />
      <ProductDetails product={productPlain} restaurant={restaurantPlain} />
    </div>
  );
}
