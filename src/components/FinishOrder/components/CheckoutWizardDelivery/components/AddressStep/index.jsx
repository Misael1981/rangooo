import { Input } from "@/components/ui/input";

const AddressStep = ({ address, onUpdate }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Confirme seu endereço</h3>
      <p className="text-sm text-muted-foreground">
        Verifique se o endereço está correto ou faça ajustes se necessário
      </p>

      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-2">
          <Input
            id="street"
            value={`${address.street}`}
            onChange={(e) => onUpdate("street", e.target.value)}
            className="block"
          />
        </div>
        <div className="col-span-2">
          <Input
            id="street"
            value={`${address.number} - ${address.complement || ""} - ${address.neighborhood}`}
            onChange={(e) => onUpdate("street", e.target.value)}
            className="block"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
