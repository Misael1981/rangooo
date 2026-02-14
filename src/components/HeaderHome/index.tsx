import Image from "next/image";

const HeaderHome = () => {
  return (
    <header className="relative flex items-center justify-center p-4">
      <Image
        src="/logo-rangooo.png"
        alt="Rangooo Logo"
        width={200}
        height={200}
        className="h-32 w-32 object-contain drop-shadow-2xl md:h-48 md:w-48"
      />
    </header>
  );
};

export default HeaderHome;
