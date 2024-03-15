"use client";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import NavButton from "./navButton";

export default function AuthorizedMerchantsHeader({takingOrders, setTakingOrders}) {
  let toggleButton = () => {
    setTakingOrders(!takingOrders);
  };

  return (
    <header className='shadow-lg'>
      {/* Restaurant Logo and the Restaurnat name - not hardcoded */}
      <h1 className="lg:text-[5rem] md:text-[3rem]">The Red Table</h1> 
      <nav>
        <Link
          className={takingOrders ? "toggle-button active-orders" : "toggle-button suspended-orders"}
          href={'/orders'}
          onClick={toggleButton}
        >{takingOrders ? 'Suspend Orders': 'Take Orders'}</Link>
        <NavButton type="signOut" href="/"/ >
        <Link className="profile-link m-[1rem]" href="/profile">
          <CgProfile className="profile-icon" />
        </Link>
      </nav>
    </header>
  )
}