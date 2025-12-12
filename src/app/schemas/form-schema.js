import z from "zod";

import { ownerDefaultValues, ownerSchema } from "./onboarding/owner-schema";
import { storeDefaultValues, storeSchema } from "./onboarding/store-schema";
import {
  openingHoursDefaultValues,
  openingHoursSchema,
} from "./onboarding/openingHoursSchema";
import {
  menuDefaultValues,
  menuSchema,
} from "./onboarding/menuEstablishment-schema";

export const formSchema = z.object({
  owner: ownerSchema,
  store: storeSchema,
  openingHours: openingHoursSchema,
  menu: menuSchema,
});

export const defaultValues = {
  owner: ownerDefaultValues,
  store: storeDefaultValues,
  openingHours: openingHoursDefaultValues,
  menu: menuDefaultValues,
};
