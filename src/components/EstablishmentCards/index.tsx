import { EstablishmentDto } from "@/dtos/establishments.dto";
import { enumCategoryToRoute } from "@/helpers/enum-category-to-route";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";

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
              className="relative border border-[--brand-primary] flex h-[200px] w-[300px] flex-col items-center justify-center gap-4 rounded-lg bg-(--brand-primary) p-4"
              style={
                {
                  "--brand-primary":
                    Array.isArray(establishment.brandColors) &&
                    establishment.brandColors[0]
                      ? (establishment.brandColors[0] as string)
                      : "#111827",
                } as React.CSSProperties
              }
            >
              <div className="relative h-[120px] w-[120px] rounded-lg">
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
