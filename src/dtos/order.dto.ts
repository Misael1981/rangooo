import { OrderStatus, RestaurantCategory } from "@/generated/prisma/enums";

export interface EstablishmentOrder {
  name: string;
  avatarImageUrl: string | null;
  slug: string;
  category: RestaurantCategory;
}

export interface OrderItem {
  id: string;
  quantity: number;
  priceAtOrder: number;
  product: {
    name: string;
    menuCategory: {
      name: string;
    };
  };
}

export interface UserOrder {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  orderNumber: number;
  consumptionMethod: string;
  createdAt: Date;
  restaurant: EstablishmentOrder;
  items: OrderItem[];
}
