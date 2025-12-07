import { Button } from "@/components/ui/button";
import Link from "next/link";

const SelectDoublePizza = ({ url }) => {
  return (
    <div className="fixed bottom-0 right-0 z-30 w-full bg-white p-4">
      <Button className="w-full" asChild>
        <Link href={url}>Selecionar Sabores</Link>
      </Button>
    </div>
  );
};

export default SelectDoublePizza;
