import { Button } from "@/components/ui/button";

const { Input } = require("@/components/ui/input");
const { Label } = require("@/components/ui/label");
const { Store, User, Clock } = require("lucide-react");

const InfoStep = ({ customerName, estimatedTime, onUpdate }) => {
  const timeOptions = [
    { value: "10", label: "10 min" },
    { value: "15", label: "15 min" },
    { value: "20", label: "20 min" },
    { value: "30", label: "30 min" },
    { value: "45", label: "45 min" },
    { value: "60", label: "1 hora" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Store className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Retirada no Balcão</h3>
        <p className="text-sm text-muted-foreground">
          Informe seu nome para identificação
        </p>
      </div>

      {/* Nome do Cliente */}
      <div className="space-y-2">
        <Label htmlFor="customerName" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Seu nome *
        </Label>
        <Input
          id="customerName"
          placeholder="Como devemos chamar você?"
          value={customerName}
          onChange={(e) => onUpdate("customerName", e.target.value)}
          className="text-center text-lg font-medium"
        />
        <p className="text-center text-xs text-muted-foreground">
          Este nome será usado para chamar quando seu pedido estiver pronto
        </p>
      </div>

      {/* Tempo Estimado (Opcional) */}
      <div className="space-y-3">
        <Label htmlFor="estimatedTime" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Tempo estimado para retirada
        </Label>

        <div className="grid grid-cols-3 gap-2">
          {timeOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={estimatedTime === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate("estimatedTime", option.value)}
              className="h-10"
            >
              {option.label}
            </Button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Tempo aproximado para preparo do pedido
        </p>
      </div>

      {/* Informações importantes */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
        <div className="flex items-start space-x-2 text-blue-800">
          <Store className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium">Retirada no balcão</p>
            <p className="text-xs">
              Você será avisado quando o pedido estiver pronto para retirada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoStep;
