/* eslint-disable react/no-unescaped-entities*/
"use client";
import React, {useState, useContext, createContext} from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import GetMap from '../../../ui/getMap';
import BULLET_POINT from '../../../lib/utils/bulletPoint';
import {
  isValidEmailCheckout,
  isValidNameCheckout,
  isValidPhoneNumber,
} from '../../../../app/lib/utils/signUpValidations'

import useLocalStorage from '../../../../hooks/useLocalStorage';
// import useOrders from '../../../../hooks/useOrders';

let ValidationsContext = createContext(null);


// temporary------------------------------
import restaurantsData from '../../../lib/seedData/restaurantsData';

let getRestaurant = (id) => {
  return restaurantsData.find(res => res.id === Number(id));
};

//---------------------------------------


function CheckoutHeader({title, address}) {
  return (
    <section className='flex-1'> 
      <div className='flex flex-row'>
        <Image src="/order_weasel.jpg" className='rounded' width={100} height={100} alt="Restaurant logo" />
        <h2 className='self-center ml-4'>{title}</h2>
      </div>
      <div className='mt-4'>
        <h3>Carryout Order</h3>
        <div className='p-4'>
          <p>Pickup at: <GetMap address={address} /></p>
        </div>
      </div>
    </section>
  );
}

function ContactInfoSection() {
  // highlight pInputs with red if submit without information
  // only allow submission once inputs are filled
  // need validation messages? alert?
  // need

  let {
    validFirstName,
    setValidFirstName,
    validLastName,
    setValidLastName,
    validEmail,
    setValidEmail,
    validPhone,
    setValidPhone,
  } = useContext(ValidationsContext);

  let handleInput = (e, isValid, setField) => {
    let text = e.target.value;

    if (isValid(text)) {
      setField(true);
    } else {
      setField(false);
    }
  }

  return (
    <section className='flex-1 mt-4'>
      <h2> Contact Info</h2>
      <p className='text-red-500'>*All fields are required</p>

      <div className='grid grid-cols-4 gap-4 p-4'>
        <div className="col-span-2">
          <label htmlFor="first-name" className="block text-sm font-medium leading-6">
            First Name
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={225}
            onChange={(e) => {
              handleInput(e, validFirstName, setValidFirstName)
            }}
          />
        </div>
    
        <div className="col-span-2">
          <label htmlFor="last-name" className="block text-sm font-medium leading-6">
            Last Name
          </label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            autoComplete="family-name"
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={225}
            onChange={(e) => {
              handleInput(e, validLastName, setValidLastName)
            }}
            />
        </div>

        <div className="col-span-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={225}
            onChange={(e) => {
              handleInput(e, validEmail, setValidEmail)
            }}
            />
        </div>

        <div className="col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium leading-6">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="tel"
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={225}
            onChange={(e) => {
              handleInput(e, validPhone, setValidPhone)
            }}
            />
        </div>
      </div>
    </section>
  );
}

function NotificationsSection() {
  // replace code within main view with Notifications component to add feature
  return (
    <section className='flex-1 mt-4'>
      <h2>Text & Email Notifications</h2>
      <div className='p-4'>
        <p>{BULLET_POINT} Feature not currently available.</p>
        <p> {BULLET_POINT} We&aposll send you a notification when your order is ready👍 </p>
      </div>
    </section>
  );
}

function CheckoutTotals({totals}) {
  let subtotal = totals.subtotal;
  let tax = totals.tax;
  let total = totals.total;

  console.log(JSON.stringify({subtotal, tax, total}) + " (at CheckoutTotals)");

  {/* <p>${subtotal.toFixed(2)}</p>
  <p>${tax.toFixed(2)}</p>
  <p>${total.toFixed(2)}</p> */}

  return (
    <section className='flex-1 mt-4'>
      <h2>Totals: </h2>
      <p className='text-red-500'>*The following totals are estimates based on tax rates in your area</p>
      <div className='p-4 grid grid-cols-2 grid-rows-3 gap-4'>
        <h3>Subtotal:</h3>
        <p className='text-xl'>$1</p>
        <h3>Tax:</h3>
        <p className='text-xl'>$2</p>
        <h3>Total:</h3>
        <p className='text-xl'>$3</p>
      </div>
    </section>
  );
}

function CheckoutFooter({merchantId, cart}) {
  // const {createOrder} = useOrders();
  const {deleteCart}= useLocalStorage();

  const {validFirstName, validLastName, validEmail, validPhone} = useContext(ValidationsContext);

  // once an order is created, need to remove order from LocalStorage using useLocalStorage

  let handleConfirmation = async (e) => {
    try {
      // in current implementation, need to create user first before we can create the order
      if (
        !validFirstName ||
        !validLastName ||
        !validEmail ||
        !validPhone
        ) {
          throw new Error('Please provide valid info to submit your order');
        }
        
        let response = await createOrder(resId, cart);

        //             await deleteCart(resId);
      } catch (e) {
        alert(e.message);
      }
  } 

  return (
    <section className='flex-1'>
      <Link
        className='link'
        href={'/restaurants/checkout/confirmation'}
        onClick={handleConfirmation}
      >
        Submit Order and Pay Later
      </Link>
    </section>
  );
}

export default function Checkout(){
  const searchParams = useSearchParams();

  let merchantId = searchParams.get("merchantId");
  let cart = searchParams.get("cart");
  let totals = searchParams.get("totals");

  // get the necessary restaurant info in API request in useEffect
  let restaurant = getRestaurant(merchantId);
  let title = restaurant.title;
  let address = restaurant.address;

  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  return (
    <main className='flex-col justify-normal items-center'>
      <ValidationsContext.Provider
        value={{
          validFirstName,
          setValidFirstName,
          validLastName,
          setValidLastName,
          validEmail,
          setValidEmail,
          validPhone,
          setValidPhone,
      }}>
        <CheckoutHeader title={title} address={address} />
        <ContactInfoSection />
        <NotificationsSection />
        <CheckoutTotals totals={totals} />
        <CheckoutFooter merchantId={merchantId} cart={cart} />
      </ValidationsContext.Provider>
    </main>
  );
}
