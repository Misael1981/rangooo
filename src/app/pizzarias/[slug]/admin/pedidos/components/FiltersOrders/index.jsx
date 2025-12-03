"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const STATUS_LABELS = {
  PENDING: "Pendentes",
  PREPARING: "Em Preparo",
  READY_FOR_PICKUP: "Prontos",
  DELIVERED: "Entregues",
};

const FILTERS = ["PENDING", "PREPARING", "READY_FOR_PICKUP", "DELIVERED"];

const FiltersOrders = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const active = searchParams.get("status") || null;

  const handleFilterChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete("status");
    else params.set("status", value);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <section className="my-6 space-y-2">
      <h2 className="text-lg font-bold">Status dos Pedidos</h2>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={active === null ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange(null)}
        >
          Todos
        </Button>
        {FILTERS.map((s) => (
          <Button
            key={s}
            variant={active === s ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange(s)}
          >
            {STATUS_LABELS[s] || s}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default FiltersOrders;
