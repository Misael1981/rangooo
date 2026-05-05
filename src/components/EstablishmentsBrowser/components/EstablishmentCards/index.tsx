import Link from "next/link"
import Image from "next/image"
import { EstablishmentDto } from "@/dtos/establishments.dto"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { enumCategoryToRoute } from "@/constants/enum-category-to-route"
import { getCategoryBackground } from "@/constants/get-category-background"

type EstablishmentCardsProps = {
  establishments: EstablishmentDto[]
}

const EstablishmentCards = ({ establishments }: EstablishmentCardsProps) => {
  const segment = enumCategoryToRoute(establishments[0]?.category)
  return (
    <section className="flex flex-wrap justify-center gap-4">
      {establishments.map((establishment) => (
        <Link
          key={establishment.slug}
          href={`/${segment}/${establishment.slug}`}
        >
          <Card className="border-0 p-0">
            <CardContent
              className="relative flex h-50 w-75 flex-col items-center justify-center gap-4 rounded-lg border p-4 text-white"
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
                className="absolute top-2 right-2 px-4 py-1 text-white"
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
  )
}

export default EstablishmentCards
