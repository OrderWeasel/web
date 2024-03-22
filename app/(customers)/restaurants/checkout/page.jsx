/* eslint-disable react/no-unescaped-entities*/
"use client";
import React, {useContext, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import useMerchantData from '../../../../hooks/useMerchantData';
import useLocalStorage from '../../../../hooks/useLocalStorage';
// import useOrders from '../../../../hooks/useOrders';
import { ValidationsContext } from './layout';

import GetMap from '../../../ui/getMap';
import BULLET_POINT from '../../../lib/utils/bulletPoint';

import {
  isValidEmailCheckout,
  isValidNameCheckout,
  isValidPhoneNumber,
} from '../../../../app/lib/utils/signUpValidations'

function CheckoutHeader() {
  const {restaurantData} = useMerchantData();
  const {title, address} = restaurantData;  

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
  let {
    allValid,
    validEmail,
    validPhone,
    setValidEmail,
    validLastName,
    setValidPhone,
    validFirstName,
    setValidLastName,
    setValidFirstName,
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
      <h3> Contact Info</h3>
      <form className='m-4'>
        <p className={`${allValid() ? 'text-green-500' : 'text-red-500'}`}>
          *All fields are required
        </p>
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
              className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${validFirstName ? 'ring-gray-300  focus:ring-indigo-600' : 'ring-red-700 focus:ring-red-600 '}`}
              maxLength={225}
              onChange={(e) => {
                handleInput(e, isValidNameCheckout, setValidFirstName)
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
              className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${validLastName ? 'ring-gray-300  focus:ring-indigo-600' : 'ring-red-700 focus:ring-red-600 '}`}
              maxLength={225}
              onChange={(e) => {
                handleInput(e, isValidNameCheckout, setValidLastName)
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
              placeholder='example@email.com'
              className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${validEmail ? 'ring-gray-300  focus:ring-indigo-600' : 'ring-red-700 focus:ring-red-600 '}`}
              maxLength={225}
              onChange={(e) => {
                handleInput(e, isValidEmailCheckout, setValidEmail)
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
              placeholder='(555)555-5555'
              className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${validPhone ? 'ring-gray-300  focus:ring-indigo-600' : 'ring-red-700 focus:ring-red-600 '}`}
              maxLength={225}
              onChange={(e) => {
                handleInput(e, isValidPhoneNumber, setValidPhone)
              }}
              />
          </div>
        </div>
      </form>
    </section>
  );
}

function NotificationsSection() {
  return (
    <section className='flex-1 m-4'>
      <h3>Text & Email Notifications</h3>
      <div className='p-4'>
        <p>{BULLET_POINT} Feature not currently available.</p>
        <p> {BULLET_POINT} We'll send you a notification when your order is ready👍 </p>
      </div>
    </section>
  );
}

function CheckoutTotals({totals}) {
  let subtotal = (totals.subtotal).toFixed(2);
  let tax = (totals.tax).toFixed(2);
  let total = (totals.total).toFixed(2);

  return (
    <section className='flex-1'>
      <h2>Totals: </h2>
      <p className='text-red-500'>*The following totals are estimates based on tax rates in your area</p>
      <div className='p-4 mt-4 rounded grid grid-cols-2 grid-rows-3 w-[50%] bg-gray-800 self-center'>
        <h3>Subtotal:</h3>
        <p className='text-xl self-center text-right'>${subtotal}</p>
        <h3>Tax:</h3>
        <p className='text-xl self-center text-right'>${tax}</p>
        <h3 className='underline'>Total:</h3>
        <p className='text-xl self-center text-right'>${total}</p>
      </div>
    </section>
  );
}

function CheckoutFooter({merchantId, cart}) {
  const router = useRouter();
  // const {createOrder} = useOrders();
  const {deleteCart}= useLocalStorage();
  const {allValid} = useContext(ValidationsContext)

  // once an order is created, need to remove order from LocalStorage using useLocalStorage

  let handleConfirmation = async (e) => {
    e.preventDefault();

    try {
      // in current implementation, need to create user first before we can create the order
      if (!allValid()) {
          throw new Error('Please provide valid info to submit your order');
        }
        
        // let response = await createOrder(resId, cart);
        // await deleteCart(merchantId);
        router.push(e.target.href);
      } catch (e) {
        alert(e.message);
      }
  } 

  return (
    <section className='flex flex-1 items-end'>
      <Link
        className='link'
        onClick={handleConfirmation}
        href='/restaurants/checkout/confirmation'
        >
        Submit Order and Pay Later
      </Link>
    </section>
  );
}

export default function Checkout() {
  const {loadRestaurantData} = useMerchantData();
  const searchParams = useSearchParams();
  let merchantId = searchParams.get("merchantId");
  let cart = JSON.parse(searchParams.get("cart"));
  let totals = JSON.parse(searchParams.get("totals"));

  useEffect(() => {
    loadRestaurantData(merchantId);
  });

  return (
    <main className='flex-col justify-normal items-center'>
      <CheckoutHeader />
      <ContactInfoSection />
      <NotificationsSection />
      <CheckoutTotals totals={totals} />
      <CheckoutFooter merchantId={merchantId} cart={cart} />
    </main>
  );
}
