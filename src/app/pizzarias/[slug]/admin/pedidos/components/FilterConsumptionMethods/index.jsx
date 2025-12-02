import { Button } from "@/components/ui/button";

const FilterConsumptionMethods = ({ consumptionMethods }) => {
  const mockConsumptionsMethods = [
    {
      id: 1,
      name: "Todos",
    },
    {
      id: 2,
      name: "Entrega",
    },
    {
      id: 3,
      name: "Retirada",
    },
    {
      id: 4,
      name: "Consumo",
    },
  ];
  return (
    <section className="my-6 flex flex-col items-center justify-center gap-2">
      <h2 className="text-lg font-bold">Métodos de Consumo</h2>
      <div className="flex flex-wrap gap-2">
        {mockConsumptionsMethods.map((method) => (
          <Button key={method.id}>{method.name}</Button>
        ))}
      </div>
    </section>
  );
};

export default FilterConsumptionMethods;
