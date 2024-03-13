import '@testing-library/jest-dom'
// import { render, screen } from '@testing-library/react'

// home page
import Home from '../app/page'

// customer pages
import Customer from '../app/(customers)/restaurants/page';
import Checkout from '../app/(customers)/restaurants/checkout/page';
import Restaurant from '../app/(customers)/restaurants/restaurant/page';
import Cart from '../app/(customers)/restaurants/restaurant/cart/page';
import Menu from '../app/(customers)/restaurants/restaurant/menu/page';
 
// merchant pages
import Merchant from '../app/(merchants)/merchant/page';
import Login from '../app/(merchants)/merchant/login/page';
import Signup from '../app/(merchants)/merchant/signup/page';
import Orders from '../app/(merchants)/merchant/login/orders/page';
import Profile from '../app/(merchants)/merchant/login/profile/page';
import Oauth from '../app/(merchants)/merchant/signup/oauth/page';

describe('Home', () => {
  it('should execute without error', () => {
    <Home/>
  });
});

describe('Customer', () => {
  it('should execute without error', () => {
    <Customer />
  });
});

describe('Checkout', () => {
  it('should execute without error', () => {
    <Checkout />
  });
});

describe('Restaurant', () => {
  it('should execute without error', () => {
    <Restaurant />
  });
});

describe('Cart', () => {
  it('should execute without error', () => {
    <Cart />
  });
});

describe('Menu', () => {
  it('should execute without error', () => {
    <Menu />
  });
});

describe('Merchant', () => {
  it('should execute without error', () => {
    <Merchant />
  });
});

describe('Login', () => {
  it('should execute without error', () => {
    <Login />
  });
});

describe('Signup', () => {
  it('should execute without error', () => {
    <Signup />
  });
});

describe('Orders', () => {
  it('should execute without error', () => {
    <Orders />
  });
});

describe('Profile', () => {
  it('should execute without error', () => {
    <Profile />
  });
});

describe('Oauth', () => {
  it('should execute without error', () => {
    <Oauth />
  });
});
