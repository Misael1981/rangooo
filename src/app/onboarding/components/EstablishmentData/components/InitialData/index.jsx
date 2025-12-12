import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

const CategoryValues = [
  "RESTAURANT",
  "PIZZARIA",
  "HAMBURGUERIA",
  "SORVETERIA",
  "ACAI",
  "SAUDAVEL",
  "DOCES",
];
const CategoryLabels = {
  RESTAURANT: "Restaurante",
  PIZZARIA: "Pizzaria",
  HAMBURGUERIA: "Hamburgueria",
  SORVETERIA: "Sorveteria",
  ACAI: "Açaí",
  SAUDAVEL: "Saudável",
  DOCES: "Doces e Bolos",
};

const InitialData = () => {
  const form = useFormContext();

  const addContact = () => {
    const current = form.getValues("store.contacts") || [];
    form.setValue("store.contacts", [...current, ""]);
  };

  const removeContact = (index) => {
    const current = form.getValues("store.contacts") || [];
    form.setValue(
      "store.contacts",
      current.filter((_, i) => i !== index),
    );
  };

  const updateContact = (index, value) => {
    const current = form.getValues("store.contacts") || [];
    const newContacts = [...current];
    newContacts[index] = value;
    form.setValue("store.contacts", newContacts);
  };

  const contacts = form.watch("store.contacts") || [""];

  return (
    <section className="space-y-4 rounded-md border border-gray-200 p-4 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Dados Iniciais</h2>

      {/* Nome */}
      <FormField
        control={form.control}
        name="store.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Estabelecimento *</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Slug */}
      <FormField
        control={form.control}
        name="store.slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL Única (Link do Restaurante) *</FormLabel>
            <FormControl>
              <Input
                placeholder="Ex: meu-restaurante-incrivel"
                {...field}
                onChange={(e) => {
                  // Auto-converte para lowercase e remove espaços
                  const value = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "");
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
            <p className="mt-1 text-xs text-gray-500">
              ex: https://seusite.com/{field.value || "meu-link"}
            </p>
          </FormItem>
        )}
      />

      {/* Categoria e Contatos */}
      <div className="w-full gap-4 lg:flex">
        {/* Categoria */}
        <div className="flex-1">
          <FormField
            control={form.control}
            name="store.category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {CategoryValues.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {CategoryLabels[cat] || cat}{" "}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Contatos dinâmicos */}
        <div className="flex-1">
          <FormField
            control={form.control}
            name="store.contacts"
            render={() => (
              <FormItem>
                <FormLabel>Contato</FormLabel>
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        value={contact}
                        onChange={(e) => updateContact(index, e.target.value)}
                        placeholder={`Contato ${index + 1}`}
                      />
                    </FormControl>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeContact(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addContact}>
                  <Plus className="h-4 w-4" /> Adicionar Contato
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      {/* Endereço */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Endereço</h3>
        <div className="flex w-full items-center gap-2">
          <div className="w-3/4">
            <FormField
              control={form.control}
              name="store.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logradouro</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome da rua/av..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            className="w-1/4"
            control={form.control}
            name="store.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o número..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="store.complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o complemento..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              className="w-full"
              control={form.control}
              name="store.neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o bairro..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="w-full">
            <FormField
              className="w-full"
              control={form.control}
              name="store.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a cidade..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              className="w-full"
              control={form.control}
              name="store.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o estado..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="store.zipCode" // NOVO CAMPO
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="00000-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InitialData;
