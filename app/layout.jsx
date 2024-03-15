import {koulen} from '@/app/styles/fonts';
import "@/app/globals.css";
import Link from 'next/link';

// context providers
import { SignUpProvider } from '../contexts/SignUpContext';
import { LoginProvider } from '../contexts/LoginContext';
import { SessionProvider } from '../contexts/SessionContext';
import { MerchantProvider } from '../contexts/MerchantContext';
import { LocalStorageProvider } from '../contexts/LocalStorageContext';
import { OrdersProvider } from '../contexts/OrdersContext';

// context providers will go here with html, body, and nothing else
  // add pathway specific layouts in groups containing headers
    // use the headers below in page.jsx
    // what about the footer?

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <MerchantProvider>
        <OrdersProvider>
          <LoginProvider>
            <SignUpProvider>
              <LocalStorageProvider>
                <html lang="en">
                  <body className={koulen.className}>
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
              </LocalStorageProvider>
            </SignUpProvider>
          </LoginProvider>
        </OrdersProvider>
      </MerchantProvider>
    </SessionProvider>
  );
}
