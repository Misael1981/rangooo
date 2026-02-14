import Image from "next/image";

type LogoImageProps = {
  establishmentImage: string | null;
  width?: number;
  height?: number;
  alt?: string;
};

const LogoImage = ({
  establishmentImage,
  width = 36,
  height = 36,
  alt = "Logo",
}: LogoImageProps) => {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden shadow-md "
      style={{ width, height }}
    >
      <Image
        src={establishmentImage || "/default-logo.png"}
        alt={alt}
        fill
        className="object-contain rounded-lg"
      />
    </div>
  );
};

export default LogoImage;
