/* eslint-disable react/no-unescaped-entities*/
"use client";
import React from 'react';
import Link from 'next/link';
import BULLET_POINT from '../../lib/utils/bulletPoint';
import { useRouter } from 'next/navigation';

import useLoginAPI from '../../../hooks/useLoginAPI';
import useOauthAPI from '../../../hooks/useOauthAPI';

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
    <div className='flex flex-1 justify-end'>
      <Link
        className='link'
        onClick={handleAuthorization}
        href="/orders"
        >
        Grant Access to OrderWeasel
      </Link>
    </div>
  );
}

export default function Oauth(){
  return (
    <main>
      <section>
        <h2>OAuth</h2>
        <div className='flex flex-col p-4'>
          <p className='flex-1 p-2'>
            {BULLET_POINT} Granting access to your Square Merchant account
            allows OrderWeasel to access your existing menu from Square so you
            don't have to manually input each item yourself
          </p>
          <p className='flex-1 p-2'>
            {BULLET_POINT} At this time we don't provide an option for manual menu entry, so you won't be able to use our services if the option to grant access is declined. Sorry for any inconvenience!
          </p>
          <p className='flex-1 p-2'>
            {BULLET_POINT} When you open the link, your browser may prevent the square authorization webpage from opening in a new window. Please accept popups if this happens. 
          </p>
          <OAuthButton />
        </div>
      </section>
    </main>
  );
}
