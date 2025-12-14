const WEEK_DAYS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export default function formatBusinessHours(businessHours = []) {
  return WEEK_DAYS.map((day, index) => {
    const dayData = businessHours.find((item) => item.dayOfWeek === index);

    if (!dayData || dayData.isClosed) {
      return {
        day,
        hours: "fechado",
      };
    }

    if (!dayData.timeSlots?.length) {
      return {
        day,
        hours: "fechado",
      };
    }

    // Ex: "17:50 - 22:50, 23:00 - 02:00"
    const hours = dayData.timeSlots
      .map((slot) => `${slot.open} - ${slot.close}`)
      .join(", ");

    return {
      day,
      hours,
    };
  });
}
