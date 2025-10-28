export const dynamic = "force-dynamic";
export const revalidate = 0;

import { db } from "@/lib/prisma";
import ButtonsType from "@/components/ButtonsType";
import ClientsCards from "@/components/ClientsCards";

export default async function RestaurantsPage({ searchParams }) {
  const categoryParam = searchParams?.category ?? "ALL";

  const where =
    categoryParam && categoryParam !== "ALL" ? { category: categoryParam } : {};

  const establishments = await db.restaurant.findMany({
    where,
    select: {
      id: true,
      name: true,
      slug: true,
      avatarImageUrl: true,
      brandColors: true,
      category: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4">
      <ButtonsType selectedCategory={categoryParam} />
      <ClientsCards clients={establishments} />
    </div>
  );
}