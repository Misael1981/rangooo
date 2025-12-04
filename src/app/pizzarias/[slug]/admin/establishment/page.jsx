import { db } from "@/lib/prisma";
import GeneralInformationEstablishment from "./components/GeneralInformationEstablishment";
import HeaderEstablishment from "./components/HeaderEstablishment";
import EstablishmentProfile from "./components/EstablishmentProfile";

export default async function EstablishmentPage({ params }) {
  const p = await params;
  const slug = p.slug;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      avatarImageUrl: true,
      coverImageUrl: true,
      socialMedia: true,
      street: true,
      number: true,
      complement: true,
      neighborhood: true,
      city: true,
      state: true,
      socialMedia: true,
      contacts: { select: { type: true, number: true, isPrimary: true } },
      description: true,
      businessHours: {
        select: { dayOfWeek: true, timeSlots: true, isClosed: true },
      },
      category: true,
      menuCategories: { select: { id: true, name: true } },
    },
  });

  return (
    <div className="container mx-auto px-6">
      <HeaderEstablishment />

      <GeneralInformationEstablishment data={restaurant} />
      <EstablishmentProfile data={restaurant} />
    </div>
  );
}
