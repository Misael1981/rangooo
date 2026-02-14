import Image from "next/image";
import CartButton from "../CartButton";
import BackButton from "../BackButton";

type HeaderMenuProps = {
  image: string | null;
  alt: string;
};

const HeaderMenu = ({ image, alt }: HeaderMenuProps) => {
  return (
    <header className="relative min-h-83 w-full">
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50" />
      <BackButton />
      <Image
        src={image || "/default-image.jpg"}
        alt={alt}
        fill
        className="object-cover"
      />
      <CartButton />
    </header>
  );
};

export default HeaderMenu;
