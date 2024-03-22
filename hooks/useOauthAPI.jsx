"use client";
import React, {useContext} from 'react';
import { OauthContext } from '../contexts/OauthContext';
import { openLinkInCurrentWindow, openLinkInNewWindow } from '../app/lib/utils/openLink';
const oauthURL = process.env.NEXT_PUBLIC_HOST_URL + '/api/connect-square/geturl/';

const useOauthAPI = () => {
	const [merchantID, setMerchantID] = useContext(OauthContext);

  async function oauth(authorizationUrl) {
		try {
			console.log('Fetching oauth at: ' + authorizationUrl);
      openLinkInNewWindow(authorizationUrl);
      // openLinkInCurrentWindow(authorizationUrl);
    } catch (error) {
			throw new Error(error.message);
		}
  }

  async function getAuthURL(merchantId) {
    let requestObject = {
      method: 'GET',
      credentials: "include",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    try {
      let response = await fetch(oauthURL + merchantId, requestObject);
			let json = await response.json();

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
