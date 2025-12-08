import Image from "next/image";

const LogoImage = ({ establishment, restaurant, size = 120, className }) => {
  // Aceita tanto 'establishment' quanto 'restaurant' como prop (alias)
  const data = establishment || restaurant;

  if (!data || !data.avatarImageUrl || !data.name) {
    console.log("Invalid establishment/restaurant prop in LogoImage:", data);
    return null;
  }

  const w = size;
  const h = size;

  return (
    <div
      className={`relative rounded-lg ${className ?? ""}`}
      style={{ width: w, height: h }}
    >
      <Image
        src={data.avatarImageUrl}
        alt={data.name}
        fill
        className="rounded-lg object-contain"
      />
    </div>
  );
};

export default LogoImage;
