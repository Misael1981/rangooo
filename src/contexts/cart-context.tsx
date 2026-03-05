"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ManageableIngredient } from "@/dtos/cart.dto";
import { AreaType } from "@/generated/prisma/enums";

export interface CartItem {
  lineId: string;
  productId: string;
  name: string;
  imageUrl: string | null;
  price: number;
  quantity: number;
  extras: ManageableIngredient[];
  consumptionMethod: ConsumptionMethod | string;
  isDouble?: boolean;
  flavor2?: {
    id: string;
    name: string;
    removedIngredients: string[];
  };
}

type ConsumptionMethod = "DELIVERY" | "PICKUP" | "DINE_IN" | null;

interface CartContextData {
  products: CartItem[];
  isOpen: boolean;
  totalPrice: number;
  totalQuantity: number;
  deliveryFee: number;
  totalFinal: number;
  consumptionMethod: ConsumptionMethod;
  userAreaType: string | null;
  setUserAreaType: (areaType: string | null) => void;
  setDeliveryFee: (fee: number | null) => void;
  setConsumptionMethod: (method: string) => void;
  addToCart: (item: CartItem) => void;
  toogleCart: () => void;
  decreaseProductQuantity: (lineId: string) => void;
  increaseProductQuantity: (lineId: string) => void;
  removeProduct: (lineId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextData>({
  products: [],
  isOpen: false,
  totalPrice: 0,
  totalQuantity: 0,
  deliveryFee: 0,
  totalFinal: 0,
  consumptionMethod: null,
  userAreaType: "",
  setUserAreaType: () => {},
  setDeliveryFee: () => {},
  setConsumptionMethod: () => {},
  addToCart: () => {},
  toogleCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deliveryFee, setDeliveryFeeState] = useState(0);
  const [consumptionMethod, setConsumptionMethodState] =
    useState<ConsumptionMethod>(null);
  const [userAreaType, setUserAreaType] = useState<AreaType | string | null>(
    null,
  );

  const toogleCart = () => setIsOpen((prev) => !prev);

  const totalQuantity = useMemo(
    () => products.reduce((acc, item) => acc + item.quantity, 0),
    [products],
  );

  const totalPrice = useMemo(
    () =>
      products.reduce((acc, item) => {
        const extrasSum = item.extras.reduce((s, e) => s + Number(e.price), 0);
        return acc + (item.price + extrasSum) * item.quantity;
      }, 0),
    [products],
  );

  const totalFinal = useMemo(() => {
    const isDelivery = consumptionMethod === "DELIVERY";
    return totalPrice + (isDelivery ? deliveryFee : 0);
  }, [totalPrice, deliveryFee, consumptionMethod]);

  const setDeliveryFee = (fee: number | null) => {
    setDeliveryFeeState(fee ?? 0);
  };

  const setConsumptionMethod = (method: string) => {
    setConsumptionMethodState(method.toUpperCase() as ConsumptionMethod);
  };

  const addToCart = (newItem: CartItem) => {
    setProducts((prev) => {
      const existingIndex = prev.findIndex((i) => i.lineId === newItem.lineId);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }
      return [...prev, newItem];
    });
    setIsOpen(true);
  };

  const decreaseProductQuantity = (lineId: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item,
      ),
    );
  };

  const increaseProductQuantity = (lineId: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const removeProduct = (lineId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((item) => item.lineId !== lineId);
      if (updated.length === 0) {
        setDeliveryFeeState(0);
        setConsumptionMethodState(null);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setProducts([]);
    setDeliveryFeeState(0);
    setConsumptionMethodState(null);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        isOpen,
        totalQuantity,
        deliveryFee,
        totalPrice,
        totalFinal,
        consumptionMethod,
        userAreaType,
        setUserAreaType,
        setDeliveryFee,
        setConsumptionMethod,
        addToCart,
        toogleCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
