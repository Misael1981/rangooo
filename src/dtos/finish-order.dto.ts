import { AreaType } from "@/generated/prisma/enums";

export type PaymentFormData = {
  paymentMethod: string;
  needsChange: boolean;
  changeAmount: string;
};

export type AddressData = {
  street?: string;
  number?: string;
  complement?: string | null;
  neighborhood?: string;
  city?: string;
  reference?: string | null;
  areaType?: AreaType;
};

export type CheckoutState = {
  consumptionMethod: "DELIVERY" | "PICKUP" | "DINE_IN";

  customer: {
    name?: string | null;
    phone?: string | null;
  };

  delivery?: {
    address?: AddressData;
  };

  pickup?: {
    estimatedTime?: string;
  };

  dineIn?: {
    tableNumber?: string;
  };

  payment?: PaymentFormData;

  pickupDetails?: {
    estimatedTime: string;
  };
};
