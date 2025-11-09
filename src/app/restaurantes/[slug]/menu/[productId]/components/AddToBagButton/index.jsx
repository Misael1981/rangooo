import { Button } from "@/components/ui/button";

const AddToBagButton = ({ product }) => {
  return (
    <section className="fixed bottom-0 left-0 right-0 px-4 py-2">
      <Button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground">
        Adicionar à sacola
      </Button>
    </section>
  );
};

export default AddToBagButton;
