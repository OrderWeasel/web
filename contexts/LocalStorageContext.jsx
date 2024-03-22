"use client";
import React, {createContext, useState, useEffect} from 'react';
const LocalStorageContext = createContext(null);

let defaultCookies = {"anonymous": []};

const LocalStorageProvider = props => {
  // const [carts, setCarts] = useState([]); // users // anyone who uses the same browser on the same computer has access to the same cart data
  const [cookies, setCookies] = useState(defaultCookies); // merchants // {anonymous: cookies, userID: cookies} 
  const [authMerchant, setAuthMerchant] = useState({});
  
  useEffect(() => {
    // console.log(JSON.stringify(cookies) + " (cookies at LocalStorageProvider)");
  }, [cookies]);

  useEffect(() => {
    // console.log(JSON.stringify(authMerchant) + " (authorizedMerchant at LocalStorageProvider)");
  });

  return (
    <LocalStorageContext.Provider value={{cookies, setCookies, authMerchant, setAuthMerchant}}>
      {props.children}
    </LocalStorageContext.Provider>
  );
};

export {LocalStorageContext, LocalStorageProvider};
