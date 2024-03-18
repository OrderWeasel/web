"use client";
import {useContext} from 'react';
import {CartContext} from '../contexts/CartContext';
import useLocalStorage from './useLocalStorage';
import getCopy from '../app/lib/utils/getCopy';

// hardcoded tax rate for Seattle
// should be able to get tax rates dynamically based on location 
import { SEATTLE_SALES_TAX_RATE } from '../app/lib/utils/taxRates';

// import useResData from '../hooks/useResData';

// menu either comes from context or as an argument at invocation
const useCart = () => {
  const [cart, setCart] = useContext(CartContext);
  const {updateCart} = useLocalStorage();
  // const {resId, menu} = useResData(); //  merchantId replacing resId

  // needs merchantId ✅
  function addItem(merchantId, itemId, quantity) {
    if (quantity === '0') {
      return;
    }

    let cartCopy = getCopy(cart);
    let menuCopy = getCopy(menu);
    menuCopy = flattenMenu(menuCopy);
    let index = findIndex(menuCopy, itemId);
    let item = menuCopy[index];
    item.quantity = String(quantity);
    cartCopy.push(item);

    updateCart(merchantId, cartCopy);

    setCart(cartCopy);
  }

  // needs merchantId ✅
  function deleteItem(merchantId, itemId) {
    let cartCopy = getCopy(cart);
    let index = findIndex(cart, itemId);
    cartCopy = cartCopy.filter((el, idx) => {
      return index !== idx;
    });

    updateCart(merchantId, cartCopy);

    setCart(cartCopy);
  }

  // needs merchantId ✅
  function editItem(merchantId, itemId, quantity) {
    // won't be necessary after we figure out how to reset modal state
    if (quantity === '0') {
      return;
    }

    let cartCopy = getCopy(cart);
    let index = findIndex(cart, itemId);
    let item = cartCopy[index];
    item.quantity = String(quantity);

    updateCart(merchantId, cartCopy);

    setCart(cartCopy);
  }

  function cartTotal() {
    let total = 0;

    cart.forEach(item => {
      let cost = Number(item.cost);
      let quantity = Number(item.quantity);

      total += cost * quantity;
    });

    return total.toFixed(2);
  }

  function calculateTaxAndTotals(cart) {
    let subtotal = 0;
    let tax;
    let total;
  
    cart.forEach(item => {
      let quantity = Number(item.quantity);
      let cost = Number(item.cost);
  
      subtotal += quantity * cost;
    });
  
    tax = subtotal * SEATTLE_SALES_TAX_RATE;
    total = subtotal + tax;
  
    return {subtotal, tax, total};
  };

  // helpers

  function findIndex(arr, id) {
    return arr.findIndex(item => item.id === id);
  }

  function flattenMenu(menuCopy) {
    let flatter = menuCopy.map(section => section.data);
    return flatter.flat();
  }


  return {
    cart,
    setCart,
    deleteItem,
    editItem,
    addItem,
    findIndex,
    cartTotal,
    calculateTaxAndTotals
  };
};

export default useCart;
