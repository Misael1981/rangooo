import { CheckCircle2, ShoppingBag } from "lucide-react";
import { CheckoutState } from "@/dtos/finish-order.dto";
import { CartContext } from "@/contexts/cart-context";
import { useContext } from "react";

type ConfirmStepProps = {
  checkoutState: CheckoutState;
};

const ConfirmStep = ({ checkoutState }: ConfirmStepProps) => {
  const { products, totalFinal } = useContext(CartContext);

  console.log(products);
  console.log(totalFinal);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-red-500" />
        Confirme seu pedido
      </h3>

      <div className="space-y-4 divide-y divide-border">
        <div className="pb-4 space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Itens do Pedido
          </h4>
          <div className="max-h-32 overflow-y-auto pr-2 space-y-1">
            {products.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-semibold">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t pt-2 font-bold text-red-600">
            <span>Total</span>
            <span>{totalFinal}</span>
          </div>
        </div>

        {/* 2. Endereço */}
        <div className="py-4">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Entrega
          </h4>
          <p className="text-sm">
            {checkoutState.delivery?.address?.street},{" "}
            {checkoutState.delivery?.address?.number}
            <br />
            <span className="text-muted-foreground">
              {checkoutState.delivery?.address?.neighborhood} -{" "}
              {checkoutState.delivery?.address?.city}
            </span>
          </p>
        </div>

        {/* 3. Pagamento */}
        <div className="py-4">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Pagamento
          </h4>
          <p className="text-sm capitalize">
            {checkoutState.payment?.paymentMethod === "pix" && "💠 PIX"}
            {checkoutState.payment?.paymentMethod === "card" &&
              "💳 Cartão na Entrega"}
            {checkoutState.payment?.paymentMethod === "cash" && "💵 Dinheiro"}
            {checkoutState.payment?.paymentMethod === "cash" &&
              checkoutState.payment?.needsChange &&
              ` (Troco para R$ ${checkoutState.payment?.changeAmount})`}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">
            Tudo certo! Pode finalizar.
          </span>
        </div>
      </div>
    </div>
  );
};
export default ConfirmStep;
