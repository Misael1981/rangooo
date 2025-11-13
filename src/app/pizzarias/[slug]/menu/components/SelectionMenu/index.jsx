"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ViewModeToggle from "../ViewModeToggle";
import Products from "@/components/Products";

const SelectionMenu = ({ categories, slug, segment }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [viewMode, setViewMode] = useState("single");
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

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
      <section>
        {/pizza/i.test(String(selectedCategory?.name)) && (
          <ViewModeToggle value={viewMode} onChange={setViewMode} />
        )}
        <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
        <Products
          products={selectedCategory.products}
          slug={slug}
          segment={segment}
          viewMode={viewMode}
        />
      </section>
    </div>
  );
};

export default SelectionMenu;
