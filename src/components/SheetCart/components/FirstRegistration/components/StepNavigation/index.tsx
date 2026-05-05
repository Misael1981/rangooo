import { Button } from "@/components/ui/button"

export default function StepNavigation({
  step,
  total,
  onNext,
  onPrev,
}: {
  step: number
  total: number
  onNext: () => void
  onPrev: () => void
}) {
  const isLast = step === total - 1

  return (
    <div className="mt-6 flex justify-between">
      {step > 0 && (
        <Button type="button" variant="outline" onClick={onPrev}>
          Voltar
        </Button>
      )}

      {!isLast && (
        <Button type="button" onClick={onNext}>
          Continuar
        </Button>
      )}

      {isLast && <Button type="submit">Finalizar cadastro</Button>}
    </div>
  )
}
