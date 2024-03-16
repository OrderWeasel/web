import Link from 'next/link';
import Image from 'next/image';
import NavButton from '../ui/navButton';

export default function CustomersHeader() {
  return (
    <header>
      <Image src="/order_weasel.jpg" alt="The Order Weasel" width={100} height={100} />
      <Link className="header-link" href="/">
        <h1 className="lg:text-[5rem] md:text-[3rem]">OrderWeasel</h1>
      </Link>
      <nav>
        <NavButton type="cart" href="/restaurants/restaurant/cart"/>
      </nav>
    </header>
  );
}
