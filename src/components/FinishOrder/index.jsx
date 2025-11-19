import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import FinishDelivery from "./components/FinishDelivery";
import FinishPickup from "./components/FinishPickup";
import FinishDineIn from "./components/FinishDineIn";

const FinishOrder = ({ isOpen, onOpenChange }) => {
  const sp = useSearchParams();
  const consumptionMethod = sp.get("consumptionMethod") || "DELIVERY";
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Método de consumo: {consumptionMethod}
          </DrawerDescription>
        </DrawerHeader>
        <section>
          {consumptionMethod === "DELIVERY" && <FinishDelivery />}
          {consumptionMethod === "PICKUP" && <FinishPickup />}
          {consumptionMethod === "DINE_IN" && <FinishDineIn />}
        </section>
        <DrawerFooter>
          <Button>Confirmar</Button>
          <DrawerClose asChild>
            <Button variant="destructive">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrder;
