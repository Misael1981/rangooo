import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutState } from "@/dtos/finish-order.dto";
import { User, Utensils } from "lucide-react";

type TableStepProps = {
  checkoutState: CheckoutState;
  onUpdateState: (
    key: keyof CheckoutState,
    value: CheckoutState[keyof CheckoutState],
  ) => void;
};

const suggestedTables = ["01", "02", "03", "04", "05"];

const TableStep = ({ checkoutState, onUpdateState }: TableStepProps) => {
  const handleNameChange = (name: string) => {
    onUpdateState("customer", { ...checkoutState.customer, name });
  };

  const handleTableChange = (table: string) => {
    onUpdateState("dineInDetails", {
      ...checkoutState.dineInDetails,
      tableNumber: table,
    });
  };

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
          Seu nome
        </Label>
        <Input
          id="customerName"
          placeholder="Como devemos chamar você?"
          value={checkoutState.customer?.name || ""}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>

      {/* Número da Mesa */}
      <div className="space-y-3">
        <Label htmlFor="tableNumber">Número da Mesa *</Label>
        <Input
          id="tableNumber"
          placeholder="Ex: 05"
          className="text-center text-lg font-semibold"
          value={checkoutState.dineInDetails?.tableNumber || ""}
          onChange={(e) => handleTableChange(e.target.value)}
        />

        {/* Sugestões Rápidas */}
        <div className="pt-2">
          <p className="mb-2 text-sm text-muted-foreground">Seleção rápida:</p>
          <div className="grid grid-cols-5 gap-2">
            {suggestedTables.map((table) => (
              <Button
                key={table}
                type="button"
                variant={
                  checkoutState.dineInDetails?.tableNumber === table
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => handleTableChange(table)}
                className="h-10"
              >
                {table}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Aviso */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <div className="flex items-start space-x-2 text-amber-800">
          <Utensils className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-xs">Atenção</p>
            <p className="text-[10px] leading-tight">
              Confirme o número na placa da sua mesa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableStep;
