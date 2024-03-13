import Link from 'next/link';
import HomeHeader from '../ui/homeHeader';

// context providers will go here with html, body, and nothing else
  // add pathway specific layouts in groups containing headers
    // use the headers below in page.jsx
    // what about the footer?

export default function InfoLayout({ children }) {
  return (
    <>
    <HomeHeader />
    {children}
  </>

  );
}
