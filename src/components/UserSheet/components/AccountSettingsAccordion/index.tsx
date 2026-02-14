"use client";

import { updateUserField } from "@/app/action/update-user-field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserForLoginDTO } from "@/dtos/user-for-login.dto";
import { mapUserToForm } from "@/helpers/map-user-to-form";
import { finalSchema, OnboardingFormValues } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotebookText } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type AccountSettingsAccordionProps = {
  user: UserForLoginDTO | null;
};

const regions = [
  { label: "Zona Urbana", value: "URBAN" },
  { label: "Zona Rural", value: "RURAL" },
  { label: "Distrito", value: "DISTRICT" },
] as const;

const AccountSettingsAccordion = ({ user }: AccountSettingsAccordionProps) => {
  const form = useForm({
    resolver: zodResolver(finalSchema),
    defaultValues: mapUserToForm(user),
  });

  const { reset } = form;

  useEffect(() => {
    if (user) {
      reset(mapUserToForm(user));
    }
  }, [user, reset]);

  const { register } = form;

  const autosaveField = async (fieldName: keyof OnboardingFormValues) => {
    const fieldState = form.getFieldState(fieldName);

    if (!fieldState.isDirty) return;

    const isValid = await form.trigger(fieldName);
    if (!isValid) return;

    const value = form.getValues(fieldName);

    try {
      const savePromise = updateUserField(fieldName, value);

      toast.promise(savePromise, {
        loading: "Salvando...",
        success: "Alteração salva!",
        error: "Erro ao sincronizar dados.",
      });
      const result = await savePromise;
      if (!result.success) {
        toast.error("Erro ao salvar campo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nameField = register("name");
  const phoneField = register("phone");
  const streetField = register("street");
  const numberField = register("number");
  const neighborhoodField = register("neighborhood");
  const cityField = register("city");
  const referenceField = register("reference");

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <NotebookText className="text-orange-500" />
            Meus Dados
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                {...nameField}
                onBlur={async (e) => {
                  nameField.onBlur(e);
                  await autosaveField("name");
                }}
              />
            </Field>

            <Field orientation="horizontal">
              <FieldLabel htmlFor="phone">Telefone</FieldLabel>
              <Input
                {...phoneField}
                onBlur={async (e) => {
                  phoneField.onBlur(e);
                  await autosaveField("phone");
                }}
              />
            </Field>

            <Field orientation="horizontal">
              <FieldLabel htmlFor="street">Rua</FieldLabel>
              <Input
                {...streetField}
                onBlur={async (e) => {
                  streetField.onBlur(e);
                  await autosaveField("street");
                }}
              />
            </Field>

            <Field orientation="horizontal">
              <FieldLabel htmlFor="number">Número</FieldLabel>
              <Input
                {...numberField}
                onBlur={async (e) => {
                  numberField.onBlur(e);
                  await autosaveField("number");
                }}
              />
            </Field>

            <Field orientation="horizontal">
              <FieldLabel htmlFor="neighborhood">Bairro</FieldLabel>
              <Input
                {...neighborhoodField}
                onBlur={async (e) => {
                  neighborhoodField.onBlur(e);
                  await autosaveField("neighborhood");
                }}
              />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="city">Cidade</FieldLabel>
              <Input
                {...cityField}
                onBlur={async (e) => {
                  cityField.onBlur(e);
                  await autosaveField("city");
                }}
              />
            </Field>
            <Controller
              name="state"
              control={form.control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="state">Estado</FieldLabel>
                  <Input
                    id="state"
                    type="text"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/[^a-zA-Z]/g, "")
                        .toUpperCase()
                        .slice(0, 2);

                      field.onChange(value);
                    }}
                    onBlur={async () => {
                      field.onBlur();
                      await autosaveField("state");
                    }}
                  />
                </Field>
              )}
            />

            <Controller
              name="areaType"
              control={form.control}
              render={({ field }) => (
                <Field orientation="responsive">
                  <FieldContent>
                    <FieldLabel
                      htmlFor="form-rhf-select-areaType"
                      className="text-center"
                    >
                      Região para entrega
                    </FieldLabel>
                  </FieldContent>

                  <Select
                    value={field.value}
                    onValueChange={async (value) => {
                      field.onChange(value);
                      await autosaveField("areaType");
                    }}
                  >
                    <SelectTrigger
                      id="form-rhf-select-areaType"
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

            <Field orientation="vertical">
              <FieldLabel htmlFor="reference">Referências...</FieldLabel>
              <Textarea
                {...referenceField}
                onBlur={async (e) => {
                  referenceField.onBlur(e);
                  await autosaveField("reference");
                }}
              />
            </Field>
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccountSettingsAccordion;
