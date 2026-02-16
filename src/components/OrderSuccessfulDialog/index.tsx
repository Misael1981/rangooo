import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type OrderSuccessfulDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const OrderSuccessfulDialog = ({
  isOpen,
  onOpenChange,
}: OrderSuccessfulDialogProps) => {
  const router = useRouter();

  const goToOrders = () => {
    onOpenChange(false);
    router.push("/meus-pedidos");
  };

  const goToMenu = () => {
    onOpenChange(false);
    router.back();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-90 max-w-[95%] rounded-md bg-white p-4 shadow-md">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <DialogHeader>
          <DialogTitle>Pedido Efetuado!</DialogTitle>
          <DialogDescription>
            Seu pedido foi realizado com sucesso!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around">
          <Button
            variant="outline"
            className="text-red-500"
            onClick={goToOrders}
          >
            Ver Pedidos
          </Button>
          <Button variant="outline" onClick={goToMenu}>
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessfulDialog;
