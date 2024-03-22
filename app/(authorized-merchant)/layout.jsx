"use client";
import React from 'react';
import AuthorizedMerchantsHeader from '../ui/authorizedMerchantHeader';
import useOrders from '../../hooks/useOrders';
import { OauthProvider } from '../../contexts/OauthContext';

export default function AuthorizedLayout({children}){
  const {takingOrders, setTakingOrders} = useOrders();

  return (
    <OauthProvider>
      <AuthorizedMerchantsHeader takingOrders={takingOrders} setTakingOrders={setTakingOrders}/>
      {children}
    </OauthProvider>
  );
}
