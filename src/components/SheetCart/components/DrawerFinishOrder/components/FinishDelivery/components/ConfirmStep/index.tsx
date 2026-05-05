import { CheckCircle2, ShoppingBag } from "lucide-react"
import { CheckoutState } from "@/dtos/finish-order.dto"
import { CartContext } from "@/contexts/cart-context"
import { useContext } from "react"

type ConfirmStepProps = {
  checkoutState: CheckoutState
}

const ConfirmStep = ({ checkoutState }: ConfirmStepProps) => {
  const { products, totalFinal } = useContext(CartContext)

  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <ShoppingBag className="h-5 w-5 text-red-500" />
        Confirme seu pedido
      </h3>

      <div className="divide-border space-y-4 divide-y">
        <div className="space-y-2 pb-4">
          <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            Itens do Pedido
          </h4>
          <div className="max-h-32 space-y-1 overflow-y-auto pr-2">
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
          <h4 className="text-muted-foreground mb-1 text-sm font-medium tracking-wider uppercase">
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
          <h4 className="text-muted-foreground mb-1 text-sm font-medium tracking-wider uppercase">
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
  )
}
export default ConfirmStep
