import NavButton from './navButton';
import Link from 'next/link';
import Image from 'next/image';

function HomeHeader() {
  return (
    <header>
      <Image src="/order_weasel.jpg" alt="The order weasel" width={100} height={100} />
      <Link className="header-link" href="/">
        <h1 className="lg:text-[5rem] md:text-[3rem]">OrderWeasel</h1>
      </Link>
      <nav>
        <NavButton type="customer" href="/restaurants"/>
        <NavButton type="merchant" href="/merchant"/>
        <NavButton type="login" href="/merchant/login"/>
      </nav>
    </header>
  );
}

export default HomeHeader;
