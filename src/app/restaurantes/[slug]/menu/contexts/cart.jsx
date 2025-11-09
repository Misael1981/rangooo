"use client";

import { createContext, useState } from "react";

export const CartContext = createContext({
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleCart = () => setIsOpen(!isOpen);
  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
