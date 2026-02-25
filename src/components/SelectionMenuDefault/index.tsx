"use client";

import { MenuCategoryDTO } from "@/dtos/establishment-menu-data.dto";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import ProductCard from "../ProductCard";
import SearchProduct from "../SearchProduct";
import { useSearchParams } from "next/navigation";

type SelectionMenuDefaultProps = {
  menuCategories: MenuCategoryDTO[];
  slug: string;
  categorie: string;
};

const SelectionMenuDefault = ({
  menuCategories,
  slug,
  categorie,
}: SelectionMenuDefaultProps) => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const method = searchParams.get("consumptionMethod");

  const handleCategoryClick = (category: MenuCategoryDTO) => {
    setSelectedCategory(category);
  };

  const handleSelectProduct = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else if (selectedIds.length < 2) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredProducts = selectedCategory.products.filter((product) => {
    const searchLower = searchValue.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <section>
        <ScrollArea className="w-full">
          <Separator className="my-4 bg-gray-300" />
          <div className="flex w-max items-center gap-4">
            {menuCategories.map((category) => (
              <Button
                key={category.id}
                size="sm"
                variant={
                  selectedCategory.id === category.id ? "default" : "secondary"
                }
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <Separator className="my-4 bg-gray-300" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <SearchProduct
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <section className="space-y-6 sm:px-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedIds.includes(product.id)}
            onSelect={handleSelectProduct}
            method={method}
            categorie={categorie}
            slug={slug}
          />
        ))}
      </section>
    </>
  );
};

export default SelectionMenuDefault;
