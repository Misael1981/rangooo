"use client";

import { createContext, useState } from "react";

export const CartContext = createContext({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const clearCart = () => setProducts([]);

  const addToCart = (product, quantity = 1, extras = []) => {
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

  const total = products.reduce((acc, item) => {
    const extrasSum = extrasPrice(item.extras);
    return acc + (Number(item.price ?? 0) + extrasSum) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        extrasPrice,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
