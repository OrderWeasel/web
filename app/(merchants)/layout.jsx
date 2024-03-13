import Link from 'next/link';
import NavButton from '../ui/navButton';
import Image from 'next/image';

export default function MerchantsLayout({ children }) {
  return (
    <>
      <header>
        <img src="/order_weasel.jpg" alt="The order weasel" />
        <Link className="header-link" href="/">
          <h1>OrderWeasel</h1>
        </Link>
        <nav>
          <NavButton type="signup" href="/merchant/signup"/>
          <NavButton type="login" href="/merchant/login"/>
        </nav>
      </header>
      {children}
    </>
  );
}