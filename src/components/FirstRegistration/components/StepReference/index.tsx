import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { OnboardingFormValues } from "@/schemas/login-schema";
import { Controller, useFormContext } from "react-hook-form";

const regions = [
  { label: "Zona Urbana", value: "URBAN" },
  { label: "Zona Rural", value: "RURAL" },
  { label: "Distrito", value: "DISTRICT" },
] as const;

const StepReference = () => {
  const { control } = useFormContext<OnboardingFormValues>();

  return (
    <>
      <Controller
        name="areaType"
        control={control}
        render={({ field, fieldState }) => (
          <Field orientation="responsive" data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="form-rhf-select-areaType">
                Região para entrega
              </FieldLabel>
              <FieldDescription>
                Esse campo é importante para que possamos direcionar melhor as
                entregas e otimizar as rotas dos entregadores.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
            <Select
              value={field.value}
              aria-describedby="form-rhf-select-areaType-description"
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="form-rhf-select-areaType"
                aria-invalid={fieldState.invalid}
                className="min-w-30"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
      <Controller
        name="reference"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="reference">Alguma observação?</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id="reference"
                placeholder="Conte-nos sobre se há alguma referência ou observação onde você costuma receber suas entregas."
                rows={6}
                maxLength={100}
                className={cn(
                  "tabular-nums min-h-24 resize-none",
                  field.value?.length &&
                    field.value.length > 90 &&
                    "text-destructive",
                )}
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {field.value?.length || 0}/100 caracteres
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Opcional - Mas nos ajuda a entender melhor o seu perfil.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};

export default StepReference;
