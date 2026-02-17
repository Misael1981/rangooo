export interface Contact {
  id: string;
  restaurantId: string;
  type: "WHATSAPP" | "PHONE" | "EMAIL";
  number: string;
  label: string | null;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialMedia {
  url: string;
  name: string;
}

export interface RestaurantGeneralInfo {
  name: string;
  contacts: Contact[];
  socialMedia: SocialMedia[];
}
