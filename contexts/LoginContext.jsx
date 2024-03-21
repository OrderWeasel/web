"use client";
import React from 'react';
import {createContext, useState, useEffect} from 'react';
const LoginContext = createContext(null);
import useLocalStorage from '../hooks/useLocalStorage';

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
  const {setAuthorizedMerchant} = useLocalStorage(); 
  const [credentials, setCredentials] = useState(defaultCredentials);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentMerchant, setCurrentMerchant] = useState(defaultMerchant);

  useEffect(() => {
    // console.log(loggedIn);  
  }, [loggedIn]);

  useEffect(() => {
    // console.log(JSON.stringify(currentMerchant) + "(currentMerchant at LoginContext)");
    // when current merchant changes, we should set the current merchant in local storage to avoid losing data on refresh
    // then we should load the data from local storage whenever we normally use the data to fill forms, or for layout purposes
    
    setAuthorizedMerchant(currentMerchant);
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
