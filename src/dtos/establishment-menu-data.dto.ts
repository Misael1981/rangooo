export interface ConsumptionMethodDTO {
  id: string;
  method: "DINE_IN" | "PICKUP" | "DELIVERY";
  isActive: boolean;
  displayOrder: number;
}

export interface ProductDTO {
  id: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  ingredients: string | null[];
  additionalIngredients: AdditionalIngredientDTO[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MenuCategoryDTO {
  id: string;
  name: string;
  displayOrder: number;
  products: ProductDTO[];
}

export interface AdditionalIngredientDTO {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
}

export interface SocialMediaDTO {
  url: string;
  name: string;
}

export interface EstablishmentMenuDataDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  avatarImageUrl: string | null;
  coverImageUrl: string | null;
  category: string;
  address: string | null;
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  isOpen: boolean;
  deliveryFee: number;
  brandColors: string | null;
  socialMedia: SocialMediaDTO[];
  consumptionMethods: ConsumptionMethodDTO[];
  menuCategories: MenuCategoryDTO[];

  printerStatus?: string;
  printingToken?: string;
}
