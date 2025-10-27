import { Button } from "../ui/button";

const ButtonsType = ({ buttons }) => {
  return (
    <section className="flex gap-2 overflow-auto p-4 [&::-webkit-scrollbar]:hidden">
      {buttons.map((button) => (
        <Button
          key={button.label}
          variant="ghost"
          className="border border-white"
        >
          {button.label}
        </Button>
      ))}
    </section>
  );
};

export default ButtonsType;
