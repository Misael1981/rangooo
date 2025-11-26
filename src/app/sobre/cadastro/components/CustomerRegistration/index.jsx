"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome completo é obrigatório (mínimo 2 caracteres).",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos.",
  }),
  restaurantName: z.string().min(2, {
    message: "Nome do estabelecimento é obrigatório.",
  }),
  city: z.string().min(2, {
    message: "Cidade é obrigatória.",
  }),
  state: z
    .string()
    .length(2, {
      message: "Estado deve ter 2 caracteres (ex: SP, RJ).",
    })
    .transform((s) => s.toUpperCase()),
  notes: z.string().optional(),
});

const CustomerRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      restaurantName: "",
      city: "",
      state: "",
      notes: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      // Simulando uma requisição API
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Cadastro enviado com sucesso! 🎉");
        form.reset();
      } else {
        throw new Error("Erro ao enviar cadastro");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao enviar cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      // Mensagem de sucesso
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="pt-6">
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              Cadastro Enviado!
            </h3>
            <p className="mb-6 text-gray-600">
              Recebemos suas informações. Nossa equipe entrará em contato em até
              24h para dar continuidade ao seu cadastro.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Fazer Novo Cadastro
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-2xl border border-orange-500">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Cadastro do Estabelecimento
        </CardTitle>
        <CardDescription>
          Preencha os dados abaixo para começar seus 7 dias grátis no Rangooo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nome Completo */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu nome completo"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormDescription>
                    Nome do responsável pelo estabelecimento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      type="email"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormDescription>
                    Usaremos para contato e acesso ao sistema
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone/WhatsApp *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(11) 99999-9999"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormDescription>
                    Número para contato da nossa equipe
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nome do Estabelecimento */}
            <FormField
              control={form.control}
              name="restaurantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Estabelecimento *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Hamburgueria do Zé, Pizzaria Bella, etc."
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormDescription>
                    Como seu estabelecimento será chamado no sistema
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cidade */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sua cidade"
                        {...field}
                        className="h-12"
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
                    <FormLabel>Estado (UF) *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SP"
                        maxLength={2}
                        {...field}
                        className="h-12 uppercase"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notas Adicionais */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alguma observação?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte um pouco sobre seu estabelecimento, tipo de comida, horários de funcionamento, ou qualquer informação que ache relevante..."
                      {...field}
                      className="min-h-[100px] resize-none"
                    />
                  </FormControl>
                  <FormDescription>
                    Opcional - Nos ajuda a entender melhor seu negócio
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botão de Submit */}
            <Button
              type="submit"
              className="h-12 w-full text-lg font-semibold"
              disabled={isSubmitting}
              onClick={() => {
                form.handleSubmit();
              }}  
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando Cadastro...
                </>
              ) : (
                "Começar 7 Dias Grátis"
              )}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Nossa equipe entrará em contato em breve
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomerRegistration;
