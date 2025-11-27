import { Button } from "@/components/ui/button";

const FiltersOrders = () => {
  return (
    <section className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button variant="default" size="sm">
          Todos
        </Button>
        <Button variant="outline" size="sm">
          Pendentes
        </Button>
        <Button variant="outline" size="sm">
          Em Preparo
        </Button>
        <Button variant="outline" size="sm">
          Prontos
        </Button>
        <Button variant="outline" size="sm">
          Entregues
        </Button>
      </div>
    </section>
  );
};

export default FiltersOrders;
