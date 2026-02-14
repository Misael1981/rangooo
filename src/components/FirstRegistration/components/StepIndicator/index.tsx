export default function StepIndicator({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  return (
    <p className="text-sm text-muted-foreground">
      Etapa {step + 1} de {total}
    </p>
  );
}
