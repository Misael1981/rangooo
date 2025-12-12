// lib/upload.js
// Função para fazer upload de uma imagem para o Cloudinary

export async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/cloudinary-upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Upload failed on internal API:", result.error);
    throw new Error(result.error || "Falha ao enviar imagem.");
  }

  return result.url;
}
