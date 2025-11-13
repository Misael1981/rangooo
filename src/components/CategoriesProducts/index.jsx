"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import Products from "../Products";
import { Separator } from "../ui/separator";

const CategoriesProducts = ({ categories, slug, segment }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <section className="bg-white">
      <ScrollArea className="w-full px-4">
        <div className="flex w-max items-center gap-4">
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
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div>
        <Separator className="my-4 bg-gray-300" />
        <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
        <Products products={selectedCategory.products} slug={slug} segment={segment} />
      </div>
    </section>
  );
};

export default CategoriesProducts;
