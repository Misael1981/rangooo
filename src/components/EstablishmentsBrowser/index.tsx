"use client";

import { EstablishmentDto } from "@/dtos/establishments.dto";
import { useMemo, useState } from "react";
import EstablishmentFilters from "../EstablishmentFilters";
import EstablishmentCards from "../EstablishmentCards";

type EstablishmentsBrowserProps = {
  establishments: EstablishmentDto[];
};

const EstablishmentsBrowser = ({
  establishments,
}: EstablishmentsBrowserProps) => {
  const [category, setCategory] = useState("ALL");

  const list = useMemo(() => {
    if (!Array.isArray(establishments)) return [];
    if (category === "ALL") return establishments;
    return establishments.filter((e) => e.category === category);
  }, [establishments, category]);

  return (
    <div className="space-y-4">
      <EstablishmentFilters
        onSelectCategory={setCategory}
        selectedCategory={category}
      />
      <EstablishmentCards establishments={list} />
    </div>
  );
};

export default EstablishmentsBrowser;
// EstablishmentCards
