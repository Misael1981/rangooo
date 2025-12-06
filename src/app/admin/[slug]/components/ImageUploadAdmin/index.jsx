"use client";

import { ImageUp, X } from "lucide-react";
import { useState } from "react";

const ImageUploadAdmin = ({
  form,
  onChange,
  name = "logo",
  initialUrl = null,
}) => {
  const [preview, setPreview] = useState(initialUrl || null);
  // Função para tratar mudanças no campo de logo
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Criar URL de pré-visualização
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      // Armazenar o arquivo no estado do formulário
      form.setValue(name, file);
      onChange(file);
    }
  };
  return (
    <div>
      <div className="w-full bg-slate-200">
        <input
          type="file"
          accept="image/*"
          id="logo-upload"
          className="hidden"
          onChange={handleLogoChange}
        />

        <label
          htmlFor="logo-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 transition hover:bg-accent"
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-32 object-contain"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setPreview(null);
                  form.setValue(name, null);
                  onChange(null);
                }}
                className="absolute right-0 top-0 rounded-full bg-background/80 p-1 shadow"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <ImageUp className="mb-3 h-10 w-10 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Clique para enviar a imagem
              </span>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUploadAdmin;
