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

  dineInDetails?: {
    tableNumber: string;
  };
};

export type AddressDTO = {
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  reference?: string | null;
  areaType: string;
};

export type AdditionalIngredientDTO = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
};

export type CreateOrderProductDTO = {
  id?: string;
  productId?: string;
  name: string;
  price: number;
  quantity?: number;

  extras?: {
    id?: string;
    name?: string;
    title?: string;
    price?: number;
  }[];
};

export type OrderCustomerDTO = {
  name?: string;
  phone?: string;
};

export type OrderResponseDTO = {
  id: string;
  orderNumber?: number | null;
  status: string;
  consumptionMethod: string;

  totalAmount: number;
  deliveryFee: number;

  restaurantName: string;
  customerName?: string | null;
  customerPhone?: string | null;

  createdAt: Date;

  items: {
    id: string;
    name?: string | null;
    quantity: number;
    price: number;
    extras?: string[];
  }[];
};
