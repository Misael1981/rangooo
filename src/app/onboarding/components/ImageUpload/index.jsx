// components/ui/ImageUpload.jsx
"use client";

import { ImageUp, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const ImageUpload = ({
  value,
  onChange,
  onRemove,
  isLoading = false,
  error,
  className = "",
  maxSizeMB = 5,
  accept = "image/*",
}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(value || null);
  const [dragOver, setDragOver] = useState(false);

  // Atualiza preview quando value muda externamente
  useState(() => {
    if (value && value !== preview) {
      setPreview(value);
    }
  }, [value]);

  const validateFile = (file) => {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes

    if (!file.type.startsWith("image/")) {
      throw new Error("Apenas arquivos de imagem são permitidos");
    }

    if (file.size > maxSize) {
      throw new Error(`Imagem muito grande. Máximo: ${maxSizeMB}MB`);
    }

    return true;
  };

  const handleFileChange = async (file) => {
    try {
      validateFile(file);

      // Preview local imediato
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Chama callback para upload
      if (onChange) {
        await onChange(file);
      }
    } catch (error) {
      console.error("Erro no arquivo:", error);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleInputChange}
        disabled={isLoading}
      />

      <div
        className={`relative flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${dragOver ? "border-primary bg-primary/5" : "border-gray-300"} ${isLoading ? "cursor-not-allowed opacity-50" : "hover:border-primary hover:bg-accent/10"} p-6 transition-colors`}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="mb-2 h-10 w-10 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Enviando...</span>
          </div>
        ) : preview ? (
          <div className="group relative">
            <img
              src={preview}
              alt="Preview"
              className="h-28 w-28 rounded-lg object-cover shadow-md"
            />
            <button
              type="button"
              onClick={handleRemove}
              disabled={isLoading}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 shadow-lg transition-opacity hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <ImageUp className="mb-3 h-10 w-10 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Clique ou arraste uma imagem
            </span>
            <span className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF até {maxSizeMB}MB
            </span>
          </>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUpload;
