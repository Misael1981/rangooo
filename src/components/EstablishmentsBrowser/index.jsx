"use client";
import { useState, useMemo } from "react";
import ButtonsType from "@/components/ButtonsType";
import ClientsCards from "@/components/ClientsCards";

export default function EstablishmentsBrowser({ establishments }) {
  const [category, setCategory] = useState("ALL");

  const list = useMemo(() => {
    if (!Array.isArray(establishments)) return [];
    if (category === "ALL") return establishments;
    return establishments.filter((e) => e.category === category);
  }, [establishments, category]);

  return (
    <div className="space-y-4">
      <ButtonsType onSelectCategory={setCategory} selectedCategory={category} />
      <ClientsCards clients={list} />
    </div>
  );
}
