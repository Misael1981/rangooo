import { CheckoutState } from "@/dtos/finish-order.dto";
import { CheckCircle2, CheckCircle2Icon, Clock } from "lucide-react";

type ConfirmStepProps = {
  checkoutState: CheckoutState;
};

const ConfirmStep = ({ checkoutState }: ConfirmStepProps) => {
  const getTimeText = (minutes?: string) => {
    if (!minutes) return "Não informado";
    if (minutes === "60") return "1 hora";
    if (minutes === "120") return "2 horas";
    return `${minutes} minutos`;
  };

  const customerName = checkoutState.customer?.name || "Cliente";
  const estimatedTime = checkoutState.pickupDetails?.estimatedTime;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold">Tudo pronto!</h3>
        <p className="text-sm text-muted-foreground">
          Confira os detalhes para retirada
        </p>
      </div>

      <div className="space-y-4 rounded-lg bg-muted/30 p-4">
        <div className="text-center">
          {/* Nome vindo direto do estado global */}
          <p className="text-2xl font-bold text-primary capitalize">
            {customerName}
          </p>
          <p className="text-sm text-muted-foreground">Nome para retirada</p>
        </div>

        <div className="flex items-center justify-between border-y py-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Tempo estimado:</span>
          </div>
          <span className="font-semibold text-primary">
            {getTimeText(estimatedTime)}
          </span>
        </div>
      </div>

      {/* Instruções finais (O seu layout já estava top!) */}
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-bold">
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
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-bold">
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
  );
};

export default ConfirmStep;
