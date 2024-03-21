"use client";
import {useContext} from 'react';
import { LocalStorageContext } from '../contexts/LocalStorageContext';
import getCopy from '../app/lib/utils/getCopy';

const useLocalStorage = () => {
  const {cookies, setCookies, authMerchant, setAuthMerchant} = useContext(LocalStorageContext);

  function addCookie(merchantId, cookie) {
    let cookiesCopy = getCopy(cookies);
    if (merchantId === "anonymous") {
      cookiesCopy["anonymous"].push(cookie);  
    } else {
      cookiesCopy[merchantId] = [];
      cookiesCopy[merchantId].push(cookie);
    }
    setCookies(cookiesCopy);
  }

  // not working ---------------------------
  // function getCookie(merchantId) {
  //   let cookie = cookies[merchantId];

  //   debugger;
  //   if (!cookie) {
  //     throw new Error(`No cookie for merchandId: ${merchantId}`);
  //   }
  //   return cookie;
  // }

  function setAuthorizedMerchant(currentMerchant) {
    try {
      window.localStorage.setItem("currentMerchant", JSON.stringify(currentMerchant));
      // console.log('CurrentMerchant stored in local storage');
    } catch (e) {
      throw new Error(e.message, '(at updateCart)');
    }
  }

  function getAuthorizedMerchant() {
    try {
      let currentMerchant = window.localStorage.getItem("currentMerchant");
      currentMerchant = currentMerchant ? JSON.parse(currentMerchant) : null;
      return currentMerchant;
    } catch (e) {
      throw new Error(e.message + " (getAuthorizedMerchant at useLocalStorage)");
    }
  }

  function removeCookie(merchantId) {
    let cookiesCopy = getCopy(cookies);
    if (merchantId) {
      delete cookiesCopy.merchantId;
    } else {
      cookiesCopy["anonymous"] = [];
    }
    setCookies(cookiesCopy);
  }

  function loadCart(merchantId) {
    try {
      let cart = window.localStorage.getItem(merchantId);
      cart = cart ? JSON.parse(cart) : null;
      return cart;
    } catch (e) {
      throw new Error(e.message + ' (loadCart at useLocalStorage)');
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
    // carts,
    // setCarts,
    // getCookie,
    loadCart,
    updateCart,
    deleteCart,
    cookies,
    addCookie, 
    removeCookie,
    setAuthMerchant,
    getAuthorizedMerchant,
    setAuthorizedMerchant,
  };
};

export default useLocalStorage;
