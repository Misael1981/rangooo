import NavigationButton from "./components/NavigationButton";

type SecondaryHeaderProps = {
  title: string;
};

const SecondaryHeader = ({ title }: SecondaryHeaderProps) => {
  return (
    <header className="bg-primary p-4 flex items-center gap-2 w-full">
      <NavigationButton />
      <h1 className="text-lg font-semibold text-white">{title}</h1>
    </header>
  );
};

export default SecondaryHeader;
