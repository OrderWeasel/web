"use client";
import React from 'react';
import {createContext, useState, useEffect} from 'react';

const OrdersContext = createContext(null);

const OrdersProvider = props => {
  const [takingOrders, setTakingOrders] = useState(false);
  const [orders, setOrders] = useState({
    new: [],
    open: [],
    complete: [],
  });

  // load orders from database
  useEffect(() => {
    //       console.log(orders, "orders in OrdersContext");
  }, [orders]);

  return (
    <OrdersContext.Provider
      value={{
        takingOrders,
        setTakingOrders,
        orders,
        setOrders,
      }}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export {OrdersContext, OrdersProvider};
