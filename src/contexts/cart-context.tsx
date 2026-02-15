"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ManageableIngredient } from "@/dtos/cart.dto";

export interface CartItem {
  lineId: string;
  productId: string;
  name: string;
  imageUrl: string | null;
  price: number;
  quantity: number;
  extras: ManageableIngredient[];
  consumptionMethod: ConsumptionMethod | string;
  deliveryFee?: number;
  //removedIngredients: string[];
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
  consumptionMethod: "DELIVERY" | "PICKUP" | "DINE_IN" | null;
  setDeliveryFee: (fee: number) => void;
  addToCart: (item: CartItem) => void;
  toogleCart: () => void;
  decreaseProductQuantity: (lineId: string) => void;
  increaseProductQuantity: (lineId: string) => void;
  removeProduct: (lineId: string) => void;
  setConsumptionMethod: (method: string) => void;
}

export const CartContext = createContext<CartContextData>({
  products: [],
  isOpen: false,
  totalPrice: 0,
  totalQuantity: 0,
  deliveryFee: 0,
  setDeliveryFee: () => {},
  totalFinal: 0,
  addToCart: () => {},
  toogleCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  consumptionMethod: null,
  setConsumptionMethod: () => {},
} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [consumptionMethod, setConsumptionMethod] =
    useState<ConsumptionMethod>(null);

  const toogleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const totalQuantity = useMemo(
    () => products.reduce((acc, item) => acc + item.quantity, 0),
    [products],
  );

  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => {
      const extrasSum = item.extras.reduce((s, e) => s + Number(e.price), 0);
      return acc + (item.price + extrasSum) * item.quantity;
    }, 0);
  }, [products]);

  const totalFinal = useMemo(() => {
    const isDelivery = consumptionMethod === "DELIVERY";
    return totalPrice + (isDelivery ? deliveryFee : 0);
  }, [totalPrice, deliveryFee, consumptionMethod]);

  const updateConsumptionMethod = (method: string) => {
    setConsumptionMethod(method.toUpperCase() as ConsumptionMethod);
  };

  const updateDeliveryFee = (fee: number) => {
    setDeliveryFee(Number(fee));
  };

  const addToCart = (newItem: CartItem) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (item) => item.lineId === newItem.lineId,
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity:
            updatedProducts[existingProductIndex].quantity + newItem.quantity,
        };
        return updatedProducts;
      }

      return [...prevProducts, newItem];
    });

    setIsOpen(true);
  };

  const decreaseProductQuantity = (lineId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item,
      ),
    );
  };

  const increaseProductQuantity = (lineId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const removeProduct = (lineId: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (item) => item.lineId !== lineId,
      );

      if (updatedProducts.length === 0) {
        setDeliveryFee(0);
        setConsumptionMethod(null);
      }

      return updatedProducts;
    });
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
        setConsumptionMethod: updateConsumptionMethod,
        addToCart,
        toogleCart,
        setDeliveryFee: updateDeliveryFee,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
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
