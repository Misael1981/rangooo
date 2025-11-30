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
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import ImageUpload from "../ImageUpload";

const EstablishmentData = ({ form }) => {
  // Função para adicionar novo campo de contato
  const addContact = () => {
    const currentContacts = form.getValues("contacts") || [];
    form.setValue("contacts", [...currentContacts, ""]);
  };

  // Função para remover campo de contato
  const removeContact = (index) => {
    const currentContacts = form.getValues("contacts") || [];
    const newContacts = currentContacts.filter((_, i) => i !== index);
    form.setValue("contacts", newContacts);
  };

  // Função para atualizar um contato específico
  const updateContact = (index, value) => {
    const currentContacts = form.getValues("contacts") || [];
    const newContacts = [...currentContacts];
    newContacts[index] = value;
    form.setValue("contacts", newContacts);
  };

  // Obter contatos atuais ou inicializar com um array vazio
  const contacts = form.watch("contacts") || [""];

  // Obter redes sociais ou inicializar com um array vazio
  const socialMedia = form.watch("socialMedia") || [];

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
      {/* Contatos - Campo Dinâmico */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contato</FormLabel>
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder={`Contato ${index + 1} (ex: 11999999999)`}
                      value={contact}
                      onChange={(e) => updateContact(index, e.target.value)}
                      className="flex-1"
                    />
                  </FormControl>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeContact(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addContact}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Contato
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo hidden para validação do React Hook Form */}
        <FormField
          control={form.control}
          name="contacts"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Redes Sociais */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="socialMedia.facebook"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o link do Facebook..."
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="socialMedia.instagram"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o link do Instagram..."
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Email do Estabelecimento */}
      <FormField
        control={form.control}
        name="emailEstablishment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email do Estabelecimento</FormLabel>
            <FormControl>
              <Input placeholder="Digite o email..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Endereço */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Endereço</h3>
        <div className="flex w-full items-center gap-2">
          <div className="w-3/4">
            <FormField
              control={form.control}
              name="street"
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
            name="number"
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
              name="complement"
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
              name="neighborhood"
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
              name="city"
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
              name="state"
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
        </div>
      </div>
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
      {/* Logo do Estabelecimento */}
      <div className="flex w-full items-center gap-4">
        <div className="w-full">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo do Estabelecimento</FormLabel>
                <FormControl>
                  <ImageUpload
                    field={field}
                    onChange={(file) => form.setValue("logo", file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem do Estabelecimento</FormLabel>
                <FormControl>
                  <ImageUpload
                    field={field}
                    onChange={(file) => form.setValue("imagem", file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default EstablishmentData;
