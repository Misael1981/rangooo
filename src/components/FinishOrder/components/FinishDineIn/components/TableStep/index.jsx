import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Utensils } from "lucide-react";

const TableStep = ({ tableNumber, customerName, onUpdate }) => {
  const suggestedTables = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Comer no Local</h3>
        <p className="text-sm text-muted-foreground">
          Informe os dados da sua mesa
        </p>
      </div>

      {/* Nome do Cliente */}
      <div className="space-y-2">
        <Label htmlFor="customerName" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Seu nome (opcional)
        </Label>
        <Input
          id="customerName"
          placeholder="Como devemos chamar você?"
          value={customerName}
          onChange={(e) => onUpdate("customerName", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Para facilitar a entrega do pedido
        </p>
      </div>

      {/* Número da Mesa */}
      <div className="space-y-3">
        <Label htmlFor="tableNumber">Número da Mesa *</Label>
        <Input
          id="tableNumber"
          placeholder="Ex: 05"
          value={tableNumber}
          onChange={(e) => onUpdate("tableNumber", e.target.value)}
          className="text-center text-lg font-semibold"
        />

        {/* Sugestões Rápidas de Mesas */}
        {/* <div className="pt-2">
          <p className="mb-2 text-sm text-muted-foreground">
            Selecione rapidamente:
          </p>
          <div className="grid grid-cols-5 gap-2">
            {suggestedTables.map((table) => (
              <Button
                key={table}
                type="button"
                variant={tableNumber === table ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdate("tableNumber", table)}
                className="h-10"
              >
                {table}
              </Button>
            ))}
          </div>
        </div> */}
      </div>

      {/* Aviso */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <div className="flex items-start space-x-2 text-amber-800">
          <Utensils className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium">Atenção</p>
            <p className="text-xs">Confirme o número da mesa com o garçom</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableStep;
