import { Order, OrderItem, Restaurant, User } from "@/generated/prisma/client";

/* ---------------- Produtos ---------------- */
export type OrderExtraDTO = {
  id?: string;
  name?: string;
  title?: string;
  price?: number;
};

export type CreateOrderProductDTO = {
  id?: string;
  productId?: string;
  name: string;
  price: number;
  quantity?: number;
  extras?: OrderExtraDTO[];
  removedIngredients: string[];
  additionalIngredients?: OrderExtraDTO[] | null;

  isDouble?: boolean;
  flavor2?: {
    id: string;
    name: string;
    removedIngredients: string[];
    additionalIngredients?: OrderExtraDTO[] | null;
  } | null;
};

/* ---------------- Detalhes ---------------- */
export type DeliveryAddressDTO = {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
};

export type DineInDetailsDTO = {
  tableNumber: string;
};

export type PickupDetailsDTO = {
  estimatedTime: string;
};

export type OrderCustomerDTO = {
  name?: string;
  phone?: string;
};

/* ---------------- Input principal ---------------- */
export type CreateOrderInputDTO = {
  slug: string;
  consumptionMethod: "DELIVERY" | "PICKUP" | "DINE_IN";
  products: CreateOrderProductDTO[];
  deliveryFee?: number;
  payment: {
    paymentMethod: string;
    needsChange: boolean;
    changeAmount?: string;
  };

  delivery?: {
    address: {
      street: string;
      number: string;
      complement?: string | null;
      neighborhood: string;
      city: string;
    };
  };
  dineInDetails?: DineInDetailsDTO;
  pickupDetails?: PickupDetailsDTO;

  customer?: OrderCustomerDTO;
};

/* ---------------- Response ---------------- */

export type OrderWithDetails = Order & {
  user: User;
  restaurant: Restaurant;
  items: (OrderItem & {
    product: {
      menuCategory: {
        name: string;
      } | null;
    };
  })[];
};

export type OrderResponseDTO = OrderWithDetails;
