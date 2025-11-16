"use client";

import { z } from "zod";
import { validatePhone } from "@/helpers/validate-phone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  lastName: z.string().trim().min(1, {
    message: "Sobrenome é obrigatório",
  }),
  phone: z.string().refine((phone) => validatePhone(phone), {
    message: "Telefone inválido",
  }),
  address: z.string().trim().min(1, {
    message: "Endereço é obrigatório",
  }),
  number: z.string().trim().min(1, {
    message: "Número é obrigatório",
  }),
  neighborhood: z.string().trim().min(1, {
    message: "Bairro é obrigatório",
  }),
  city: z.string().trim().min(1, {
    message: "Cidade é obrigatória",
  }),
  state: z.string().trim().min(1, {
    message: "Estado é obrigatório",
  }),
});

const UserDataForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      address: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="overflow-auto p-1">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-400"
                      placeholder="Digite seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Sobrenome */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-400"
                      placeholder="Digite seu sobrenome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Telefone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-400"
                    placeholder="Digite seu telefone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Endereço */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-400"
                    placeholder="Digite seu endereço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            {/* Número */}
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="border-gray-400"
                      placeholder="Digite o número"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bairro */}
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-400"
                      placeholder="Digite seu bairro"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            {/* Cidade */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-400"
                      placeholder="Digite sua cidade"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <select
                      className="rounded-md border-gray-400 px-3 py-2"
                      {...field}
                    >
                      <option value="">Selecione...</option>
                      {["MG", "SP"].map((sigla) => (
                        <option key={sigla} value={sigla}>
                          {sigla}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserDataForm;
