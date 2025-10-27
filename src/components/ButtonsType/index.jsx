import { Button } from "../ui/button";

const ButtonsType = ({ buttons }) => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
        {buttons.map((button) => (
          <Button
            key={button.label}
            variant="ghost"
            className="border border-white"
          >
            {button.label}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default ButtonsType;
