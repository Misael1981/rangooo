"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";

export const CartContext = createContext({
  isOpen: false,
  products: [],
  deliveryFee: 0,
  toggleCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  clearCart: () => {},
  addToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  subtotal: 0,
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const searchParams = useSearchParams();

  const isDelivery =
    searchParams.get("consumptionMethod")?.toUpperCase() === "DELIVERY";

  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const clearCart = () => {
    setProducts([]);
    setDeliveryFee(0);
  };

  const addToCart = (product, quantity = 1, extras = [], fee = 0) => {
    if (fee > 0) setDeliveryFee(Number(fee));

    setProducts((prevProducts) => {
      const compositeKey = product.composite
        ? product.composite
            .map((p) => p.id)
            .sort()
            .join("-")
        : product.id;

      const extrasKey = JSON.stringify(
        (Array.isArray(extras) ? extras : [])
          .map((e) => e?.id ?? e?.name ?? String(e))
          .sort(),
      );

      const lineId = `${compositeKey}:${extrasKey}`;
      const exists = prevProducts.some((item) => item.lineId === lineId);

      if (exists) {
        return prevProducts.map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevProducts, { ...product, quantity, extras, lineId }];
    });
  };

  const decreaseProductQuantity = (lineId) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item,
      ),
    );
  };

  const increaseProductQuantity = (lineId) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const removeProduct = (lineId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.lineId !== lineId),
    );
  };

  const extrasPrice = (extras) => {
    return Array.isArray(extras)
      ? extras.reduce((s, e) => s + Number(e?.price ?? 0), 0)
      : 0;
  };

  // Subtotal (Apenas produtos)
  const subtotal = products.reduce((acc, item) => {
    const extrasSum = extrasPrice(item.extras);
    return acc + (Number(item.price ?? 0) + extrasSum) * item.quantity;
  }, 0);

  const total = subtotal + (isDelivery ? deliveryFee : 0);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        deliveryFee,
        setDeliveryFee,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        extrasPrice,
        clearCart,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
