import Image from "next/image";
import BackButton from "../BackButton";
import MyOrdersButtonLink from "../MyOrdersButtonLink";

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
      <MyOrdersButtonLink />
    </header>
  );
};

export default HeaderMenu;
