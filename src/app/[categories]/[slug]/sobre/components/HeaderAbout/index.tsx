import NavigationButton from "../NavigationButton";

type HeaderAboutProps = {
  title: string;
};

const HeaderAbout = ({ title }: HeaderAboutProps) => {
  return (
    <header className="bg-primary p-4 flex items-center gap-2 w-full">
      <NavigationButton />
      <h1 className="text-lg font-semibold text-white">{title}</h1>
    </header>
  );
};

export default HeaderAbout;
