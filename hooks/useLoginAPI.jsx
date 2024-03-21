"use client";
import React, {useContext} from 'react';
import {LoginContext} from '../contexts/LoginContext';
import getCopy from '../app/lib/utils/getCopy';

import useMerchantAPI from './useMerchantAPI';
// import useSession from './useSession';

const loginURL = process.env.NEXT_PUBLIC_HOST_URL + '/api/login/';
const logoutURL = process.env.NEXT_PUBLIC_HOST_URL + '/api/logout/';

const useLoginAPI = () => {
  const {
    defaultCredentials,
    defaultMerchant,
    credentials,
    setCredentials,
    loggedIn,
    setLoggedIn,
    currentMerchant,
    setCurrentMerchant,
  } = useContext(LoginContext);

  const {merchants} = useMerchantAPI();
  // const {createNewSession, encodeSessionId} = useSession();

  // API methods
  async function logoutAPI(merchantId) {
    // let sessionID = encodeSessionId(merchantId);

    // let cookie = `connect.sid=${sessionID}`;
    let requestObject = {
      method: 'POST',
      credentials: "include",
      headers: {
        // Cookie: cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      let response = await fetch(logoutURL + merchantId, requestObject);
      let json = await response.json();
      if (response.status !== 200) {
        throw new Error(json.error);
      }

      return json;
    } catch (e) {
      console.log(e.message + ' (at useLogin.logout)');
      throw new Error(e.message);
    }
  }

  async function loginAPI(credentials) {
    let requestObject = {
      method: 'POST',
      credentials: "include",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    };

    try {
      let response = await fetch(loginURL, requestObject);
      let json = await response.json();

      if (response.status === 400) {
        throw new Error(json.error);
      }

      // createNewSession(document.cookie);
      alert(json.message);
    } catch (e) {
      console.log(e.message + ' (at useLogin.loginAPI)');
      throw new Error(e.message);
    }
  }

  async function login() {
    try {
      await loginAPI(credentials);
      setCurrentMerchant(getMerchantByEmail(credentials.email));
      toggleLogin();
    } catch (e) {
      console.log(e.message + ' (at useLogin.login)');
      throw new Error(e.message);
    }
  }

  async function logout(merchantId) {
    try {
      let response = await logoutAPI(merchantId);

      // reset cookie as well
      setCurrentMerchant(defaultMerchant);
      toggleLogout();
      return response;
    } catch (e) {
      console.log(e.message + ' (at useLogin.logout)');
      throw new Error(e.message);
    }
  }

  // helper functions

  function getMerchantByEmail(email) {
    return merchants.filter(merchant => {
      return merchant.email === email;
    })[0];
  }

  function toggleLogout() {
    toggleLogin();
  }

  function toggleLogin() {
    setLoggedIn(!loggedIn);
  }

  function resetFields(field) {
    let credentialsCopy = getCopy(credentials);

    switch(field) {
      case("email"):
        credentialsCopy.email = '';
        setCredentials(credentialsCopy);
        break;  
      default:
        setCredentials(defaultCredentials);
        break;
    }
  }

  function updateCredentials(field, text) {
    let copy = getCopy(credentials);
    copy[field] = text;
    setCredentials(copy);
  }

  return {
    login,
    logout,
    toggleLogout,
    toggleLogin,
    credentials,
    updateCredentials,
    currentMerchant,
    setCurrentMerchant,
    loggedIn,
    resetFields,
  };
};

export default useLoginAPI;
