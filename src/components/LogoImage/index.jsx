// src\components\LogoImage\index.jsx

import Image from "next/image";

const LogoImage = ({ establishment, size = 120, width, height, className }) => {
  // 🚨 CORREÇÃO: EARLY RETURN (Retorno Rápido)
  if (!establishment) {
    console.error("LogoImage: establishment prop is undefined.");
    return null; // Retorna nulo para quebrar a renderização se os dados não existirem.
  }

  const w = width ?? size;
  const h = height ?? size;

  return (
    <div
      className={`relative rounded-lg ${className ?? ""}`}
      style={{ width: w, height: h }}
    >
      <Image
        // 🚨 O erro acontecia aqui: establishment era undefined
        src={establishment.avatarImageUrl}
        alt={establishment.name}
        fill
        className="rounded-lg object-contain"
      />
    </div>
  );
};

export default LogoImage;
