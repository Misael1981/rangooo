import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { OnboardingFormValues } from "@/schemas/login-schema";
import { Controller, useFormContext } from "react-hook-form";

const StepAddress = () => {
  const { control } = useFormContext<OnboardingFormValues>();

  return (
    <>
      <Controller
        name="street"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="street">Nome da Rua</FieldLabel>
            <Input
              {...field}
              id="street"
              aria-invalid={fieldState.invalid}
              placeholder="Digite o nome da rua..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Número e complemento */}
      <div className="flex gap-2">
        <div className="w-1/4">
          <Controller
            name="number"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="number">Número</FieldLabel>
                <Input
                  {...field}
                  id="number"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="flex-1">
          {/* Bairro */}
          <Controller
            name="neighborhood"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="neighborhood">Bairro</FieldLabel>
                <Input
                  {...field}
                  id="neighborhood"
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite o bairro..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>
      {/* Complemento */}
      <Controller
        name="complement"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="complement">Complemento</FieldLabel>
            <Input
              {...field}
              id="complement"
              aria-invalid={fieldState.invalid}
              placeholder="Digite o complemento..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Cidade e Estado */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="city">Cidade</FieldLabel>
                <Input
                  {...field}
                  id="city"
                  aria-invalid={fieldState.invalid}
                  autoComplete="address-level2"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="w-1/4">
          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="state">(UF)</FieldLabel>
                <Input
                  {...field}
                  id="state"
                  aria-invalid={fieldState.invalid}
                  placeholder="Ex: SP..."
                  autoComplete="address-level1"
                  maxLength={2}
                  className="uppercase"
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^a-zA-Z]/g, "")
                      .toUpperCase()
                      .slice(0, 2);

                    field.onChange(value);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default StepAddress;
