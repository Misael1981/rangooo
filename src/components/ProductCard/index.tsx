import { ProductDTO } from "@/dtos/establishment-menu-data.dto";
import { formatCurrency } from "@/helpers/format-currency";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: ProductDTO;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  method?: string | null;
  categorie: string;
  slug: string;
};

const ProductCard = ({
  product,
  isSelectionMode,
  isSelected,
  onSelect,
  method,
  categorie,
  slug,
}: ProductCardProps) => {
  const CardContent = (
    <div
      className={`flex w-full items-center justify-between gap-4 border rounded-lg bg-white p-4 shadow-sm transition-all ${
        isSelected
          ? "border-green-500 ring-2 ring-green-100"
          : "border-gray-200"
      }`}
    >
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {product.description}
        </p>
        <p className="text-sm font-semibold text-green-600">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div className="relative h-20 w-24 shrink-0">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );

  if (isSelectionMode) {
    return (
      <button
        onClick={() => onSelect?.(product.id)}
        className="w-full text-left"
      >
        {CardContent}
      </button>
    );
  }

  // Se não for seleção, ele é um Link para a página de 1 sabor só
  return (
    <Link
      href={`/${categorie}s/${slug}/menu/${product.id}?consumptionMethod=${method}`}
      className="block"
    >
      {CardContent}
    </Link>
  );
};

export default ProductCard;
