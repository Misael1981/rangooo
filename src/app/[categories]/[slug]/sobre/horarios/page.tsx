import HeaderAbout from "../components/HeaderAbout";
import { getRestaurantBySlug } from "@/data/get-establishment-for-about";
import { notFound } from "next/navigation";
import formatBusinessHours from "@/helpers/format-business-hours";
import { TimeSlot } from "@/helpers/format-business-hours";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/PageContainer";

interface SchedulesPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SchedulesPage({ params }: SchedulesPageProps) {
  const { slug } = await params;

  const establishment = await getRestaurantBySlug(slug);

  if (!establishment) return notFound();

  const businessHours = formatBusinessHours(
    establishment.businessHours.map((bh) => ({
      ...bh,
      timeSlots: bh.timeSlots as unknown as TimeSlot[],
    })),
  );

  return (
    <PageContainer>
      <div className="min-h-screen bg-white">
        <HeaderAbout title="Horários de funcionamento" />
        <main>
          <section className="p-4">
            {businessHours.map((item) => {
              const periods = item.hours.split(", ");
              const hasTwo = periods.length === 2;

              return (
                <div key={item.day}>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">{item.day}</p>
                    <div className="text-right">
                      {hasTwo ? (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              Almoço
                            </span>
                            <p className="text-lg">{periods[0]}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              Janta
                            </span>
                            <p className="text-lg">{periods[1]}</p>
                          </div>
                        </div>
                      ) : (
                        <p
                          className={`text-lg ${
                            item.hours.toLowerCase() === "fechado"
                              ? "text-red-500 font-semibold"
                              : ""
                          }`}
                        >
                          {item.hours === "Fechado" ? "Fechado" : item.hours}
                        </p>
                      )}
                    </div>
                  </div>
                  <Separator className="my-4 bg-gray-300" />
                </div>
              );
            })}
          </section>
        </main>
      </div>
    </PageContainer>
  );
}
