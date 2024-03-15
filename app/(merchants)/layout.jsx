import Link from 'next/link';
import NavButton from '../ui/navButton';
import Image from 'next/image';

// I would like to grey out the merchant home button if the current page is /merchant

export default function MerchantsLayout({ children }) {

  return (
    <>
      <header>
        <Image src="/order_weasel.jpg" alt="The order weasel" width={100} height={100}/>
        <Link className="header-link" href="/">
          <h1 className="lg:text-[5rem] md:text-[3rem]">OrderWeasel</h1>
        </Link>
        <nav>
          <NavButton type="merchantHome" href="/merchant"/>
          <NavButton type="signup" href="/merchant/signup"/>
          <NavButton type="login" href="/merchant/login"/>
        </nav>
      </header>
      {children}
    </>
  );
}
