export async function uploadImageToCloudinary(file) {
  try {
    if (!file) return null;

    // Se já for uma URL (ex.: reupload), retorna direto
    if (typeof file === "string" && /^https?:\/\//.test(file)) {
      return file;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !preset) {
      console.warn(
        "Cloudinary envs ausentes: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
      );
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Cloudinary upload falhou:", err);
      return null;
    }

    const json = await res.json();
    return json?.secure_url ?? null;
  } catch (e) {
    console.error("Erro no upload Cloudinary:", e);
    return null;
  }
}
