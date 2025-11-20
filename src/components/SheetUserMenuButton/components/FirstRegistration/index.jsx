"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  lastName: z.string().trim().min(1, {
    message: "Sobrenome é obrigatório",
  }),
  ddd: z
    .string()
    .trim()
    .regex(/^\d{2}$/, { message: "DDD deve ter 2 dígitos" }),
  phoneNumber: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((val) => val.length === 8 || val.length === 9, {
      message: "Número deve ter 8 ou 9 dígitos",
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

const FirstRegistration = ({ open, onOpenChange }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      lastName: "",
      ddd: "",
      phoneNumber: "",
      address: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      phone: `${data.ddd}${String(data.phoneNumber).replace(/\D/g, "")}`,
      address: {
        street: data.address,
        number: data.number,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
    };
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    toast.success("Cadastro realizado com sucesso");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90vh] w-[95%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-red-500">
            Faça seu cadastro
          </DialogTitle>
          <DialogDescription>
            Complete seu cadastro com atenção, leva apenas alguns instantes.
            Você só precisa fazer isso no primeiro acesso, e esses dados
            garantem entregas precisas e uma experiência fluida na plataforma.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto p-1">
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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
              <div className="flex gap-2">
                <FormField
                  className=""
                  control={form.control}
                  name="ddd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DDD</FormLabel>
                      <FormControl>
                        <Input
                          className="w-1/2 border-gray-400"
                          placeholder="Ex: 11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <PatternFormat
                          className="w-full border-gray-400"
                          format="#####-####"
                          placeholder="Ex: 98765-4321"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                    <FormItem className="w-1/2">
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="w-1/2 border-gray-400"
                          placeholder=""
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

              <DialogFooter className="flex flex-col gap-2 py-4">
                <DialogClose asChild>
                  <Button variant="destructive">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FirstRegistration;
