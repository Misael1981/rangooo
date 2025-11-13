import { Separator } from "@/components/ui/separator";
import HeaderInfosPage from "../../components/HeaderInfosPage";

const schedules = [
  {
    day: "Domingo",
    hours: "17:50 - 22:50",
  },
  {
    day: "Segunda-feira",
    hours: "fechado",
  },
  {
    day: "Terça-feira",
    hours: "fechado",
  },
  {
    day: "Quarta-feira",
    hours: "17:50 - 22:50",
  },
  {
    day: "Quinta-feira",
    hours: "17:50 - 22:50",
  },
  {
    day: "Sexta-feira",
    hours: "17:50 - 22:50",
  },
  {
    day: "Sábado",
    hours: "17:50 - 22:50",
  },
];

export default function Horarios() {
  return (
    <div className="w-full">
      <HeaderInfosPage title="Horários" />
      <section className="p-4">
        {schedules.map((schedule) => (
          <div key={schedule.day}>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">{schedule.day}</p>
              <p className="text-lg">{schedule.hours}</p>
            </div>
            <Separator className="my-4 bg-gray-300" />
          </div>
        ))}
      </section>
    </div>
  );
}
