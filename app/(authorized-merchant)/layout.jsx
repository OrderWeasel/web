"use client";
import React, {useState} from 'react';
import AuthorizedMerchantsHeader from '../ui/authorizedMerchantHeader';
import useOrders from '../../hooks/useOrders';

export default function AuthorizedLayout({children}){
  const {takingOrders, setTakingOrders} = useOrders();

  return (

    <>
      <AuthorizedMerchantsHeader takingOrders={takingOrders} setTakingOrders={setTakingOrders}/>
      {children}
    </>
  );
}