"use client";
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import useLocalStorage from '../../../hooks/useLocalStorage';
import useLoginAPI from '../../../hooks/useLoginAPI';
import useSignUpAPI from '../../../hooks/useSignUpAPI';
import useMerchantAPI from '../../../hooks/useMerchantAPI';
import { STATES } from '../../lib/utils/statesList';
import getFullState from '../../lib/utils/getFullState';

import {
  InvalidZipMessage,
  InvalidNameMessage,
  InvalidCityMessage,
  InvalidPhoneMessage,
  InvalidStateMessage,
  InvalidEmailMessage,
  InvalidStreetMessage,
  DeleteAccountMessage,
} from '../../../app/ui/validationMessages';

import {
  isValidZip,
  isValidCity,
  isValidState,
  isValidStreet,
  isValidPhoneNumber,
  isValidRestaurantName,
  // formatPhone,
} from '../../../app/lib/utils/signUpValidations';

let resetFields = () => {
  let inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    if (input.value) {
      input.value = '';
    }
  });
}

function StoreInformation() {
  // const router = useRouter();
  // const {getAuthorizedMerchant} = useLocalStorage();
  const {currentMerchant, setCurrentMerchant} = useLoginAPI();
  const { 
    // resetFields, 
    fillStoreInfo,
    updateStoreInfo,
    handleProfileUpdate,
  } = useMerchantAPI();
  const {
    validZip, 
    validCity, 
    validName, 
    validState, 
    validPhone, 
    validStreet, 
    setValidZip, 
    setValidCity, 
    setValidName, 
    setValidState, 
    setValidPhone, 
    setValidStreet,
    isValidStoreInfo, 
    handleStoreInfoInput,
    handleInvalidSubmission, 
  } = useSignUpAPI();

  useEffect(() => {

    // on page refresh, if state is reset, set currentMerchant to local storage authMerchant
    // let authMerchant = getAuthorizedMerchant();

    setValidZip(true); 
    setValidCity(true);
    setValidName(true); 
    setValidPhone(true); 
    setValidStreet(true);
    setValidState(true);

    // fillStoreInfo(authMerchant);
    fillStoreInfo(currentMerchant);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let handleStoreInfoUpdate = async(e) => {
    e.preventDefault();
    try {
      await handleProfileUpdate(currentMerchant, setCurrentMerchant);
      alert('Successfully updated merchant.');

      resetFields();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className='flex p-8'>
      <form className='flex-1'>
        <div className="border-b border-gray-900/10 pb-[2rem]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-8">
            <div className="sm:col-span-4">
              <label htmlFor="restaurant-name" className="block text-sm font-medium leading-6">
                Restaurant Name
              </label>
              <div className="mt-2">
                <InvalidNameMessage validName={validName} profile={true} /> 
                <input
                  type="text"
                  name="restaurant_name"
                  placeholder={currentMerchant.restaurant_name}
                  id="restaurant-name"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                  onChange={(e) => {
                    handleStoreInfoInput(e, isValidRestaurantName, setValidName, updateStoreInfo);
                  }}
                  />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="flex text-sm font-medium leading-6">
                Restaurant Phone
              </label>
              <div className="mt-2">
                <InvalidPhoneMessage validPhone={validPhone} profile={true} />
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder={currentMerchant.phone}
                  className="flex-1 mr-[1rem] w-30 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                  maxLength={13}
                  onChange={(e) => {
                    handleStoreInfoInput(e, isValidPhoneNumber, setValidPhone, updateStoreInfo, 'phone');
                  }}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6">
                Street address
              </label>
              <div className="mt-2">
                <InvalidStreetMessage validStreet={validStreet} profile={true} />
                <input
                  type="text"
                  name="street"
                  placeholder={currentMerchant.street}
                  id="street-address"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                  onChange={(e) => {
                    handleStoreInfoInput(e, isValidStreet, setValidStreet, updateStoreInfo);
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6">
                City
              </label>
              <div className="mt-2">
                <InvalidCityMessage validCity={validCity} profile={true} /> 
                <input
                  type="text"
                  name="city"
                  placeholder={currentMerchant.city}
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                  onChange={(e) => {
                    handleStoreInfoInput(e, isValidCity, setValidCity, updateStoreInfo);
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="state" className="block text-sm font-medium leading-6">
                State
              </label>
              <div className="mt-2">
                <InvalidStateMessage validState={validState} profile={true} />
                <select
                  id="state"
                  name="state"
                  defaultValue={getFullState(currentMerchant.state)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    handleStoreInfoInput(e, isValidState, setValidState, updateStoreInfo, 'state');
                  }}
                >
                  {STATES.slice(1).map((state, index) => {
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
                <InvalidZipMessage validZip={validZip} profile={true} />
                <input
                  type="text"
                  name="zip"
                  placeholder={currentMerchant.zip}
                  id="zip-code"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-grey"
                  maxLength={5}
                  onChange={(e) => {
                    handleStoreInfoInput(e, isValidZip, setValidZip, updateStoreInfo);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-[1rem] justify-end">
          {isValidStoreInfo() ?
            <Link
              className="bg-white text-black hover:bg-indigo-300 hover:text-black px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-md"
              onClick={handleStoreInfoUpdate}
              href="/profile"
            >
              Update Store Information
            </Link> :
            <Link 
              className="bg-slate-500 text-slate-700 shadow-sm ring-2 ring-inset ring-gray-500 px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-sm" 
              onClick={handleInvalidSubmission}
              href="/profile"
            >
              Update Store Information
            </Link>
          }
        </div>
      </form>
    </div>
  );
}

function LoginInformation() {
  const router = useRouter();
  const {currentMerchant, setCurrentMerchant} = useLoginAPI();
  const {
    email,
    // merchants, 
    updateEmail,
    fillLoginInfo, 
    handleLoginUpdate,
  } = useMerchantAPI();

  const {
    validEmail, 
    setValidEmail, 
    handleEmailInput,
    handleInvalidSubmission,
    // isValidLoginInformation, 
  } = useSignUpAPI(); 

  useEffect(() => {
    setValidEmail(true);
    fillLoginInfo(currentMerchant);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      await handleLoginUpdate(e, currentMerchant, setCurrentMerchant, email);
      alert("Successfully updated email");
      resetFields();
    } catch (error) {
      alert(error.message);
    }
  }

  
  let handleStoreInfoUpdate = async(e) => {
    e.preventDefault();
    try {
      await handleProfileUpdate(currentMerchant, setCurrentMerchant);
      alert('Successfully updated merchant.');
      resetFields();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className='flex p-8'>
      <form className='flex-1'>
        <div className="border-b border-gray-900/10 pb-[2rem]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-8">
            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6">
                Email address
              </label>
              <div className="mt-2">
                <InvalidEmailMessage validEmail={validEmail} profile={true} />
                <input
                  id="email"
                  name="email"
                  placeholder={currentMerchant.email}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                  onChange={(e) => {
                    handleEmailInput(e, updateEmail)
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-8">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Password
              </label>
              <div className="mt-2">
                <p className='text-sm color'>*Cannot change password at this time</p>
                <input
                  id="password"
                  name="password"
                  placeholder='*********'
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black w-[50%]"
                  maxLength={225}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-[1rem] justify-end">
          {validEmail ?
            <Link
              className="bg-white text-black hover:bg-indigo-300 hover:text-black px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-md"
              onClick={handleEmailUpdate}
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
      let success = await deleteMerchant(currentMerchant.id);
      toggleLogout();
      alert(success.message);
      router.push(href);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className='flex p-8'>
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
  return (
    <main className='flex flex-1'>
      <section className='flex flex-1'>
        <h2>Account Information</h2>
        <section className='flex-1 p-4'>
          <h3>Store Information</h3>
          <StoreInformation />
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
