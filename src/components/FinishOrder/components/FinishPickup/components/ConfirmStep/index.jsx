import { CheckCircle2, CheckCircle2Icon, Clock } from "lucide-react";

const ConfirmStep = ({ data }) => {
  const getTimeText = (minutes) => {
    if (minutes === "60") return "1 hora";
    return `${minutes} minutos`;
  };
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold">Pedido Confirmado!</h3>
        <p className="text-sm text-muted-foreground">
          Seu pedido está sendo preparado
        </p>
      </div>

      <div className="space-y-4 rounded-lg bg-muted/30 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{data.customerName}</p>
          <p className="text-sm text-muted-foreground">Nome para retirada</p>
        </div>

        <div className="flex items-center justify-between border-y py-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Tempo estimado:</span>
          </div>
          <span className="font-semibold">
            {getTimeText(data.estimatedTime)}
          </span>
        </div>
      </div>

      {/* Instruções finais */}
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            1
          </div>
          <p>Aguarde a confirmação de que seu pedido está pronto</p>
        </div>

        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            2
          </div>
          <p>Dirija-se ao balcão de retirada e informe o nome</p>
        </div>

        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            3
          </div>
          <p>Apresente o comprovante se solicitado</p>
        </div>
      </div>

      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle2Icon className="h-5 w-5" />
          <span className="text-sm font-medium">
            Pedido confirmado! Aguarde a notificação.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStep;
