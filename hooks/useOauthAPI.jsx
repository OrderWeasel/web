"use client";
import React, {useContext} from 'react';
import { OauthContext } from '../contexts/OauthContext';
import useSession from './useSession';

const oauthURL = process.env.HOST_URL + '/api/connect-square/geturl/';

const useOauthAPI = () => {
	const [merchantID, setMerchantID] = useContext(OauthContext);
  const {createNewSession, encodeSessionId} = useSession();

  async function oauth(authorizationUrl) {
// 		let encodedURL = encodeURIComponent(authorizationUrl);
// 			let response = await fetch(authorizationUrl);
// 			if (!response.ok) {
// 				throw new Error("Something went wrong")
// 			}

		try {
			console.log('Fetching oauth at: ' + authorizationUrl);
			const supported = await Linking.canOpenURL(authorizationUrl);

			if (supported) {
				await Linking.openURL(authorizationUrl);
			} else {
				throw new Error('Cannot open URL: ' + authorizationUrl);
			}
		} catch (error) {
			throw new Error(error.message);
		}
  }

  async function getAuthURL() {
    let sessionID = encodeSessionId();
    let cookie = `connect.sid=${sessionID}`;
    let requestObject = {
      method: 'GET',
      headers: {
        Cookie: cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    try {
			let response = await fetch(oauthURL + merchantID, requestObject);
			let json = response.json();
			return json;
    } catch (error) {
			throw new Error(error.message);
    }
  }

	return {
		getAuthURL,
		oauth,
		setMerchantID,
	};
};

export default useOauthAPI;
