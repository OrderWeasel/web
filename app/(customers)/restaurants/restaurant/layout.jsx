"use client";
import { CartProvider } from "../../../../contexts/CartContext";
import { ModalProvider } from "../../../../contexts/ModalContext";

export default function RestaurantLayout({ children }){
  return (
    <CartProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </CartProvider>
  );
}
