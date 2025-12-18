"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area"; // Shadcn tem esse cara!
import ImageUpload from "@/app/onboarding/components/ImageUpload";
import { useImageUpload } from "@/app/hooks/useImageUpload";
import { createProduct, updateProduct } from "@/app/actions/admin/products";

const productSchema = z.object({
  name: z.string().trim().min(2, "Nome é obrigatório"),
  price: z.coerce.number().min(0.01, "Preço inválido"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  description: z.string().trim().min(1, "A descrição ajuda a vender!"), // Obrigatória
  ingredients: z.string().trim().optional().or(z.literal("")), // Opcional
  menuCategoryId: z.string().min(1, "Categoria não selecionada"),
});

const DialogProduct = ({
  isOpen,
  onClose,
  product = null,
  selectedCategory,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { uploadToCloudinary } = useImageUpload();

  const selectedCategoryId = selectedCategory?.id;

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      imageUrl: "",
      description: "",
      ingredients: "",
      menuCategoryId: selectedCategoryId, // Já nasce vinculado!
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        ...product,
        price: Number(product.price).toString(),
      });
    } else {
      form.reset({
        name: "",
        price: "",
        imageUrl: "",
        description: "",
        ingredients: "",
      });
    }
  }, [product, form, isOpen]);

  useEffect(() => {
    if (selectedCategoryId) {
      form.setValue("menuCategoryId", selectedCategoryId);
    }
  }, [selectedCategoryId, form]);

  const onSubmit = async (data) => {
    startTransition(async () => {
      const result = product
        ? await updateProduct(product.id, data)
        : await createProduct({
            ...data,
            restaurantId: selectedCategory.restaurantId, // Verifique se esse campo existe aqui
          });

      if (result.success) {
        toast.success(product ? "Editado!" : "Criado!");
        onClose();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[500px] lg:max-w-[600px]">
        {/* P-0 e overflow-hidden para o ScrollArea dominar o espaço */}

        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Produto da Tabela {selectedCategory.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            {/* ScrollArea para garantir que o form role em telas pequenas */}
            <ScrollArea className="h-[70vh] w-full px-4">
              <div className="space-y-3 px-2 pb-6">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Foto do Produto</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          isLoading={isUploading}
                          onChange={async (file) => {
                            setIsUploading(true);
                            try {
                              const url = await uploadToCloudinary(file);
                              field.onChange(url);
                            } catch (error) {
                              toast.error("Erro no upload");
                            } finally {
                              setIsUploading(false);
                            }
                          }}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Burger Bacon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredientes (Resumo)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Carne 180g, queijo, pão brioche..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição Detalhada</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte mais sobre o prato..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <DialogFooter className="border-t bg-muted/30 p-6">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? "Salvando..."
                  : product
                    ? "Salvar Alterações"
                    : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogProduct;
