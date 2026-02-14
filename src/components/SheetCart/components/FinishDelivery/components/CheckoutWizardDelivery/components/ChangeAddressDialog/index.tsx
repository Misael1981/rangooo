import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { addressSchema } from "@/dtos/change-address-for.dto";
import { AreaType } from "@/generated/prisma/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof addressSchema>;

type ChangeAddressDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userAddress?: {
    street?: string;
    number?: string;
    complement?: string | null;
    neighborhood?: string;
    city?: string;
    reference?: string | null;
    areaType?: AreaType;
  };
  onSubmitAddress?: (data: FormData) => void;
};

const regions = [
  { label: "Zona Urbana", value: "URBAN" },
  { label: "Zona Rural", value: "RURAL" },
  { label: "Distrito", value: "DISTRICT" },
] as const;

const ChangeAddressDialog = ({
  isOpen,
  onOpenChange,
  userAddress,
  onSubmitAddress,
}: ChangeAddressDialogProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: userAddress?.street ?? "",
      number: userAddress?.number ?? "",
      neighborhood: userAddress?.neighborhood ?? "",
      city: userAddress?.city ?? "",
      areaType: userAddress?.areaType ?? AreaType.URBAN,
      complement: userAddress?.complement ?? "",
      reference: userAddress?.reference ?? "",
    },
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmitAddress?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95%] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Mudar Endereço</DialogTitle>
          <DialogDescription>
            Este formulário atualiza o endereço para esta entrega, não o seu
            endereço registrado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup className="gap-3">
            {/* Região */}
            <Controller
              name="areaType"
              control={control}
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

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="form-rhf-select-areaType"
                      className="min-w-30"
                    >
                      <SelectValue placeholder="Selecione a região" />
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

            {/* Rua */}
            <Field orientation="horizontal">
              <FieldLabel htmlFor="street">Rua</FieldLabel>
              <Input id="street" {...register("street")} />
              {errors.street && (
                <span className="text-red-500 text-xs">
                  {errors.street.message}
                </span>
              )}
            </Field>

            {/* Número */}
            <Field orientation="horizontal">
              <FieldLabel htmlFor="number">Número</FieldLabel>
              <Input id="number" {...register("number")} />
              {errors.number && (
                <span className="text-red-500 text-xs">
                  {errors.number.message}
                </span>
              )}
            </Field>

            {/* Complemento */}
            <Field orientation="horizontal">
              <FieldLabel htmlFor="complement">Complemento</FieldLabel>
              <Input id="complement" {...register("complement")} />
            </Field>

            {/* Bairro */}
            <Field orientation="horizontal">
              <FieldLabel htmlFor="neighborhood">Bairro</FieldLabel>
              <Input id="neighborhood" {...register("neighborhood")} />
              {errors.neighborhood && (
                <span className="text-red-500 text-xs">
                  {errors.neighborhood.message}
                </span>
              )}
            </Field>

            {/* Cidade */}
            <Field orientation="horizontal">
              <FieldLabel htmlFor="city">Cidade</FieldLabel>
              <Input id="city" {...register("city")} />
              {errors.city && (
                <span className="text-red-500 text-xs">
                  {errors.city.message}
                </span>
              )}
            </Field>

            {/* Referência */}
            <Field orientation="vertical">
              <FieldLabel htmlFor="reference">Referência</FieldLabel>
              <Textarea id="reference" {...register("reference")} />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>

            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAddressDialog;
