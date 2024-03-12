import {koulen} from '@/app/styles/fonts';
import "@/app/globals.css";
// import HomeNavBar from './ui/homeNavBar';
import NavButton from './ui/navButton';
import Link from 'next/link';

// context providers will go here and nothin else?

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={koulen.className}>
        <header>
          <img src="/order_weasel.jpg" alt="The order weasel" />
          <Link className="header-link" href="/">
            <h1>OrderWeasel</h1>
          </Link>
          <nav>
            <NavButton type="customer" href="/customer"/>
            <NavButton type="merchant" href="/merchant"/>
            <NavButton type="login" href="/merchant/login"/>
          </nav>
        </header>
        {children}
        <footer>
          <nav>
            <Link className='footer-link' href="/contact">Contact Us</Link>
            <Link className='footer-link' href="/terms">Terms of Use</Link>
            <Link className='footer-link' href="https://github.com/OrderWeasel">GitHub</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
