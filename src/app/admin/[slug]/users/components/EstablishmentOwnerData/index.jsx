"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const roleEstablishment = [
  "CLIENT",
  "RESTAURANT_OWNER",
  "DELIVERY_PERSON",
  "ADMIN",
];

const roleTranslations = {
  CLIENT: "Cliente",
  RESTAURANT_OWNER: "Dono do Estabelecimento",
  DELIVERY_PERSON: "Entregador",
  ADMIN: "Administrador",
};

const establishmentOwnerSchema = z.object({
  id: z.string().uuid("ID de usuário inválido."),
  name: z.string().min(2, "Nome obrigatório."),
  email: z.string().email("Email inválido."),
  phone: z.string().min(10, "Número de telefone inválido."),
  role: z.enum(roleEstablishment),
});

const EstablishmentOwnerData = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(establishmentOwnerSchema),
    mode: "onChange",
    defaultValues: {
      id: data?.id || "",
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      role: data?.role || "RESTAURANT_OWNER",
    },
  });

  useEffect(() => {
    form.reset({
      id: data?.id || "",
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      role: data?.role || "RESTAURANT_OWNER",
    });
  }, [data, form]);

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar o usuário.");
      }

      const updatedUser = await response.json();
      console.log("Usuário atualizado com sucesso:", updatedUser);
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      toast.error(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Dados do Dono do Estabelecimento
      </h2>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Perfil</label>
              <div className="rounded-md border bg-gray-50 px-3 py-2 text-gray-700">
                {roleTranslations[data?.role || "RESTAURANT_OWNER"].replace(
                  "_",
                  " ",
                )}
              </div>
              <p className="text-xs text-gray-500">
                Para alterar o perfil, entre em contato com o suporte.
              </p>
            </div>
            <Button type="submit">Salvar alterações</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EstablishmentOwnerData;
