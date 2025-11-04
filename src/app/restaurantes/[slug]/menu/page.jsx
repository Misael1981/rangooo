import { db } from "@/lib/prisma";
import HeaderMenu from "./components/HeaderMenu";
import { notFound } from "next/navigation";

const isConsumptionMethod = (method) => {
  return ["DINE_IN", "PICKUP", "DELIVERY"].includes(method?.toUpperCase());
};

export default async function MenuPage({ params, searchParams }) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

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

  if (!isConsumptionMethod(consumptionMethod)) {
    return notFound();
  }

  return (
    <div>
      <HeaderMenu restaurant={restaurant} />
    </div>
  );
}
