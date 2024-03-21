"use client";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import NavButton from "./navButton";
import { useRouter } from "next/navigation";
import useLoginAPI from "../../hooks/useLoginAPI";

export default function AuthorizedMerchantsHeader({takingOrders, setTakingOrders}) {
  const {logout, currentMerchant} = useLoginAPI();
  const router = useRouter();
  let toggleButton = () => {
    setTakingOrders(!takingOrders);
  };

  let handleLogOut = async (e) => {
    e.preventDefault();
    try {
      let success = await logout(currentMerchant.id);
      alert(success.message);
      router.push(e.target.href);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <header className='shadow-lg'>
      {/* Restaurant Logo and the Restaurnat name - not hardcoded */}
      <h1 className="lg:text-[5rem] md:text-[3rem]">The Red Table</h1> 
      <nav className="sm:w-[10%]">
        <Link
          className={takingOrders ? "toggle-button active-orders" : "toggle-button suspended-orders"}
          href={'/orders'}
          onClick={toggleButton}
        >{takingOrders ? 'Suspend Orders': 'Take Orders'}</Link>
        <NavButton type="orders" href="/orders" />
        <Link 
          className="link" 
          href="/"
          onClick={handleLogOut}
        >
          Log Out
        </Link>
        <Link 
          className="profile-link m-[1rem]" 
          href="/profile"
        >
          <CgProfile className="profile-icon" />
        </Link>
      </nav>
    </header>
  )
}