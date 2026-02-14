"use client";

import { MenuCategoryDTO } from "@/dtos/establishment-menu-data.dto";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import ViewModeToggle from "../ViewModeToggle";
import ProductCard from "../ProductCard";
import SearchProduct from "../SearchProduct";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SelectionMenuProps = {
  menuCategories: MenuCategoryDTO[];
  slug: string;
  categorie: string;
};

const SelectionMenu = ({
  menuCategories,
  slug,
  categorie,
}: SelectionMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]);
  const [viewMode, setViewMode] = useState("single");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const method = searchParams.get("consumptionMethod");

  const isDouble = viewMode === "double";

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
      <section>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
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
            isSelectionMode={isDouble}
            isSelected={selectedIds.includes(product.id)}
            onSelect={handleSelectProduct}
            method={method}
            categorie={categorie}
            slug={slug}
          />
        ))}
      </section>

      {isDouble && selectedIds.length === 2 && (
        <div className="fixed bottom-6 left-0 right-0 px-5 lg:max-w-xl lg:mx-auto">
          <Button
            asChild
            className="w-full shadow-lg bg-green-600 hover:bg-green-700 h-12"
          >
            <Link
              href={`/${categorie}s/${slug}/menu/double?flavor1=${selectedIds[0]}&flavor2=${selectedIds[1]}&consumptionMethod=${method}`}
            >
              Montar Pizza Meio a Meio
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectionMenu;
