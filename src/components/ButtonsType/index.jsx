import { Button } from "../ui/button";
import Link from "next/link";
import { categoriesWithAll } from "@/lib/restaurantCategories";

const ButtonsType = ({ buttons }) => {
  const items = buttons?.length ? buttons : categoriesWithAll;

  return (
    <section className="flex w-full items-center justify-center">
      <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
        {items.map((button) => (
          <Link key={button.label} href={button.link}>
            <Button variant="ghost" className="border border-white">
              {button.label}
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ButtonsType;
