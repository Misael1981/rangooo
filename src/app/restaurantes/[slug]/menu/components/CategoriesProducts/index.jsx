"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import Products from "../Products";

const CategoriesProducts = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <section>
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
      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products} />
    </section>
  );
};

export default CategoriesProducts;
