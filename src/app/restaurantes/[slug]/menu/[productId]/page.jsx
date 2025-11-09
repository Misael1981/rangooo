import { db } from "@/lib/prisma";
import HeaderMenu from "../components/HeaderMenu";
import ProductDetails from "./components/ProductDetails";
import { notFound } from "next/navigation";
import { toPlain } from "@/lib/utils";
import ProductDescription from "./components/ProductDescription";
import AddToBagButton from "./components/AddToBagButton";

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
    notFound();
  }

  if (product.restaurant.slug !== slug) {
    notFound();
  }

  const productPlain = toPlain(product);
  const restaurantPlain = productPlain.restaurant;

  return (
    <div className="flex flex-col">
      <HeaderMenu image={product.imageUrl} alt={product.name} />
      <ProductDetails product={productPlain} restaurant={restaurantPlain} />
    </div>
  );
}
