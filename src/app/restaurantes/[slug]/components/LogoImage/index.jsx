import Image from "next/image";

const LogoImage = ({ restaurant }) => {
  const bg = Array.isArray(restaurant.brandColors)
    ? restaurant.brandColors[0]
    : "#111827";
  return (
    <div
      className="flex h-[130px] w-[130px] items-center justify-center rounded-lg p-2"
      style={{ backgroundColor: bg }}
    >
      <Image
        src={restaurant.avatarImageUrl}
        alt={restaurant.name}
        width={120}
        height={120}
        className="rounded-full"
      />
    </div>
  );
};

export default LogoImage;
