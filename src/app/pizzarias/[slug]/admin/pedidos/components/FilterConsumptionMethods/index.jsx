"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const LABELS = {
  DELIVERY: "Entrega",
  PICKUP: "Retirada",
  DINE_IN: "Consumo Local",
};

const FilterConsumptionMethods = ({ consumptionMethods = [] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const active = searchParams.get("consumptionMethod") || null;

  const handleFilterChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete("consumptionMethod");
    } else {
      params.set("consumptionMethod", value);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const available = Array.isArray(consumptionMethods)
    ? consumptionMethods
        .map((m) => (typeof m === "string" ? m : m?.method))
        .filter(Boolean)
    : [];

  return (
    <section className="my-6 flex flex-col items-center justify-center gap-2">
      <h2 className="text-lg font-bold">Métodos de Consumo</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={active === null ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange(null)}
        >
          Todos
        </Button>
        {available.map((method) => (
          <Button
            key={method}
            variant={active === method ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange(method)}
          >
            {LABELS[method] || method}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default FilterConsumptionMethods;
