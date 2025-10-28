import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdOutlineAddCircle, MdOutlineRestaurantMenu } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";

const typeButtons = [
  {
    label: "Menu",
    icon: <MdOutlineRestaurantMenu />,
  },
  {
    label: "Informações",
    icon: <RiInformation2Fill />,
  },
  {
    label: "Fazer Pedido",
    icon: <MdOutlineAddCircle />,
  },
];

export default function LayoutMenuOptions({ restaurant }) {
  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${restaurant.coverImageUrl})`,
      }}
    >
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black/50 p-4 text-white">
        <div
          className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-[var(--brand-primary)]"
          style={{
            ["--brand-primary"]:
              Array.isArray(restaurant.brandColors) && restaurant.brandColors[0]
                ? restaurant.brandColors[0]
                : "#111827",
          }}
        >
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="flex w-[90%] flex-col items-center justify-center gap-4 rounded-2xl">
          {typeButtons.map((item) => (
            <Button
              key={item.label}
              className="flex w-full items-center gap-3 bg-[var(--brand-primary)] text-lg text-white hover:opacity-90"
              style={{
                ["--brand-primary"]:
                  Array.isArray(restaurant.brandColors) &&
                  restaurant.brandColors[1]
                    ? restaurant.brandColors[1]
                    : "#111827",
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
