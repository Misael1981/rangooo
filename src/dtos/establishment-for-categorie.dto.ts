import {
  ConsumptionMethod,
  RestaurantCategory,
} from "@/generated/prisma/client";

export interface EstablishmentForCategorieDTO {
  id: string;
  name: string;
  slug: string;
  avatarImageUrl: string | null;
  category: RestaurantCategory;
  methods: {
    type: ConsumptionMethod;
    isActive: boolean;
  }[];
}
