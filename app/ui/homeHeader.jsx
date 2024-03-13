import NavButton from './navButton';
import Link from 'next/link';

function HomeHeader() {
  return (
    <header>
      <img src="/order_weasel.jpg" alt="The order weasel" />
      <Link className="header-link" href="/">
        <h1>OrderWeasel</h1>
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
