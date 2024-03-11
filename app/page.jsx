import styles from '@/app/ui/Home.module.css';
import { headers } from 'next/headers';
import Image from "next/image";
import BULLET_POINT from './ui/bulletPoint';

export default function Home() {
  return (
    <>
      <header>
        <img src="/order_weasel.jpg" alt="The order weasel" />
        <h1>OrderWeasel</h1>
        <nav>
          <button>Log in</button>
          <button>Have a Restaurant?</button>
          <button>Find a Place to Eat</button>
        </nav>
      </header>
      <main>
        <article>
          <h2>How it Works</h2>
          <section>
            <h3>Customers</h3>
            <p>
              {BULLET_POINT} Customers, select from any one of our participating merchants. Simply place your order and pay upon arrival
            </p>
            <button>Find a place to eat</button>
          </section>
          <section>
            <h3>Merchants</h3>
            <p>
              {BULLET_POINT} Have a restaurant? Sign up, authorize access to your menu via square integration and let us do the rest
            </p>
            <p>
              {BULLET_POINT} Our services are completely free. We don't charge a convenience fee on top of the standard processing fee required by your POS provider (only accepting square POS at this time)
            </p>
            <button>Have a restaurant?</button>
          </section>
        </article>
      </main>
      <footer>
        <nav>
          <a href=""></a>
          <a href=""></a>
          <a href=""></a>
        </nav>
      </footer>
    </>
  );
}
