"use client";
import React, {createContext, useState, useEffect} from 'react';

const CartContext = createContext(null);

const CartProvider = props => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(JSON.stringify(cart) + " (at CartContext)");
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};

export {CartContext, CartProvider};
