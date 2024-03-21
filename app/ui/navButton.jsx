import Link from 'next/link';

let messages = {
  merchant: "Have a Restaurant?",
  customer: "Find a Place to Eat",
  login: "Log In",
  home: "Home",
  signup: "Sign Up",
  // signOut: "Sign Out",
  merchantHome: "Merchant Home",
  restaurants: 'Back to Restaurants',
  orders: 'Orders',
}

function getMessage(type) {
  let message;
  
  switch(type) {
    case('merchant'):
      message = messages.merchant;
      break;
    case('customer'):
      message = messages.customer;
      break;
    case('login'):
      message = messages.login;
      break;
    case('home'):
      message = messages.home;
      break;
    case('signup'):
      message = messages.signup;
      break;
    case('merchantHome'):
      message = messages.merchantHome;
      break;
    case('restaurants'):
      message = messages.restaurants;
      break;
    // case("signOut"):
    //   message = messages.signOut;
    //   break;
    case("orders"):
      message = messages.orders;
      break;
    default:
      let _exhaustiveCheck = type;
      throw new Error(`Uncreachable type: ${_exhaustiveCheck}`);
      break;
  }

  return message;
}

function NavButton({type, href}) {
  let message = getMessage(type);
  
  return (
    <Link className="link" href={href}>
      {message}
    </Link>
  );
}

export default NavButton;
