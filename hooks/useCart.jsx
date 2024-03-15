"use client";
import {useContext} from 'react';
import {CartContext} from '../contexts/CartContext';
import useLocalStorage from './useLocalStorage';

// import useResData from '../hooks/useResData';

// menu either comes from context or as an argument at invocation
const useCart = () => {
  const [cart, setCart] = useContext(CartContext);
  const {updateCart} = useLocalStorage();
  // const {resId, menu} = useResData();

  function findIndex(arr, id) {
    return arr.findIndex(item => item.id === id);
  }

  function flattenMenu(menuCopy) {
    let flatter = menuCopy.map(section => section.data);
    return flatter.flat();
  }

  //   function addItem(id) {
  function addItem(id, quantity) {
    if (quantity === '0') {
      return;
    }

    let cartCopy = getCopy(cart);
    let menuCopy = getCopy(menu);
    menuCopy = flattenMenu(menuCopy);
    let index = findIndex(menuCopy, id);
    let item = menuCopy[index];
    item.quantity = String(quantity);
    cartCopy.push(item);

    updateCart(resId, cartCopy);

    setCart(cartCopy);
  }

  function deleteItem(id) {
    let cartCopy = getCopy(cart);
    let index = findIndex(cart, id);
    cartCopy = cartCopy.filter((el, idx) => {
      return index !== idx;
    });

    updateCart(resId, cartCopy);

    setCart(cartCopy);
  }

  function editItem(id, quantity) {
    // won't be necessary after we figure out how to reset modal state
    if (quantity === '0') {
      return;
    }

    let cartCopy = getCopy(cart);
    let index = findIndex(cart, id);
    let item = cartCopy[index];
    item.quantity = String(quantity);

    updateCart(resId, cartCopy);

    setCart(cartCopy);
  }

  function getCopy(collection) {
    return JSON.parse(JSON.stringify(collection));
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

  return {
    cart,
    setCart,
    deleteItem,
    editItem,
    addItem,
    findIndex,
    getCopy,
    cartTotal,
  };
};

export default useCart;
