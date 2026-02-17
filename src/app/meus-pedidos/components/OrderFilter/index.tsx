import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const OrderFilter = () => {
  return (
    <section className="flex gap-2 px-5 py-4">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Nome do estabelecimento..." className="pl-9" />
      </div>
    </section>
  );
};

export default OrderFilter;
