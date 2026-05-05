export default function StepIndicator({
  step,
  total,
}: {
  step: number
  total: number
}) {
  return (
    <p className="text-muted-foreground text-sm">
      Etapa {step + 1} de {total}
    </p>
  )
}
