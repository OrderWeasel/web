"use client";
import React, {useEffect} from "react";
import useSignUpAPI from "../../../../hooks/useSignUpAPI";
import {STATES} from "../../../lib/utils/statesList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSession from "../../../../hooks/useSession";
import useLoginAPI from "../../../../hooks/useLoginAPI";

import {
  isValidPhoneNumber,
  isValidRestaurantName,
  isValidStreet,
  isValidCity,
  isValidState,
  isValidZip,
  isValidPassword,
  isValidValidator,
  isValidEmail,
} from '../../../lib/utils/signUpValidations';

import {
  InvalidNameMessage,
  InvalidPhoneMessage,
  InvalidStreetMessage,
  InvalidCityMessage,
  InvalidStateMessage,
  InvalidZipMessage,
  InvalidEmailMessage,
  InvalidPasswordMessage,
  InvalidValidatorMessage,
} from '../../../ui/validationMessages';

function ValidationMessages() {
  const {
    validName, validPhone, validStreet, validCity,
    validState, validZip, validEmail, validPassword,
    validValidator
  } = useSignUpAPI();

  return (
    <div className="flex flex-col flex-1 mr-[2%] mt-[2%]">
      <h3 className="flex-1">Requirements: </h3>
      <InvalidNameMessage validName={validName} />
      <InvalidPhoneMessage validPhone={validPhone} />
      <InvalidStreetMessage validStreet={validStreet} />
      <InvalidCityMessage validCity={validCity} />
      <InvalidStateMessage validState={validState} />
      <InvalidZipMessage validZip={validZip} />
      <InvalidEmailMessage validEmail={validEmail} />
      <InvalidPasswordMessage validPassword={validPassword} />
      <InvalidValidatorMessage validValidator={validValidator} />
  </div>
  );
}

function StoreInfo() {
  const { newMerchant, setValidName, setValidPhone, handleStandardInput } = useSignUpAPI();

  return (
    <>
      <div className="sm:col-span-4">
        <label htmlFor="restaurant-name" className="block text-sm font-medium leading-6">
          Restaurant Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="restaurantName"
            value={newMerchant["restaurantName"]}
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
            placeholder="(555)555-5555"
            autoComplete="tel"
            className="flex-1 mr-[1rem] w-30 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={13}
            onChange={(e) => {
              handleStandardInput(e, isValidPhoneNumber, setValidPhone);
            }}
          />
        </div>
      </div>
    </>
  );
}
function BusinessAddress() {
  const { newMerchant, setValidStreet, setValidCity, setValidState, setValidZip, handleStandardInput} = useSignUpAPI();

  return (
    <>
      <div className="col-span-full">
        <label htmlFor="street-address" className="block text-sm font-medium leading-6">
          Street address
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="street"
            value={newMerchant["street"]}
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

      <div className="sm:col-span-2 sm:col-start-1">
        <label htmlFor="city" className="block text-sm font-medium leading-6">
          City
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="city"
            value={newMerchant["city"]}
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

      <div className="sm:col-span-2">
        <label htmlFor="state" className="block text-sm font-medium leading-6">
          State
        </label>
        <div className="mt-2">
          <select
            id="state"
            name="state"
            autoComplete="address-level1"
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            onChange={(e) => {
              handleStandardInput(e, isValidState, setValidState);
            }}
          >
            {STATES.map((state, index) => {
              return (
                <option key={index}>
                  {state}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="zip-code" className="block text-sm font-medium leading-6">
          ZIP / Postal code
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="zip"
            value={newMerchant["zip"]}
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
    </>
  );
}

function ContactInformation() {
  const { newMerchant, setValidEmail, setValidPassword, handleStandardInput, handleValidatorInput } = useSignUpAPI();

  return (
    <>
      <div className="sm:col-span-3">
        <label htmlFor="email" className="block text-sm font-medium leading-6">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            value={newMerchant["email"]}
            placeholder="name@email.com"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={225}
            onChange={(e) => {
              handleStandardInput(e, isValidEmail, setValidEmail)
            }}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="password" className="block text-sm font-medium leading-6">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            value={newMerchant["password"]}
            type="password"
            autoComplete="password"
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={225}
            onChange={(e) => {
              handleStandardInput(e, isValidPassword, setValidPassword)
            }}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="validator" className="block text-sm font-medium leading-6">
          Verify Password
        </label>
        <div className="mt-2">
          <input
            id="validator"
            name="validator"
            value={newMerchant["validator"]}
            type="password"
            autoComplete="off"
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={225}
            onChange={(e) => {
              handleValidatorInput(e, isValidValidator)
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function SignUp(){
  const { isAllValid, signUp, newMerchant, handleInvalidSubmission, resetSignUpState} = useSignUpAPI();
  const {toggleLogin, setCurrentMerchant} = useLoginAPI();
  const {createNewSession} = useSession();
  const router = useRouter();
  let merchant;

  useEffect(() => {
    resetSignUpState();
  }, []);

  let handleSucessfulSubmission = async (e) => {
    e.preventDefault();
    let newMerchantMessage = `Welcome ${newMerchant.email}`;

    try {
      merchant = await signUp();
      setCurrentMerchant(merchant);
      toggleLogin();
      alert(newMerchantMessage); // replace with flash message
      router.push(e.target.href);
      resetSignUpState();
      // createNewSession(merchant.id); // not working-------------------------
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="flex flex-col pt-[1rem] justify-start">
      <h2 className="flex-0.1 flex-start">Sign Up</h2>
      <div className="flex flex-8 flex-row">
        <ValidationMessages />
        <section className="flex-2 max-w-[60%]">
          <form>
            <div className="border-b border-gray-900/10 pb-[2rem]">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-8">
                <StoreInfo />
                <BusinessAddress />
                <ContactInformation />
              </div>
            </div>
            <div className="flex mt-[1rem] justify-end">
              {isAllValid() ?
                <Link
                  className="bg-white text-black hover:bg-indigo-300 hover:text-black px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-md"
                  onClick={handleSucessfulSubmission}
                  href="/orders"
                >
                  Submit
                </Link> :
                <Link 
                  className="bg-slate-500 text-slate-700 shadow-sm ring-2 ring-inset ring-gray-500 px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-sm" 
                  onClick={handleInvalidSubmission}
                  href="/merchant/signup"
                >
                  Submit
                </Link>
              }
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
