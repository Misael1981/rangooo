import { CheckCircle2 } from "lucide-react";

const ConfirmStep = ({ data }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Confirme seu pedido</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            Local de consumo
          </h4>
          <p className="text-sm">
            Mesa: <strong>{data.tableNumber}</strong>
            {data.customerName && (
              <>
                {" "}
                • Cliente: <strong>{data.customerName}</strong>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">
            Pedido confirmado! Aguarde o atendimento.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStep;
