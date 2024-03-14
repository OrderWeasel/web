"use client";
import React from 'react';
import {createContext, useState, useEffect} from 'react';

const MerchantContext = createContext(null);

const defaultEmail = {
  email: '',
};

const defaultPassword = {
  password: '',
};

const defaultStoreInfo = {
  restaurant_name: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zip: '',
};

const MerchantProvider = props => {
  const [merchants, setMerchants] = useState([]);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [storeInfo, setStoreInfo] = useState(defaultStoreInfo);

  useEffect(() => {
//             console.log(merchants, " from MerchantContext");
  }, [merchants]);

  useEffect(() => {
    //       console.log(password, "password");
    //       console.log(email, "email");
    //     console.log(storeInfo, "storeInfo");
  }, [password, email, storeInfo]);

  return (
    <MerchantContext.Provider
      value={{
        merchants,
        setMerchants,
        email,
        setEmail,
        password,
        setPassword,
        storeInfo,
        setStoreInfo,
        defaultEmail,
        defaultPassword,
        defaultStoreInfo,
      }}>
      {props.children}
    </MerchantContext.Provider>
  );
};

export {MerchantContext, MerchantProvider};
