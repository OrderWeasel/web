import Link from 'next/link';

let messages = {
  merchant: "Have a Restaurant?",
  customer: "Find a Place to Eat",
  login: "Log In",
  home: "Home",
  cart: "Cart",
  signup: "Sign Up"
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
    case('cart'):
      message = messages.cart;
      break;
    case('signup'):
      message = messages.signup;
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
