import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { OnboardingFormValues } from "@/schemas/login-schema";

export default function StepPersonal() {
  const { control } = useFormContext<OnboardingFormValues>();

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Nome completo</FieldLabel>
            <Input {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Telefone</FieldLabel>
            <Input
              {...field}
              value={field.value}
              onChange={(e) =>
                field.onChange(formatPhoneNumber(e.target.value))
              }
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
