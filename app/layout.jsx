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
import { OauthProvider } from '../contexts/OauthContext';

export default function RootLayout({ children }) {
  return (
    <LocalStorageProvider>
      <SessionProvider>
        <OauthProvider>
          <MerchantProvider>
            <OrdersProvider>
              <LoginProvider>
                <SignUpProvider>
                    <html lang="en">
                      <body className={koulen.className}>
                        {children}
                        <footer>
                          <nav>
                            <Link className='footer-link' href="/about">About</Link>
                            <Link className='footer-link' href="https://github.com/OrderWeasel">GitHub</Link>
                          </nav>
                        </footer>
                      </body>
                    </html>
                </SignUpProvider>
              </LoginProvider>
            </OrdersProvider>
          </MerchantProvider>
        </OauthProvider>
      </SessionProvider>
    </LocalStorageProvider>
  );
}
