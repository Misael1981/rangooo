"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ViewModeToggle from "../ViewModeToggle";
import Products from "@/components/Products";
import SelectDoublePizza from "../SelectDoublePizza";
import { segmentForCategory } from "@/lib/routes";

const SelectionMenu = ({ categories, slug, segment }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [viewMode, setViewMode] = useState("single");
  const [selectedIds, setSelectedIds] = useState([]);
  const router = useRouter();
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedIds([]);
  };
  const category = segmentForCategory(segment);

  return (
    <div className="bg-white">
      <ScrollArea className="w-full px-4">
        <section className="flex w-max items-center gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory.id === category.id ? "default" : "secondary"
              }
              size="sm"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </section>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="my-4 bg-gray-300" />
      <section className="pb-16">
        {/pizza/i.test(String(selectedCategory?.name)) && (
          <>
            <ViewModeToggle value={viewMode} onChange={setViewMode} />
            {/* <SelectDoublePizza
              product={selectedCategory.products[0]}
              slug={slug}
            /> */}
          </>
        )}
        <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
        <Products
          products={selectedCategory.products}
          slug={slug}
          segment={segment}
          viewMode={viewMode}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        {viewMode === "double" && selectedIds.length === 2 && (
          <div className="px-5 py-3">
            <button
              type="button"
              className="w-full rounded-md border border-yellow-500 px-4 py-2 font-medium text-yellow-700"
              onClick={() =>
                router.push(
                  `/${category}/${slug}/menu/double?flavor1=${selectedIds[0]}&flavor2=${selectedIds[1]}`,
                )
              }
            >
              Confirmar sabores
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SelectionMenu;
