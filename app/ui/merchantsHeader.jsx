import Link from "next/link";
import NavButton from "./navButton";
import Image from "next/image";

export default function MerchantsHeader() {
  return (
    <header>
    <Image src="/order_weasel.jpg" alt="The Order Weasel" width={100} height={100} />
    <Link className="header-link" href="/">
      <h1 className="lg:text-[5rem] md:text-[3rem]">OrderWeasel</h1>
    </Link>
    <nav>
      <NavButton type="login" href="/merchant/login"/>
    </nav>
    </header>
  );
}
