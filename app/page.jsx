"use client";
// import styles from '@/app/ui/Home.module.css';
// import { headers } from 'next/headers';
import Image from "next/image";
import BULLET_POINT from './ui/bulletPoint';
import NavButton from "./ui/navButton";
import HomeHeader from './ui/homeHeader';

export default function Home() {
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
