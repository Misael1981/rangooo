import HeaderInfosPage from "@/components/HeaderInfosPage";
import { db } from "@/lib/prisma";
import BusinessHoursSection from "./components/BusinessHoursSection";
import QrCode from "@/components/QrCode";
import formatBusinessHours from "@/helpers/format-business-hours";

export default async function HorariosPage({ searchParams }) {
  const { slug } = await searchParams;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { businessHours: true },
  });

  const schedules = formatBusinessHours(restaurant?.businessHours ?? []);

  return (
    <div className="relative min-h-screen bg-white sm:py-6">
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <QrCode />
      </div>

      <div className="mx-auto max-w-xl shadow-all-sides">
        <HeaderInfosPage title="Horários" />
        <BusinessHoursSection businessHours={schedules} />
      </div>

      <div className="fixed bottom-8 right-8 hidden lg:block">
        <QrCode />
      </div>
    </div>
  );
}
