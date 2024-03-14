"use client";
import React, {useContext} from 'react';
import {LoginContext} from '../contexts/LoginContext';

// import useMerchant from './useMerchant';
import useSessions from './useSessions';

const loginURL = process.env.HOST_URL + '/api/login/';
const logoutURL = process.env.HOST_URL + '/api/logout/';

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

  // const {merchants} = useMerchant();
  const {createNewSession, encodeSessionId} = useSessions();

  // API methods
  async function logoutAPI(merchantId) {
    let sessionID = encodeSessionId();
    let cookie = `connect.sid=${sessionID}`;
    let requestObject = {
      method: 'POST',
      headers: {
        Cookie: cookie,
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

      createNewSession(response);
      alert(json.message);
    } catch (e) {
      console.log(e.message + ' (at useLogin.loginAPI)');
      throw new Error(e.message);
    }
  }

  async function login() {
    try {
      await loginAPI(credentials);

      // we're setting the current merchant on login because we call getMerchants
        // in SignInTab, so the merchants are set
      setCurrentMerchant(getMerchantByEmail(credentials.email));

      // after login, we should then get the new merchant and set as current merchant
       // rather than calling getMerchants

      toggleLogin();
    } catch (e) {
      console.log(e.message + ' (at useLogin.login)');
      throw new Error(e.message);
    }
  }

  async function logout(merchantId) {
    try {
      let response = await logoutAPI(merchantId);
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

  function resetFields() {
    setCredentials(defaultCredentials);
  }

  function updateCredentials(field, text) {
    let copy = getCopy(credentials);
    copy[field] = text;
    setCredentials(copy);
  }

  function getCopy(collection) {
    return JSON.parse(JSON.stringify(collection));
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
