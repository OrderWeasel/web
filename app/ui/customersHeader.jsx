import Link from 'next/link';
import NavButton from '../ui/navButton';
import Image from 'next/image';

export default function CustomersHeader() {
  return (
    <header>
      <img src="/order_weasel.jpg" alt="The order weasel" />
      <Link className="header-link" href="/">
        <h1>OrderWeasel</h1>
      </Link>
      <nav>
        <NavButton type="cart" href="/restaurants/restaurant/cart"/>
      </nav>
    </header>
  );
}
