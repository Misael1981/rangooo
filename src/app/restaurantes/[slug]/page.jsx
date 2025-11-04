export const dynamic = "force-dynamic";
export const revalidate = 0;

import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import LogoImage from "./components/LogoImage";
import WelcomeSection from "./components/WelcomeSection";
import ConsumptionMethodOption from "./components/ConsumptionMethodOption";

export default async function EstablishmentPage({ params }) {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      avatarImageUrl: true,
      coverImageUrl: true,
      brandColors: true,
      category: true,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center space-y-2">
        <LogoImage restaurant={restaurant} />
        <h1 className="text-3xl font-bold text-[--brand-primary]">
          {restaurant.name}
        </h1>
      </div>
      <WelcomeSection />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ConsumptionMethodOption
          imageUrl="/images/dine_in.png"
          alt="Comer no local"
          buttonText="Comer no local"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionMethodOption
          imageUrl="/images/takeaway.png"
          alt="Pegar no local"
          buttonText="Pegar no local"
          option="PICKUP"
          slug={slug}
        />
        <ConsumptionMethodOption
          imageUrl="/images/delivery.png"
          alt="Entregar"
          buttonText="Entregar"
          option="DELIVERY"
          slug={slug}
        />
      </div>
    </div>
  );
}
