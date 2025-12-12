import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const OwnerData = () => {
  // Agora pega o form do contexto
  const form = useFormContext();

  return (
    <section className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Dados do Dono</h2>
        <p className="text-sm text-gray-500">
          Informações sobre o dono ou responsável pelo estabelecimento
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="owner.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome completo..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone/WhatsApp *</FormLabel>
              <FormControl>
                <Input
                  placeholder="(11) 99999-9999"
                  {...field}
                  onChange={(e) => {
                    // Máscara de telefone
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .replace(/^(\d{2})(\d)/g, "($1) $2")
                      .replace(/(\d)(\d{4})$/, "$1-$2");
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* REMOVI o botão Salvar - Agora salva automaticamente */}
      <div className="rounded bg-blue-50 p-3 text-sm text-blue-700">
        💡 Os dados são salvos automaticamente. Você pode sair e voltar depois.
      </div>
    </section>
  );
};

export default OwnerData;
