"use client";
import React, {useState} from 'react';
import AuthorizedMerchantsHeader from '../ui/authorizedMerchantHeader';
import useOrders from '../../hooks/useOrders';

export default function AuthorizedLayout({children}){
  // this should come from useOrders which will be toggled from the orders page
  // const [takingOrders, setTakingOrders] = useState(false)
  const {takingOrders, setTakingOrders} = useOrders();

  return (

    <>
      <AuthorizedMerchantsHeader takingOrders={takingOrders} setTakingOrders={setTakingOrders}/>
      {children}
    </>
  );
}