import Image from "next/image";

const LogoImage = ({
  restaurant,
  size = 120,
  width,
  height,
  className,
  style,
  ...divProps
}) => {
  const w = width ?? size;
  const h = height ?? size;
  const bg =
    Array.isArray(restaurant.brandColors) && restaurant.brandColors[0]
      ? restaurant.brandColors[0]
      : "#111827";

  return (
    <div
      className={`relative rounded-lg ${className ?? ""}`}
      style={{ width: w, height: h, backgroundColor: bg, ...(style ?? {}) }}
      {...divProps}
    >
      <Image
        src={restaurant.avatarImageUrl}
        alt={restaurant.name}
        fill
        className="object-contain p-2"
      />
    </div>
  );
};

export default LogoImage;
