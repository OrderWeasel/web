import Link from "next/link";
import NavButton from "./navButton";
import Image from "next/image";

export default function MerchantsHeader() {
  return (
  <header>
  <img src="/order_weasel.jpg" alt="The order weasel" />
  <Link className="header-link" href="/">
    <h1>OrderWeasel</h1>
  </Link>
  <nav>
    <NavButton type="login" href="/merchant/login"/>
  </nav>
  </header>
  );
}