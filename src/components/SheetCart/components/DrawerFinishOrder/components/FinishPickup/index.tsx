import { CheckoutState } from "@/dtos/finish-order.dto"
import { CheckCircle2, User } from "lucide-react"
import { JSX, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import InfoStep from "./components/InfoStep"
import ConfirmStep from "./components/ConfirmStep"

type FinishPickupProps = {
  checkoutState: CheckoutState
  onUpdateState: (
    key: keyof CheckoutState,
    value: CheckoutState[keyof CheckoutState],
  ) => void
  onSubmit: (checkoutState: CheckoutState) => void
  onCancel: () => void
  isSubmitting: boolean
}

const steps = [
  { id: "info", label: "Informações", icon: User },
  { id: "confirm", label: "Confirmar", icon: CheckCircle2 },
]

const FinishPickup = ({
  onSubmit,
  onCancel,
  checkoutState,
  onUpdateState,
  isSubmitting,
}: FinishPickupProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  const isFinalStep = currentStep === steps.length - 1

  const stepComponents: Record<number, JSX.Element> = {
    0: <InfoStep checkoutState={checkoutState} onUpdateState={onUpdateState} />,
    1: <ConfirmStep checkoutState={checkoutState} />,
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <Card className="flex max-h-[90vh] flex-col gap-0 pb-0">
      <CardHeader className="flex-none">
        <div className="flex justify-center">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex max-w-32 flex-1 flex-col items-center"
            >
              <div className="flex w-fit items-center">
                <div
                  className={`flex flex-col items-center ${index < steps.length - 1 ? "w-full" : ""}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      index <= currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground"
                    } `}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-center text-sm">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mt-5 -mr-2 -ml-2 h-0.5 flex-1 ${index < currentStep ? "bg-primary" : "bg-muted-foreground/30"} `}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-0 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {stepComponents[currentStep]}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="bg-background sticky bottom-0 flex-none border-t pb-4">
        <div className="flex w-full justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onCancel : prevStep}
          >
            {currentStep === 0 ? "Cancelar" : "Voltar"}
          </Button>

          {isFinalStep ? (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onSubmit(checkoutState)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando pedido..." : "Finalizar Pedido"}
            </Button>
          ) : (
            <Button onClick={nextStep}>Continuar</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default FinishPickup
