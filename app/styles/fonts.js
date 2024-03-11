import { Inter, Koulen } from 'next/font/google';
import localFont from 'next/font/local'
 
// define your variable fonts
const inter = Inter({ subsets: ["latin"]});
const koulen = Koulen({
  subsets: ["latin"],
  weight: '400'
});

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })
 
export { inter, koulen };