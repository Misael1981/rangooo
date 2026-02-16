// 1. Definimos o contrato dos dados
export interface TimeSlot {
  open: string;
  close: string;
}

export interface BusinessHourInput {
  dayOfWeek: number;
  isClosed: boolean;
  timeSlots?: TimeSlot[];
}

export interface FormattedBusinessHour {
  day: string;
  hours: string;
}

const WEEK_DAYS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;

export default function formatBusinessHours(
  businessHours: BusinessHourInput[] = [],
): FormattedBusinessHour[] {
  return WEEK_DAYS.map((day, index) => {
    const dayData = businessHours.find((item) => item.dayOfWeek === index);
    if (!dayData || dayData.isClosed || !dayData.timeSlots?.length) {
      return {
        day,
        hours: "Fechado",
      };
    }

    const hours = dayData.timeSlots
      .map((slot) => `${slot.open} - ${slot.close}`)
      .join(", ");

    return {
      day,
      hours,
    };
  });
}
