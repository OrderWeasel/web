"use client";
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useLoginAPI from '../../../hooks/useLoginAPI';
import useSignUpAPI from '../../../hooks/useSignUpAPI';
import useMerchantAPI from '../../../hooks/useMerchantAPI';
import { STATES } from '../../lib/utils/statesList';

import {
  InvalidNameMessage,
  InvalidPhoneMessage,
  InvalidStreetMessage,
  InvalidCityMessage,
  InvalidStateMessage,
  InvalidZipMessage,
  InvalidEmailMessage,
  InvalidPasswordMessage,
  DeleteAccountMessage,
} from '../../../app/ui/validationMessages';

import {
  isValidRestaurantName,
  isValidStreet,
  isValidCity,
  isValidState,
  isValidZip,
  isValidPhoneNumber,
  isValidEmail,
  isValidPassword,
  getStateCode,
  formatPhone,
} from '../../../app/lib/utils/signUpValidations';

let handleSucessfulSubmission = (e) => {
  alert("Successfully updated account inforamtion")    
};

function StoreInformation() {
  const {currentMerchant} = useLoginAPI();
  const { fillStoreInfo } = useMerchantAPI();
  const {validName, setValidName, validPhone, setValidPhone, validStreet, setValidStreet,
  validCity, setValidCity, validState, setValidState, validZip, setValidZip, isAllValid, handleInvalidSubmission} = useSignUpAPI();

  useEffect(() => {
    fillStoreInfo(currentMerchant);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex'>
      <div className='flex-1 mr-10'>
        <InvalidNameMessage validName={validName} />
        <InvalidPhoneMessage validPhone={validPhone} />
        <InvalidStreetMessage validStreet={validStreet} />
        <InvalidCityMessage validCity={validCity} />
        <InvalidStateMessage validState={validState} />
        <InvalidZipMessage validZip={validZip} />
      </div>

      <form className='flex-1'>
        <div className="border-b border-gray-900/10 pb-[2rem]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-8">
            <div className="sm:col-span-4">
              <label htmlFor="restaurant-name" className="block text-sm font-medium leading-6">
                Restaurant Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="restaurantName"
                  placeholder={currentMerchant.restaurant_name}
                  id="restaurant-name"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                  onChange={(e) => {
                    handleStandardInput(e, isValidRestaurantName, setValidName);
                  }}
                  />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="flex text-sm font-medium leading-6">
                Restaurant Phone
              </label>
              <div className="mt-2">
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="tel"
                placeholder={currentMerchant.phone}
                className="flex-1 mr-[1rem] w-30 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                maxLength={13}
                onChange={(e) => {
                  handleStandardInput(e, isValidPhoneNumber, setValidPhone);
                }}
              />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street"
                  placeholder={currentMerchant.street}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                  onChange={(e) => {
                    handleStandardInput(e, isValidStreet, setValidStreet);
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  placeholder={currentMerchant.city}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                  onChange={(e) => {
                    handleStandardInput(e, isValidCity, setValidCity);
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="state" className="block text-sm font-medium leading-6">
                State
              </label>
              <div className="mt-2">
                <select
                  id="state"
                  name="state"
                  value={currentMerchant.state}
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {STATES.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="zip-code" className="block text-sm font-medium leading-6">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip"
                  placeholder={currentMerchant.zip}
                  id="zip-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-grey"
                  maxLength={5}
                  onChange={(e) => {
                    handleStandardInput(e, isValidZip, setValidZip);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-[1rem] justify-end">
          {isAllValid() ?
            <Link
              className="bg-white text-black hover:bg-indigo-300 hover:text-black px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-md"
              onClick={handleSucessfulSubmission}
              href="/profile"
            >
              Update Store Inoformation
            </Link> :
            <Link 
              className="bg-slate-500 text-slate-700 shadow-sm ring-2 ring-inset ring-gray-500 px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-sm" 
              onClick={handleInvalidSubmission}
              href="/profile"
            >
              Update Store Inoformation
            </Link>
          }
        </div>
      </form>
    </div>
  );
}

function LoginInformation() {
  const {currentMerchant, setCurrentMerchant} = useLoginAPI();
  const { fillLoginInfo } = useMerchantAPI();

  const {validEmail, setValidEmail, validPassword, setValidPassword, isAllValid, handleInvalidSubmission} = useSignUpAPI(); 

  useEffect(() => {
    fillLoginInfo(currentMerchant);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex'>
      <div className='flex-1 mr-10'>
        <InvalidEmailMessage validEmail={validEmail} />
        <InvalidPasswordMessage validPassword={validPassword} />
      </div>
      <form className='flex-1'>
        <div className="border-b border-gray-900/10 pb-[2rem]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-8">
            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  placeholder={currentMerchant.email}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                />
              </div>
            </div>

            <div className="sm:col-span-8">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Password
              </label>
              <div className="mt-2">
                <p className='text-sm color text-white'>*Cannot change password at this time</p>
                <input
                  id="password"
                  name="password"
                  placeholder='*********'
                  type="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black w-[50%]"
                  maxLength={225}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-[1rem] justify-end">
          {isAllValid() ?
            <Link
              className="bg-white text-black hover:bg-indigo-300 hover:text-black px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-md"
              onClick={handleSucessfulSubmission}
              href="/orders"
            >
              Update Login Information
            </Link> :
            <Link 
              className="bg-slate-500 text-slate-700 shadow-sm ring-2 ring-inset ring-gray-500 px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-sm" 
              onClick={handleInvalidSubmission}
              href="/merchant/signup"
            >
              Update Login Information
            </Link>
          }
        </div>
      </form>
    </div>
  );
}

function DeleteAccount() {
  const {currentMerchant, toggleLogout} = useLoginAPI();
  const {deleteMerchant} = useMerchantAPI();
  const router = useRouter();

  let handleDelete = async (e, href) => {
    e.preventDefault();
    try {
      await deleteMerchant(currentMerchant.id);
      toggleLogout();
      // navigation.navigate('MerchantHome');

      router.push(href);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className='flex pb-10'>
      <div className='flex-1'>
        <DeleteAccountMessage/>
      </div>
      <div className='flex-1'>
        <Link
          className='delete-account'
          href="/"
          onClick={handleDelete}
        >
          Delete Account
        </Link>
      </div>
    </div>
  );
}

function Profile() {
  const {currentMerchant} = useLoginAPI();

  return (
    <main className='flex flex-1'>
      <section className='flex flex-1'>
        <h2>Account Information</h2>
        <section className='flex-1 p-4'>
          <h3>Store Information</h3>
          <StoreInformation></StoreInformation>
        </section>
        <section className='flex-1 p-4'>
          <h3>Login Information</h3>
          <LoginInformation />
        </section>
        <section className='flex-1 p-4'>
          <h3>Delete Account</h3>
          <DeleteAccount />
        </section>
      </section>
    </main>
  );
}

export default Profile;
