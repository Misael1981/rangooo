import { Star } from "lucide-react";
import LogoImage from "../LogoImage";
import { Badge } from "../ui/badge";

const EstablishmentDescription = ({ restaurant }) => {
  return (
    <section className="relative z-50 mt-[-1.5rem] space-y-4 rounded-t-3xl bg-white p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoImage restaurant={restaurant} width={56} height={56} />
            <div className="max-w-[80%]">
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-xs opacity-55">{restaurant.description}</p>
            </div>
          </div>
          <Badge variant="secondary">
            <Star
              className="mr-1 h-4 w-4 text-yellow-400"
              fill="currentColor"
            />
            <span className="text-base">5.0</span>
          </Badge>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-xs text-blue-500">{restaurant.address}</p>
        </div>
      </div>
    </section>
  );
};

export default EstablishmentDescription;
