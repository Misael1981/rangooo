import { segmentForCategory } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";

function Products({ slug, segment, products }) {
  const category = segmentForCategory(segment);
  return (
    <div className="space-y-6 p-4">
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/${category}/${slug}/menu/${product.id}`}
            className="flex items-center gap-8 rounded-md border border-gray-300 p-4 shadow-lg"
          >
            <div className="space-y-1">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {product.description}
              </p>
              <p className="text-sm font-semibold text-green-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </p>
            </div>
            <div className="relative min-h-[82px] min-w-[120px]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Products;
