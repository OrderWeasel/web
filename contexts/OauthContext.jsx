"use client";
import React from 'react';
import {createContext, useState, useEffect} from 'react';

const OauthContext = createContext(null);

const OauthProvider = props => {
	const [merchantID, setMerchantID] = useState(null);

  useEffect(() => {}, [merchantID]);

  return (
    <OauthContext.Provider value={[merchantID, setMerchantID]}>
      {props.children}
    </OauthContext.Provider>
  );
};

export {OauthContext, OauthProvider};
