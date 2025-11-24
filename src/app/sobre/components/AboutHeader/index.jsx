import Image from "next/image";
import SheetMenu from "../SheetMenu";
import NavMenu from "../NavMenu";

const AboutHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 lg:px-20">
      <Image src="/logo-rangooo.png" alt="Rangooo" width={70} height={50} />
      <div className="hidden lg:block">
        <NavMenu />
      </div>
      <SheetMenu />
    </header>
  );
};

export default AboutHeader;
