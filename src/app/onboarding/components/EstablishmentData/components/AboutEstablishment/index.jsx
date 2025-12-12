import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "../../../ImageUpload";
import { Textarea } from "@/components/ui/textarea";
import { uploadImageToCloudinary } from "@/lib/upload";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import { useImageUpload } from "@/app/hooks/useImageUpload";

const SOCIAL_PLATFORMS = [
  { platform: "facebook", label: "Facebook" },
  { platform: "instagram", label: "Instagram" },
  { platform: "tiktok", label: "TikTok" },
  { platform: "x", label: "X" },
  { platform: "youtube", label: "YouTube" },
];

const AboutEstablishment = () => {
  const form = useFormContext();
  const { uploadToCloudinary, isUploading: isUploadingAvatar } =
    useImageUpload();
  const { uploadToCloudinary: uploadCover, isUploading: isUploadingCover } =
    useImageUpload();

  const handleAvatarUpload = async (file) => {
    try {
      const url = await uploadToCloudinary(file);
      form.setValue("store.avatarImageUrl", url);
    } catch (error) {
      form.setError("store.avatarImageUrl", {
        type: "manual",
        message: "Falha no upload da logo",
      });
    }
  };

  const handleCoverUpload = async (file) => {
    try {
      const url = await uploadCover(file);
      form.setValue("store.coverImageUrl", url);
    } catch (error) {
      form.setError("store.coverImageUrl", {
        type: "manual",
        message: "Falha no upload da imagem de capa",
      });
    }
  };

  const handleRemoveAvatar = () => {
    form.setValue("store.avatarImageUrl", "");
  };

  const handleRemoveCover = () => {
    form.setValue("store.coverImageUrl", "");
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "store.socialMedia",
  });

  const uploadImage = async (file, fieldName) => {
    try {
      const url = await uploadImageToCloudinary(file);
      form.setValue(fieldName, url ?? "");
    } catch (error) {
      console.error("Erro no upload:", error);
      form.setError(fieldName, {
        type: "manual",
        message: "Falha no upload da imagem",
      });
    }
  };

  return (
    <section className="space-y-4 rounded-md border border-gray-200 p-4 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">
        Sobre o Estabelecimento
      </h2>

      {/* Redes Sociais */}
      <div className="space-y-4">
        <Label className="mb-2 block font-semibold text-gray-800">
          Links de Mídias Sociais (opcional)
        </Label>

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="w-32">
              <FormField
                control={form.control}
                name={`store.socialMedia.${index}.platform`}
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOCIAL_PLATFORMS.map((platform) => (
                          <SelectItem
                            key={platform.platform}
                            value={platform.platform}
                          >
                            {platform.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name={`store.socialMedia.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ platform: "instagram", url: "" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Rede Social
        </Button>
      </div>

      {/* Metodos de Consumo e Pagamento */}
      <div className="flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
        {/* Métodos de Consumo */}
        <FormField
          control={form.control}
          name="store.consumptionMethods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Métodos de Consumo</FormLabel>
              <div className="mt-3 space-y-2">
                {[
                  { value: "DINE_IN", label: "Comer no local" },
                  { value: "PICKUP", label: "Pegar no local" },
                  { value: "DELIVERY", label: "Entrega" },
                ].map((opt) => {
                  const checked =
                    Array.isArray(field.value) &&
                    field.value.includes(opt.value);
                  return (
                    <div key={opt.value} className="flex items-center gap-3">
                      <Checkbox
                        id={opt.value}
                        checked={checked}
                        onCheckedChange={(isChecked) => {
                          const prev = Array.isArray(field.value)
                            ? field.value
                            : [];
                          field.onChange(
                            isChecked
                              ? [...prev, opt.value]
                              : prev.filter((v) => v !== opt.value),
                          );
                        }}
                      />
                      <Label htmlFor={opt.value}>{opt.label}</Label>
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Métodos de Pagamento */}
        <FormField
          control={form.control}
          name="store.paymentMethods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Métodos de Pagamento</FormLabel>
              <div className="mt-3 space-y-2">
                {[
                  { value: "CREDIT_CARD", label: "Cartão de Crédito" },
                  { value: "DEBIT_CARD", label: "Cartão de Débito" },
                  { value: "PIX", label: "PIX" },
                  { value: "BANK_TRANSFER", label: "Transferência Bancária" },
                  { value: "CASH", label: "Dinheiro" },
                ].map((opt) => {
                  const checked =
                    Array.isArray(field.value) &&
                    field.value.includes(opt.value);
                  return (
                    <div key={opt.value} className="flex items-center gap-3">
                      <Checkbox
                        id={opt.value}
                        checked={checked}
                        onCheckedChange={(isChecked) => {
                          const prev = Array.isArray(field.value)
                            ? field.value
                            : [];
                          field.onChange(
                            isChecked
                              ? [...prev, opt.value]
                              : prev.filter((v) => v !== opt.value),
                          );
                        }}
                      />
                      <Label htmlFor={opt.value}>{opt.label}</Label>
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Imagens do Estabelecimento  */}
      <div className="mb-4 flex w-full flex-wrap items-center gap-4">
        <div className="min-w-[200px] flex-1">
          <FormField
            control={form.control}
            name="store.avatarImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo do Estabelecimento</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={handleAvatarUpload}
                    onRemove={handleRemoveAvatar}
                    isLoading={isUploadingAvatar}
                    maxSizeMB={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="min-w-[200px] flex-1">
          <FormField
            control={form.control}
            name="store.coverImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem de Capa do Estabelecimento</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={handleCoverUpload}
                    onRemove={handleRemoveCover}
                    isLoading={isUploadingCover}
                    maxSizeMB={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Slogan do Estabelecimento */}
      <FormField
        control={form.control}
        name="store.description" // CORRIGIDO: o nome do campo
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slogan/Descrição do Estabelecimento</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ex: O melhor hambúrguer da cidade! (Mín. 10 caracteres)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end">
        <Button className="bg-green-600 text-white hover:bg-green-700">
          Salvar
        </Button>
      </div>
    </section>
  );
};

export default AboutEstablishment;
