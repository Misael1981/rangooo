"use client";

import { segmentForCategory } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

function Products({ slug, segment, products, viewMode, selectedIds = [], onSelectionChange }) {
  const category = segmentForCategory(segment);
  const isDouble = String(viewMode) === "double";

  const toggleSelect = useCallback(
    (id) => {
      if (!onSelectionChange) return;
      const exists = selectedIds.includes(id);
      if (exists) {
        onSelectionChange(selectedIds.filter((x) => x !== id));
        return;
      }
      if (selectedIds.length >= 2) {
        return;
      }
      onSelectionChange([...selectedIds, id]);
    },
    [onSelectionChange, selectedIds],
  );

  const searchParams = useSearchParams();
  const cm = searchParams.get("consumptionMethod");
  return (
    <div className="space-y-6 p-4">
      {products.map((product) => {
        const cardInner = (
          <>
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
          </>
        );

        if (isDouble) {
          const selected = selectedIds.includes(product.id);
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => toggleSelect(product.id)}
              className={`flex w-full items-center gap-8 rounded-md border p-4 shadow-lg ${
                selected ? "border-green-500 ring-2 ring-green-200" : "border-gray-300"
              }`}
            >
              {cardInner}
            </button>
          );
        }

        const href = cm
          ? `/${category}/${slug}/menu/${product.id}?consumptionMethod=${cm}`
          : `/${category}/${slug}/menu/${product.id}`;
        return (
          <Link
            key={product.id}
            href={href}
            className="flex items-center gap-8 rounded-md border border-gray-300 p-4 shadow-lg"
          >
            {cardInner}
          </Link>
        );
      })}
    </div>
  );
}

export default Products;
