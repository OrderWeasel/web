import Link from 'next/link';
import Image from 'next/image';
import NavButton from '../ui/navButton';

// I would like to gray out the Back to restaurants button if the current page is /restaurants

export default function CustomersLayout({ children }) {
  return (
    <>
      <header className='shadow-lg'>
        <Image src="/order_weasel.jpg"  alt="The order weasel" width={100} height={100}/>
        <Link className="header-link" href="/">
          <h1 className="lg:text-[5rem] md:text-[3rem]">OrderWeasel</h1>
        </Link>
        <nav>
          <NavButton type="restaurants" href="/restaurants" />;
        </nav>
      </header>
      {children}
    </>
  );
}