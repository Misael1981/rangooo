import { CheckoutState } from "@/dtos/finish-order.dto"
import { CheckCircle2, CheckCircle2Icon, Clock } from "lucide-react"

type ConfirmStepProps = {
  checkoutState: CheckoutState
}

const ConfirmStep = ({ checkoutState }: ConfirmStepProps) => {
  const getTimeText = (minutes?: string) => {
    if (!minutes) return "Não informado"
    if (minutes === "60") return "1 hora"
    if (minutes === "120") return "2 horas"
    return `${minutes} minutos`
  }

  const customerName = checkoutState.customer?.name || "Cliente"
  const estimatedTime = checkoutState.pickupDetails?.estimatedTime

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold">Tudo pronto!</h3>
        <p className="text-muted-foreground text-sm">
          Confira os detalhes para retirada
        </p>
      </div>

      <div className="bg-muted/30 space-y-4 rounded-lg p-4">
        <div className="text-center">
          {/* Nome vindo direto do estado global */}
          <p className="text-primary text-2xl font-bold capitalize">
            {customerName}
          </p>
          <p className="text-muted-foreground text-sm">Nome para retirada</p>
        </div>

        <div className="flex items-center justify-between border-y py-3">
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">Tempo estimado:</span>
          </div>
          <span className="text-primary font-semibold">
            {getTimeText(estimatedTime)}
          </span>
        </div>
      </div>

      {/* Instruções finais (O seu layout já estava top!) */}
      <div className="text-muted-foreground space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <div className="bg-primary text-primary-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
            1
          </div>
          <p>
            Prepare-se para sair em{" "}
            <span className="text-foreground font-medium">
              {getTimeText(estimatedTime)}
            </span>
          </p>
        </div>

        <div className="flex items-start gap-2">
          <div className="bg-primary text-primary-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
            2
          </div>
          <p>
            Informe o nome{" "}
            <span className="text-foreground font-medium capitalize">
              {customerName}
            </span>{" "}
            no balcão
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle2Icon className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">
            Confirme os dados e finalize o pedido abaixo.
          </span>
        </div>
      </div>
    </div>
  )
}

export default ConfirmStep
