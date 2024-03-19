"use client";
import React, {useContext} from 'react';
import {LoginContext} from '../contexts/LoginContext';
import getCopy from '../app/lib/utils/getCopy';

import useMerchantAPI from './useMerchantAPI';
import useSession from './useSession';

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
  const {createNewSession, encodeSessionId} = useSession();

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

      debugger;
      if (response.status === 400) {
        throw new Error(json.error);
      }

      // no response headers???
      // createNewSession(response);
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
