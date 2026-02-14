import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, DollarSign, QrCode } from "lucide-react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export type PaymentFormData = {
  paymentMethod: string;
  needsChange: boolean;
  changeAmount: string;
};

type PaymentStepProps = {
  formData: PaymentFormData;
  onUpdate: <K extends keyof PaymentFormData>(
    field: K,
    value: PaymentFormData[K],
  ) => void;
};

const PaymentStep = ({ formData, onUpdate }: PaymentStepProps) => {
  const { paymentMethod, needsChange, changeAmount } = formData;
  return (
    <div className="pb-10">
      <h3 className="text-lg font-semibold">Forma de pagamento</h3>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => onUpdate("paymentMethod", value)}
      >
        <div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-2 hover:bg-accent/50">
          <RadioGroupItem value="pix" id="pix" />
          <QrCode className="h-5 w-5 text-green-600" />
          <Label htmlFor="pix" className="flex-1 cursor-pointer">
            <div className="font-medium">PIX</div>
            <div className="text-sm text-muted-foreground">
              Pagamento instantâneo
            </div>
          </Label>
        </div>

        <div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-2 hover:bg-accent/50">
          <RadioGroupItem value="card" id="card" />
          <CreditCard className="h-5 w-5 text-blue-600" />
          <Label htmlFor="card" className="flex-1 cursor-pointer">
            <div className="font-medium">Cartão</div>
            <div className="text-sm text-muted-foreground">
              Crédito ou débito
            </div>
          </Label>
        </div>

        <div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-2 hover:bg-accent/50">
          <RadioGroupItem value="cash" id="cash" />
          <DollarSign className="h-5 w-5 text-amber-600" />
          <Label htmlFor="cash" className="flex-1 cursor-pointer">
            <div className="font-medium">Dinheiro</div>
            <div className="text-sm text-muted-foreground">
              Pagamento na entrega
            </div>
          </Label>
        </div>
      </RadioGroup>

      {paymentMethod === "cash" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 pt-4"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              id="needsChange"
              checked={needsChange}
              onCheckedChange={(checked) =>
                onUpdate("needsChange", checked === true)
              }
            />
            <Label htmlFor="needsChange" className="cursor-pointer">
              Precisa de troco?
            </Label>
          </div>

          {needsChange && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2 p-2"
            >
              <Label htmlFor="changeAmount">Valor para troco</Label>
              <Input
                id="changeAmount"
                type="number"
                placeholder="Ex: 50.00"
                className="scroll-m-20"
                value={changeAmount}
                onChange={(e) => onUpdate("changeAmount", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Informe o valor que você vai pagar para calcularmos o troco
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PaymentStep;
