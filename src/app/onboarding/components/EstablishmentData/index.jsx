import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EstablishmentData = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="border-b-2 border-gray-200 pb-2">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          Dados do Estabelecimento
        </h2>
        <p className="text-sm text-gray-500">
          Preencha os dados do seu estabelecimento, preencha com atenção, esses
          são os dados que serão usados para exibição no aplicativo.
        </p>
      </div>
      {/* Nome do Estabelecimento */}
      <FormField
        control={form.control}
        name="establishmentName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Estabelecimento</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Slogan do Estabelecimento */}
      <FormField
        control={form.control}
        name="slogan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slogan do Estabelecimento</FormLabel>
            <FormControl>
              <Textarea placeholder="Digite o slogan..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Email Comercial */}
      <FormField
        control={form.control}
        name="slogan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slogan do Estabelecimento</FormLabel>
            <FormControl>
              <Textarea placeholder="Digite o slogan..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Categoria do Estabelecimento */}
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria do Estabelecimento</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[300px] max-w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    <SelectItem value="restaurant">Restaurante</SelectItem>
                    <SelectItem value="pizzaria">Pizzaria</SelectItem>
                    <SelectItem value="hamburgueria">Hamburgueria</SelectItem>
                    <SelectItem value="sorveteria">Sorveteria</SelectItem>
                    <SelectItem value="acai">Açai</SelectItem>
                    <SelectItem value="saudavel">Saudável</SelectItem>
                    <SelectItem value="doces">Doces</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EstablishmentData;
