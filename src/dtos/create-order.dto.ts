import {
  $Enums,
  Order,
  OrderItem,
  Restaurant,
  User,
} from "@misael1981/rangooo-database"
import {
  Decimal,
  JsonValue,
} from "@misael1981/rangooo-database/generated-client/runtime/library"

/* ---------------- Produtos ---------------- */
export type OrderExtraDTO = {
  id?: string
  name?: string
  title?: string
  price?: number
}

export type CreateOrderProductDTO = {
  id?: string
  productId?: string
  name: string
  price: number
  quantity?: number
  extras?: OrderExtraDTO[]
  removedIngredients: string[]
  additionalIngredients?: OrderExtraDTO[] | null

  isDouble?: boolean
  flavor1Id?: string
  flavor2Id?: string

  flavor1Details?: {
    id: string
    name: string
    removedIngredients: string[]
    extras?: OrderExtraDTO[] | null
  } | null

  flavor2Details?: {
    id: string
    name: string
    removedIngredients: string[]
    extras?: OrderExtraDTO[] | null
  } | null
}

/* ---------------- Detalhes ---------------- */
export type DeliveryAddressDTO = {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
}

export type DineInDetailsDTO = {
  tableNumber: string
}

export type PickupDetailsDTO = {
  estimatedTime: string
}

export type OrderCustomerDTO = {
  name?: string
  phone?: string
}

/* ---------------- Input principal ---------------- */
export type CreateOrderInputDTO = {
  slug: string
  consumptionMethod: "DELIVERY" | "PICKUP" | "DINE_IN"
  products: CreateOrderProductDTO[]
  deliveryFee?: number
  payment: {
    paymentMethod: string
    needsChange: boolean
    changeAmount?: string
  }

  delivery?: {
    address: {
      street: string
      number: string
      complement?: string | null
      neighborhood: string
      city: string
    }
  }
  dineInDetails?: DineInDetailsDTO
  pickupDetails?: PickupDetailsDTO

  customer?: OrderCustomerDTO
}

/* ---------------- Response ---------------- */

export type OrderWithDetails = Order & {
  user: User
  restaurant: Restaurant
  items: (OrderItem & {
    product: {
      menuCategory: {
        name: string
      } | null
    }
  })[]
}

export type OrderResponseDTO = OrderWithDetails

/* ---------------- Impressão ---------------- */

export type PrinterOrderDTO = {
  id: string
  orderNumber: number | null
  consumptionMethod: $Enums.ConsumptionMethod
  deliveryFee: Decimal
  paymentMethod: string | null
  totalAmount: Decimal
  deliveryAddress: JsonValue | null
  restaurantId: string
  createdAt: Date
  updatedAt: Date
  userId: string
  customName: string | null
  extras: string | null
  printId: string | null
  deliveryPersonId: string | null
  status: $Enums.OrderStatus
  user: {
    id: string
    name: string | null
    phone: string | null
  }
  restaurant: {
    id: string
    name: string
    slug: string
  }
  items: {
    id: string
    quantity: number
    priceAtOrder: Decimal
    customName: string | null
    isDouble: boolean
    flavor1Name: string | null
    flavor1additionalIngredients: JsonValue | null
    flavor1Removed: JsonValue | null
    flavor2Name: string | null
    flavor2additionalIngredients: JsonValue | null
    flavor2Removed: JsonValue | null
    extras: JsonValue | null
    removedIngredients: JsonValue | null
    product: {
      menuCategory: {
        name: string
      }
    }
  }[]
}
