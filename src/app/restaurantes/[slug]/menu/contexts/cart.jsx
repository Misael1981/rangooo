"use client";

import { createContext, useState } from "react";

export const CartContext = createContext({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  openCart: () => {},
  closeCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product, quantity = 1) => {
    setProducts((prevProducts) => {
      const exists = prevProducts.some((item) => item.id === product.id);
      if (exists) {
        return prevProducts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevProducts, { ...product, quantity }];
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
