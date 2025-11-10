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

  const decreaseProductQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item,
      ),
    );
  };

  const increaseProductQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== productId),
    );
  };

  const total = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

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
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
