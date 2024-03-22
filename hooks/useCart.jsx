"use client";
import {useContext} from 'react';
import {CartContext} from '../contexts/CartContext';
import useLocalStorage from './useLocalStorage';
import useMerchantData from './useMerchantData';
import getCopy from '../app/lib/utils/getCopy';

// hardcoded tax rate for Seattle
// should be able to get tax rates dynamically based on location 
import { SEATTLE_SALES_TAX_RATE } from '../app/lib/utils/taxRates';


// menu either comes from context or as an argument at invocation
const useCart = () => {
  const [cart, setCart] = useContext(CartContext);
  const {updateCart} = useLocalStorage();
  const {merchantId, menuData} = useMerchantData();

  function addItem(itemId, quantity) {
    if (quantity === '0') {
      return;
    }
    let cartCopy = getCopy(cart);
    let menuCopy = getCopy(menuData);
    menuCopy = flattenMenu(menuCopy);
    let index = findIndex(menuCopy, itemId);

    if (index === -1) {
      throw new Error("Cannot find item for itemId (addItem at useCart)");
    }

    let item = menuCopy[index];
    item.quantity = String(quantity);
    cartCopy.push(item);

    updateCart(merchantId, cartCopy);
    setCart(cartCopy);
  }

  function deleteItem(itemId) {
    let cartCopy = getCopy(cart);
    let index = findIndex(cart, Number(itemId));
    cartCopy = cartCopy.filter((_el, idx) => {
      return index !== idx;
    });


    // debugger; // start here
    updateCart(merchantId, cartCopy);
    setCart(cartCopy);
  }

  function editItem(itemId, quantity) {
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

  // helpers

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

  function findIndex(arr, id) {
    return arr.findIndex(item => item.id === id);
  }

  function flattenMenu(menuCopy) {
    let flatter = menuCopy.map(section => section.data);
    return flatter.flat();
  }

  // handlers
  let handleDelete = (e, itemId) => {
    e.stopPropagation();
    deleteItem(itemId);
  };

  return {
    cart,
    setCart,
    addItem,
    editItem,
    findIndex,
    cartTotal,
    deleteItem,
    handleDelete,
    calculateTaxAndTotals,
  };
};

export default useCart;
