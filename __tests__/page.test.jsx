import '@testing-library/jest-dom'
// import { render, screen } from '@testing-library/react'

// home page
import Home from '../app/page'

// customer pages
import Restaurants from '../app/(customers)/restaurants/page';
import Restaurant from '../app/(customers)/restaurants/restaurant/page';
import Checkout from '../app/(customers)/restaurants/checkout/page';
 
// merchant pages
import Merchant from '../app/(merchants)/merchant/page';
import Login from '../app/(merchants)/merchant/login/page';
import Signup from '../app/(merchants)/merchant/signup/page';
import Oauth from '../app/(merchants)/merchant/signup/oauth/page';

// authorized merchant pages
import Profile from '../app/(authorized-merchant)/profile/page';
import Orders from '../app/(authorized-merchant)/orders/page';

describe('Home', () => {
  it('should execute without error', () => {
    <Home/>
  });
});

describe('Restaurants', () => {
  it('should execute without error', () => {
    <Restaurants />
  });
});

describe('Restaurant', () => {
  it('should execute without error', () => {
    <Restaurant />
  });
});

describe('Checkout', () => {
  it('should execute without error', () => {
    <Checkout />
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
