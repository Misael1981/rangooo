"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import ImageUploadAdmin from "../../../components/ImageUploadAdmin";

const establishmentProfileSchema = z.object({
  socialMedia: z
    .array(
      z.object({
        platform: z.enum(["facebook", "instagram", "tiktok", "x", "youtube"]),
        url: z.string().url({ message: "URL inválida" }),
      }),
    )
    .default([])
    .optional(),
  email: z.string().email("Email inválido."),
  avatarImageUrl: z.string().url("URL inválida."),
  coverImageUrl: z.string().url("URL inválida."),
});

const toSocialArray = (obj) =>
  Array.isArray(obj)
    ? obj
    : Object.entries(obj ?? {})
        .map(([platform, url]) => ({ platform, url }))
        .filter((s) => typeof s.url === "string" && s.url.length > 0);

const EstablishmentProfile = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(establishmentProfileSchema),
    mode: "onChange",
    defaultValues: {
      socialMedia: toSocialArray(data?.socialMedia),
      email: data?.email ?? "",
      avatarImageUrl: data?.avatarImageUrl ?? "",
      coverImageUrl: data?.coverImageUrl ?? "",
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });

  useEffect(() => {
    if (data) {
      form.reset({
        socialMedia: toSocialArray(data?.socialMedia),
        email: data?.email ?? "",
        avatarImageUrl: data?.avatarImageUrl ?? "",
        coverImageUrl: data?.coverImageUrl ?? "",
      });
    }
  }, [data, form]);

  const onSubmit = async (values) => {
    try {
      const res = await fetch("/api/establishment/general-info", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      toast.success("Informações atualizadas com sucesso!");
    } catch {
      toast.error("Erro ao atualizar informações.");
    }
  };

  const onChangeAvatar = (file) => {
    form.setValue("avatarImageUrl", file);
  };

  const onChangeCover = (file) => {
    form.setValue("coverImageUrl", file);
  };

  return (
    <section className="my-4 rounded-md bg-white p-6 shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Perfil do Estabelecimento
        </h2>
        <p className="mb-4 text-gray-600">
          Atualize o perfil do estabelecimento.
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Redes Sociais */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Redes Sociais</h3>

              <div className="space-y-3">
                {fields.map((f, index) => (
                  <div
                    key={f.id}
                    className="flex items-end gap-3 rounded-md border p-3"
                  >
                    <FormField
                      control={form.control}
                      name={`socialMedia.${index}.platform`}
                      render={({ field }) => (
                        <FormItem className="w-40">
                          <FormLabel>Plataforma</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="facebook">Facebook</SelectItem>
                              <SelectItem value="instagram">
                                Instagram
                              </SelectItem>
                              <SelectItem value="tiktok">TikTok</SelectItem>
                              <SelectItem value="x">X</SelectItem>
                              <SelectItem value="youtube">YouTube</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`socialMedia.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>URL</FormLabel>
                          <Input {...field} placeholder="https://" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => remove(index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    platform: "facebook",
                    url: "",
                  })
                }
              >
                Adicionar Rede Social
              </Button>
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="emailEstablishment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="w-full min-w-[250px] max-w-[450px]">
                <h3 className="text-lg font-semibold">Logo</h3>
                <ImageUploadAdmin
                  form={form}
                  name="avatarImageUrl"
                  initialUrl={data?.avatarImageUrl}
                  onChange={onChangeAvatar}
                />
              </div>
              <div className="w-full min-w-[250px] max-w-[450px]">
                <h3 className="text-lg font-semibold">Capa</h3>
                <ImageUploadAdmin
                  form={form}
                  name="coverImageUrl"
                  initialUrl={data?.coverImageUrl}
                  onChange={onChangeCover}
                />
              </div>
            </div>

            <Button type="submit">Salvar alterações</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default EstablishmentProfile;
