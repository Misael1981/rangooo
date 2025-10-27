import Image from "next/image";

const HeaderHome = () => {
  return (
    <header className="">
      <div className="mb-8">
        <Image
          src="/logo-rangooo.png"
          alt="Rangooo Logo"
          width={200}
          height={200}
          className="h-32 w-32 object-contain drop-shadow-2xl md:h-48 md:w-48"
        />
      </div>
    </header>
  );
};

export default HeaderHome;
