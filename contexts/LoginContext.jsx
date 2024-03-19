"use client";
import React from 'react';
import {createContext, useState, useEffect} from 'react';
const LoginContext = createContext(null);

const defaultMerchant = {
  id: '',
  email: '',
  password: '',
  restaurant_name: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
};

const defaultCredentials = {
  email: '',
  password: '',
};

const LoginProvider = props => {
  const [credentials, setCredentials] = useState(defaultCredentials);

  const [loggedIn, setLoggedIn] = useState(false);

  // should use the id we use to get and set account information
  // set the current user before resetting the fields (which resets credentials)
  // we use the currentMerchant to get and update the information from the merchant profile page
  const [currentMerchant, setCurrentMerchant] = useState(defaultMerchant);

  useEffect(() => {
    //     console.log(loggedIn);
  }, [loggedIn]);

  useEffect(() => {
//         console.log(currentMerchant + "(at LoginContext)");
  }, [currentMerchant]);

  useEffect(() => {
    // console.log(JSON.stringify(credentials) + " (at LoginContext)");
  }, [credentials]);

  return (
    <LoginContext.Provider
      value={{
        defaultCredentials,
        defaultMerchant,
        credentials,
        setCredentials,
        loggedIn,
        setLoggedIn,
        currentMerchant,
        setCurrentMerchant,
      }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export {LoginContext, LoginProvider};
