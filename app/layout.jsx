import {koulen} from '@/app/styles/fonts';
import "@/app/globals.css";
import Link from 'next/link';

// contexts
import { SignUpProvider } from '../contexts/SignUpContext';
import { LoginProvider } from '../contexts/LoginContext';
import { SessionProvider } from '../contexts/SessionContext';

// context providers will go here with html, body, and nothing else
  // add pathway specific layouts in groups containing headers
    // use the headers below in page.jsx
    // what about the footer?

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <LoginProvider>
        <SignUpProvider>
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
        </SignUpProvider>
      </LoginProvider>
    </SessionProvider>
  );
}
