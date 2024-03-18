"use client";
import {useContext} from 'react';
import { LocalStorageContext } from '../contexts/LocalStorageContext';

const useLocalStorage = () => {
  const [carts, setCarts] = useContext(LocalStorageContext);

  function loadCart(merchantId) {
    try {
      let cart = window.localStorage.getItem(merchantId);
      cart = cart ? JSON.parse(cart) : null;
      return cart;
    } catch (e) {
      throw new Error(e.message, '(at loadCart)');
    }
  }

  function updateCart(merchantId, cartCopy) {
    try {
      window.localStorage.setItem(merchantId, JSON.stringify(cartCopy));
      console.log('carts updated');
    } catch (e) {
      throw new Error(e.message, '(at updateCart)');
    }
  }

  function deleteCart(merchantId) {
    try {
      window.localStorage.removeItem(merchantId)
      console.log('cart deleted');
    } catch (e) {
      throw new Error(e.message, '(at deleteCart)');
    }
  }

  return {
    carts,
    setCarts,
    loadCart,
    updateCart,
    deleteCart,
  };
};

export default useLocalStorage;
