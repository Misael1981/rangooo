import z from "zod";

export const openingHoursSchema = z.object({
  businessHours: z
    .array(
      z.object({
        dayOfWeek: z.number().int().min(0).max(6),
        isClosed: z.boolean().default(false),
        timeSlots: z
          .array(
            z.object({
              open: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
              close: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
              type: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SPECIAL"]),
            }),
          )
          .default([]),
      }),
    )
    .length(7),
});

export const openingHoursDefaultValues = {
  businessHours: Array.from({ length: 7 }).map((_, i) => ({
    dayOfWeek: i,
    isClosed: false,
    timeSlots: [],
  })),
};
