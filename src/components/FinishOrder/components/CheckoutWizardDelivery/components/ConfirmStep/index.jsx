import { CheckCircle2 } from "lucide-react";

const ConfirmStep = ({ data }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Confirme seu pedido</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            Endereço de entrega
          </h4>
          <p className="text-sm">
            {data.address.street}, {data.address.number}
            {data.address.complement && `, ${data.address.complement}`}
            <br />
            {data.address.neighborhood} - {data.address.city}/
            {data.address.state}
            <br />
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            Forma de pagamento
          </h4>
          <p className="text-sm capitalize">
            {data.paymentMethod === "pix" && "PIX"}
            {data.paymentMethod === "card" && "Cartão"}
            {data.paymentMethod === "cash" && "Dinheiro"}
            {data.paymentMethod === "cash" &&
              data.needsChange &&
              ` (Troco para R$ ${data.changeAmount})`}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">
            Tudo certo! Seu pedido está pronto para ser finalizado.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStep;
