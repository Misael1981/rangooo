export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import LogoImage from "@/components/LogoImage";
import WelcomeSection from "@/components/WelcomeSection";
import ConsumptionMethodOption from "@/components/ConsumptionMethodOption";

export default async function PizzariaPage({ params }) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
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
          segment="pizzarias"
        />
        <ConsumptionMethodOption
          imageUrl="/images/takeaway.png"
          alt="Pegar no local"
          buttonText="Pegar no local"
          option="PICKUP"
          slug={slug}
          segment="pizzarias"
        />
        <ConsumptionMethodOption
          imageUrl="/images/delivery.png"
          alt="Entregar"
          buttonText="Entregar"
          option="DELIVERY"
          slug={slug}
          segment="pizzarias"
        />
      </div>
    </div>
  );
}
