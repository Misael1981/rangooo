import { EstablishmentDto } from "@/dtos/establishments.dto";
import { enumCategoryToRoute } from "@/helpers/enum-category-to-route";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { getCategoryBackground } from "@/helpers/get-category-background";

type EstablishmentCardsProps = {
  establishments: EstablishmentDto[];
};

const EstablishmentCards = ({ establishments }: EstablishmentCardsProps) => {
  const segment = enumCategoryToRoute(establishments[0]?.category);
  return (
    <section className="flex flex-wrap justify-center gap-4">
      {establishments.map((establishment) => (
        <Link
          key={establishment.slug}
          href={`/${segment}/${establishment.slug}`}
        >
          <Card className="p-0 border-0">
            <CardContent
              className="relative border flex h-50 w-75 flex-col items-center justify-center gap-4 rounded-lg p-4 text-white"
              style={
                {
                  "--brand-primary":
                    Array.isArray(establishment.brandColors) &&
                    establishment.brandColors[0]
                      ? establishment.brandColors[0]
                      : getCategoryBackground(establishment.category),
                  backgroundColor: "var(--brand-primary)",
                  borderColor: "var(--brand-primary)",
                } as React.CSSProperties
              }
            >
              <div className="relative h-30 w-30 rounded-lg">
                <Image
                  src={establishment.avatarImageUrl || "/default-avatar.png"}
                  alt={establishment.name}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
              <p className="text-center text-lg font-bold text-white">
                {establishment.name}
              </p>
              <Badge
                className="absolute right-2 top-2 px-4 py-1 text-white"
                style={{
                  backgroundColor: establishment.isOpen ? "green" : "red",
                }}
              >
                {establishment.isOpen ? "Aberto" : "Fechado"}
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
};

export default EstablishmentCards;
