import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const OwnerData = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="border-b-2 border-gray-200 pb-2">
        <h2 className="text-2xl font-bold text-gray-900">Dados do Dono</h2>
        <p className="text-sm text-gray-500">
          Informações sobre o dono ou responsável pelo estabelecimento
        </p>
      </div>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Nome do dono ou responsável pelo estabelecimento
            </FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome..." {...field} />
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
            <FormLabel>Telefone ou WhatsApp</FormLabel>
            <FormControl>
              <Input placeholder="Digite o telefone..." {...field} />
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
              <Input placeholder="Digite o email..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default OwnerData;
