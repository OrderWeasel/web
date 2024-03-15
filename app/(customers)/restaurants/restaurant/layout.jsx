"use client";
import { CartProvider } from "../../../../contexts/CartContext";

export default function RestaurantLayout({ children }){
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
