/* eslint-disable react/no-unescaped-entities*/
"use client";
import React, {useEffect} from "react";
import Image from "next/image";
import BULLET_POINT from './lib/utils/bulletPoint';
import NavButton from "./ui/navButton";
import HomeHeader from './ui/homeHeader';

import useSession from "../hooks/useSession";
import useMerchantAPI from "../hooks/useMerchantAPI";

export default function Home() {
  const {createNewSession} = useSession();
  const {getMerchants} = useMerchantAPI();
  // const {usePushNotifications, setDeviceUUID} = usePush();

  useEffect(() => {
    (async function () {
      try {
        // if (usePushNotifications) {
        //   await setDeviceUUID();
        // }

        // returns cookie
        await getMerchants(); 
        
        // create session for anonymous user from cookie (document.cookie)
        // createNewSession();
      } catch (e) {
        console.log(e.message + ' (at WelcomeScreen)');
        alert(e.message);
      }
    })();
  }, []); // eslint-disable-line

  return (
    <>
      <HomeHeader />
      <main>
        <article>
          <h2>How it Works</h2>
          <section>
            <h3>Customers</h3>
            <p>
              {BULLET_POINT} Customers, select from any one of our participating merchants. Simply place your order and pay upon arrival
            </p>
            <NavButton type={'customer'} href={'/restaurants'}/>
          </section>
          <section>
            <h3>Merchants</h3>
            <p>
              {BULLET_POINT} Have a restaurant? Sign up, authorize access to your menu via square integration and let us do the rest
            </p>
            <p>
              {BULLET_POINT} Our services are completely free. We don't charge a convenience fee on top of the standard processing fee required by your POS provider (only accepting square POS at this time)
            </p>
            <NavButton type={'merchant'} href={'/merchant'}/>
          </section>
        </article>
      </main>
    </>
  );
}
