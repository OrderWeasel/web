/* eslint-disable react/no-unescaped-entities*/
"use client";
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import BULLET_POINT from '../../../../lib/utils/bulletPoint';
import { useRouter } from 'next/navigation';

import useSignUpAPI from '../../../../../hooks/useSignUpAPI';
import useLoginAPI from '../../../../../hooks/useLoginAPI';
import useOauthAPI from '../../../../../hooks/useOauthAPI';
import useSession from '../../../../../hooks/useSession';

function OAuthButton() {
  const {currentMerchant} = useLoginAPI();
  const {oauth, getAuthURL} = useOauthAPI();
  const router = useRouter();

  let handleAuthorization = async (e, href) => {
    e.preventDefault();

    try {
      let response = await getAuthURL(currentMerchant.id);
      await oauth(response.url);
      router.push(href);
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Link
      href="/orders"
      onClick={handleAuthorization}
    >
      Grant Access to OrderWeasel
    </Link>
  );
}


export default function Oauth(){
    // const {newMerchant, updateNewMerchant} = useSignUpAPI();

// 	// at this point, we'll be signedUp and logged in
// 		// on load of this component, request the url
// 			// requires merchant id in the query params
// 		// the handler for onPress should then follow that link
// 		// the merchant will authorize access  to square
// 		// the backend obtains the access token and refresh token
// 			// and updates the merchant

  return (
    <main>
      <section>
        <h2>OAuth</h2>
        <p>
          {BULLET_POINT} Granting access to your Square Merchant account
          allows OrderWeasel to access your existing menu from Square so you
          don't have to manually input each item yourself
        </p>
        <OAuthButton navigation={navigation} />
      </section>
    </main>
  );
}
