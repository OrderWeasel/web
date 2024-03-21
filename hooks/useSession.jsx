"use client";
import React, {useContext} from 'react';
import { SessionContext } from '../contexts/SessionContext';
import useLocalStorage from './useLocalStorage';

const useSession = () => {
  const {sessionID, setSessionID} = useContext(SessionContext);
  const {cookies, addCookie, removeCookie, getCookie} = useLocalStorage();

  function decodeAndFormatCookie(cookie) {
    let encodedSessionInfo = cookie.split(';')[0];
    let [_name, sessionId] = encodedSessionInfo.split('=');

    return decodeURIComponent(sessionId);
  }

  function encodeSessionId(merchantId) {
    // let cookie = getCookie(merchantId); // not working ---------------------

    // return encodeURIComponent(cookie);
    return encodeURIComponent(sessionID);
  }


  // not working when given merchantId ---------------------------------
  function createNewSession(merchantId) {    
    let cookie = decodeAndFormatCookie(document.cookie);

    debugger;

    // if (merchantId) {
    //   addCookie(merchantId, cookie);
    //   removeCookie(); // remove anonymous cookie by default
    // } else {
    //   addCookie("anonymous", cookie);
    // }

    // are we setting the new cookie correctly after signup?

    setSessionID(cookie);
  } 

  return {
    encodeSessionId,
    sessionID,
    createNewSession
  };
};

export default useSession;
