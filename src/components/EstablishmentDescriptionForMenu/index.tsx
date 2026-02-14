import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import LogoImage from "../LogoImage";

type EstablishmentDescriptionForMenuProps = {
  establishmentData: {
    name: string;
    avatarImageUrl: string | null;
    description: string | null;
    street: string | null;
    number: string | null;
    neighborhood: string | null;
    city: string | null;
    state: string | null;
  };
};

const EstablishmentDescriptionForMenu = ({
  establishmentData,
}: EstablishmentDescriptionForMenuProps) => {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoImage
            establishmentImage={establishmentData.avatarImageUrl}
            width={48}
            height={48}
            alt={establishmentData.name}
          />
          <div className="max-w-[80%]">
            <h2 className="text-lg font-semibold">{establishmentData.name}</h2>
            <p className="text-xs opacity-55">
              {establishmentData.description || "Sem descrição disponível."}
            </p>
          </div>
        </div>
        <Badge variant="secondary">
          <Star className="mr-1 h-4 w-4 text-yellow-400" fill="currentColor" />
          <span className="text-base">5.0</span>
        </Badge>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-center text-xs text-blue-500">
          {establishmentData.street}, {establishmentData.number} -{" "}
          {establishmentData.neighborhood}, {establishmentData.city} -{" "}
          {establishmentData.state}
        </p>
      </div>
    </section>
  );
};

export default EstablishmentDescriptionForMenu;
