"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const RestaurantCategory = [
  "RESTAURANT",
  "PIZZARIA",
  "HAMBURGUERIA",
  "SORVETERIA",
  "ACAI",
  "SAUDAVEL",
  "DOCES",
];

const generalInfoSchema = z.object({
  establishmentName: z.string().min(2, "Nome obrigatório."),
  contacts: z.array(
    z.object({
      type: z.string(),
      number: z.string(),
      isPrimary: z.boolean(),
    }),
  ),
  // Endereço
  street: z.string().min(2, "Rua obrigatória."),
  number: z.string().min(1, "Número obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro obrigatório."),
  city: z.string().min(2, "Cidade obrigatória."),
  state: z.string().min(2, "Estado obrigatório."),
  description: z.string().min(10, "Descrição obrigatória."),
  category: z.enum(RestaurantCategory, {
    required_error: "Selecione uma categoria",
  }),
  slug: z.string().min(2, "Campo obrigatório."),
});

const GeneralInfoSection = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(generalInfoSchema),
    mode: "onChange",
    defaultValues: {
      establishmentName: data?.establishmentName ?? "",
      contacts: (data.contacts ?? []).map((c) => ({
        type: c.type,
        number: c.number,
        isPrimary: !!c.isPrimary,
      })),
      // Endereço
      street: data?.street ?? "",
      number: data?.number ?? "",
      complement: data?.complement ?? "",
      neighborhood: data?.neighborhood ?? "",
      city: data?.city ?? "",
      state: data?.state ?? "",
      description: data?.description ?? "",
      category: data?.category ?? "",
      slug: data?.slug ?? "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        establishmentName: data.name ?? "",
        contacts: (data.contacts ?? []).map((c) => ({
          type: c.type,
          number: c.number,
          isPrimary: !!c.isPrimary,
        })),
        // Endereço
        street: data?.street ?? "",
        number: data?.number ?? "",
        complement: data?.complement ?? "",
        neighborhood: data?.neighborhood ?? "",
        city: data?.city ?? "",
        state: data?.state ?? "",
        description: data?.description ?? "",
        category: data?.category ?? "",
        slug: data?.slug ?? "",
      });
    }
  }, [data, form]);

  const { control, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });
  const contacts = watch("contacts") || [];

  const setPrimary = (index, checked) => {
    if (!checked) {
      setValue(`contacts.${index}.isPrimary`, false);
      return;
    }
    contacts.forEach((_, i) => {
      setValue(`contacts.${i}.isPrimary`, i === index);
    });
  };

  const onSubmit = async (values) => {
    try {
      const res = await fetch("/api/establishment/general-info", {
        method: "PATCH",
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      toast.success("Informações atualizadas com sucesso!");
    } catch {
      toast.error("Erro ao atualizar informações.");
    }
  };

  return (
    <section className="my-4 rounded-md bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Informações Gerais</h2>
      <p className="mb-4 text-gray-600">
        Atualize os dados do estabelecimento. Essas informações aparecem para
        seus clientes e são usadas no sistema.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome do Estabelecimento */}
          <FormField
            control={form.control}
            name="establishmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Estabelecimento</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categoria */}

          <div className="w-80 max-w-[95%]">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RESTAURANT">Restaurante</SelectItem>
                      <SelectItem value="PIZZARIA">Pizzaria</SelectItem>
                      <SelectItem value="HAMBURGUERIA">Hamburgueria</SelectItem>
                      <SelectItem value="SORVETERIA">Sorveteria</SelectItem>
                      <SelectItem value="ACAI">Açaí</SelectItem>
                      <SelectItem value="SAUDAVEL">Saudável</SelectItem>
                      <SelectItem value="DOCES">Doces</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Slug */}

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contatos */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contatos</h3>

            <div className="space-y-3">
              {fields.map((f, index) => (
                <div
                  key={f.id}
                  className="flex items-end gap-3 rounded-md border p-3"
                >
                  <FormField
                    control={form.control}
                    name={`contacts.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="w-40">
                        <FormLabel>Tipo</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PHONE">Telefone</SelectItem>
                            <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contacts.${index}.number`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Número</FormLabel>
                        <Input {...field} placeholder="+55 35 99999-9999" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contacts.${index}.isPrimary`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormLabel>Principal</FormLabel>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={(val) => setPrimary(index, !!val)}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  type: "PHONE",
                  number: "",
                  isPrimary: contacts.length === 0,
                })
              }
            >
              Adicionar Contato
            </Button>
          </div>

          {/* Endereço */}
          <div className="w-full space-y-3">
            <h3 className="text-lg font-semibold">Endereço</h3>

            <div className="flex w-full items-end gap-3">
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full items-end gap-3">
              <div className="w-2/4">
                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento (Opicional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-2/4">
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full items-end gap-3">
              <div className="w-3/4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="w-full space-y-3">
            <h3 className="text-lg font-semibold">Descrição</h3>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Salvar alterações</Button>
        </form>
      </Form>
    </section>
  );
};

export default GeneralInfoSection;
