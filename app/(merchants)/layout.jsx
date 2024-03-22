import MerchantsHeader from '../ui/merchantsHeader';

// I would like to grey out the merchant home button if the current page is /merchant
export default function MerchantsLayout({ children }) {
  return (
    <>
      <MerchantsHeader />
      {children}
    </>
  );
}
