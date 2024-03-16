"use client";
import {useContext} from 'react';
import {OrdersContext} from '../contexts/OrdersContext';
import orderData from '../app/lib/seedData/orderData';
import getCopy from '../app/lib/utils/getCopy';

const useOrders = () => {
  const {
    takingOrders,
    setTakingOrders,
    orders,
    setOrders,
    statuses,
    setStatuses,
  } = useContext(OrdersContext);

  // orders should be loaded from the database
  // orders are fetched on get
  // they are sorted
  // when we update an order, we PATH the status
  // We then get the orders
  // they are sorted
  // and the page rerenders

  async function getOrders() {
    try {
      // should make async call to get the orders here
      let unsortedOrders = orderData;
      // then sort the orders based on status
      sortOrders(unsortedOrders);
    } catch (e) {
      console.log(e.message, 'at getOrders');
    }
  }

  // sort the orders by status
  function sortOrders(unsortedOrders) {
    let orders = {
      new: [],
      open: [],
      complete: [],
    };

    unsortedOrders.forEach(order => {
      switch (order.status) {
        case 'new':
          orders.new.push(order);
          break;
        case 'open':
          orders.open.push(order);
          break;
        case 'complete':
          orders.complete.push(order);
          break;
        default:
          let _exhaustiveCheck = JSON.stringify(order.status);
          throw new Error(`Invalid status: ${_exhaustiveCheck}`);
      }

      setOrders(orders);
    });
  }

  // ***** should be an asynchronous PATCH call to change status on the server
  // set the status of the id to the new status
  // update the orders array
  // sortOrders using orders into respective arrays

  // find the order
  // set the order status to the new status
  // use an async call to update the order status

  // extremely rough example
  function updateOrderStatus(id, status) {
    // take orders object and join all three arrays;
    // find order
    // change status
    // sort

    let ordersCopy = orders.new.concat(orders.open).concat(orders.complete);
    let order = ordersCopy.find(order => order.id === id);

    if (!order) {
      throw new Error('Something is wrong. Item not found');
    }

    order.status = status;

    // clear orders before sorting again?
    setOrders({new: [], open: [], complete: []});
    sortOrders(ordersCopy);
  }

  async function createOrder(resId, cart) {
    try {
      // use email, full_name and phone to create user
      // create order using cart

      console.log(`Create order for restaurant #${resId}`);
      console.log(`Cart Contents: ${JSON.stringify(cart)}`);
    } catch (e) {
      throw new Error(e.message, 'at createOrder');
    }
  }

  return {
    takingOrders,
    setTakingOrders,
    orders,
    getOrders,
    createOrder,
    updateOrderStatus,
  };
};

export default useOrders;
