import { CheckoutState } from "@/dtos/finish-order.dto"
import { CheckCircle2, UtensilsCrossed } from "lucide-react"

type ConfirmStepProps = {
  checkoutState: CheckoutState
}

const ConfirmStep = ({ checkoutState }: ConfirmStepProps) => {
  const tableNumber =
    checkoutState.dineInDetails?.tableNumber || "Não informada"
  const customerName = checkoutState.customer?.name || "Não informado"

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <UtensilsCrossed className="text-primary h-8 w-8" />
        </div>
        <h3 className="mt-2 text-lg font-semibold">Resumo do Pedido</h3>
        <p className="text-muted-foreground text-sm">
          Confira os dados antes de enviar para a cozinha
        </p>
      </div>

      <div className="bg-muted/20 space-y-4 rounded-xl border p-4">
        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-muted-foreground text-sm">Local</span>
          <span className="text-primary text-lg font-bold">
            Mesa {tableNumber}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-muted-foreground text-sm">Identificação</span>
          <span className="font-medium capitalize">{customerName}</span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-muted-foreground text-center text-[12px] italic">
          Ao finalizar, o pedido será enviado diretamente para a produção da
          casa.
        </p>
      </div>

      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">
            Tudo certo! Pode finalizar seu pedido.
          </span>
        </div>
      </div>
    </div>
  )
}

export default ConfirmStep
