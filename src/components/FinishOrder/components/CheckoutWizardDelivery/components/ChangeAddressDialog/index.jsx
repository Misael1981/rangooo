import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ChangeAddressDialog = ({ isOpen, onOpenChange, address, onUpdate }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] max-w-[95%]">
        <DialogHeader>
          <DialogTitle>Mudar Endereço</DialogTitle>
          <DialogDescription>
            Insira os novos dados do endereço
          </DialogDescription>
        </DialogHeader>
        <Input
          id="street"
          value={`${address.street}`}
          onChange={(e) => onUpdate("street", e.target.value)}
          className="block w-full"
        />
        <div className="flex items-center gap-2">
          <Input
            id="number"
            value={`${address.number}`}
            onChange={(e) => onUpdate("number", e.target.value)}
            className="block w-full"
          />
          <Input
            id="complement"
            value={`${address.complement || ""}`}
            onChange={(e) => onUpdate("complement", e.target.value)}
            className="block w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            id="neighborhood"
            value={`${address.neighborhood}`}
            onChange={(e) => onUpdate("neighborhood", e.target.value)}
            className="block w-full"
          />
          <Input
            id="city"
            value={`${address.city}`}
            onChange={(e) => onUpdate("city", e.target.value)}
            className="block w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onOpenChange(false)}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAddressDialog;
