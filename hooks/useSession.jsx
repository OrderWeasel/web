"use client";
import React, {useContext} from 'react';
import {SessionContext} from '../contexts/SessionContext';

const useSession = () => {
  const {sessionID, setSessionID} = useContext(SessionContext);

  function decodeAndFormatCookie(cookie) {
    let encodedSessionInfo = cookie.split(';')[0];
    let [_name, sessionId] = encodedSessionInfo.split('=');

    return decodeURIComponent(sessionId);
  }

  function encodeSessionId() {
    return encodeURIComponent(sessionID);
  }

  function createNewSession(response) {
    let sessionId = decodeAndFormatCookie(response.headers.get('set-cookie'));
    setSessionID(sessionId);
  }

  return {
    createNewSession,
    encodeSessionId,
  };
};

export default useSession;
