"use client";
import useSignUpAPI from "../../../../hooks/useSignUpAPI";
import {STATES} from "../../../lib/utils/statesList";
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
import Restaurant from "../../../(customers)/restaurants/restaurant/page";

export default function SignUp(){
  const {
    newMerchant, updateNewMerchant, validName,
    setValidName, validPhone, setValidPhone,
    validStreet, setValidStreet, validCity, 
    setValidCity, validZip, setValidZip, 
    validState, setValidState, validEmail, 
    setValidEmail, validPassword, setValidPassword, 
    validValidator, setValidValidator, isAllValid
  } = useSignUpAPI();

  let handleStandardInput = (e, isValid, setField) => {
    let text = e.target.value;
    if (isValid(text)) {
      setField(true);
    } else {
      setField(false);
    }

    updateNewMerchant(e.target.name, text);
  };

  return (
    <main className="flex flex-col pt-[1rem]">
      <h2 className="flex-0.1 flex-start">Sign Up</h2>
      <div className="flex flex-8 flex-row">
        <div className="flex-1 mr-[2%] mt-[2%]">
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
        <section className="flex-2 max-w-[60%]">
          <form>
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
                      name="tel1"
                      id="phone1"
                      autoComplete="tel"
                      className="flex-1 mr-[1rem] w-12 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={3}
                    />

                    <input
                      type="tel"
                      name="tel2"
                      id="phone2"
                      autoComplete="tel"
                      className="flex-2 mr-[1rem] w-12 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={3}
                    />

                    <input
                      type="tel"
                      name="tel3"
                      id="phone3"
                      autoComplete="tel"
                      className="flex-3 mr-[1rem] w-14 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={4}
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

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={newMerchant["email"]}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={225}
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
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="flex mt-[1rem] justify-end">
              {isAllValid() ?
                <button 
                  className="bg-white text-black hover:bg-indigo-300 hover:text-black px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-md"
                >
                  Submit
                </button> :
                <button 
                  className="bg-slate-500 text-slate-700 shadow-sm ring-2 ring-inset ring-gray-500 px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-sm" 
                  onClick={() => { alert('Fix errors before submission')}}  
                >
                  Submit
                </button>
              }
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
