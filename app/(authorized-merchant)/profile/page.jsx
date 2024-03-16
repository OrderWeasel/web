"use client";
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useLoginAPI from '../../../hooks/useLoginAPI';
import useMerchant from '../../../hooks/useMerchantAPI';
import { handleStandardInput } from '../../lib/utils/handlers';

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

function StoreInformation() {
  const {currentMerchant, setCurrentMerchant} = useLogin();
  const {
    updateMerchant,
    getMerchant,
    fillStoreInfo,
    storeInfo,
    updateStoreInfo,
  } = useMerchant();
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validStreet, setValidStreet] = useState(true);
  const [validCity, setValidCity] = useState(true);
  const [validState, setValidState] = useState(true);
  const [validZip, setValidZip] = useState(true);
  useEffect(() => {}, [
    validName,
    validPhone,
    validStreet,
    validCity,
    validState,
    validZip,
  ]);
  useEffect(() => {
    fillStoreInfo(currentMerchant);
  }, []);

  return (
    <div>
      <div>
        <InvalidNameMessage validName={validName} />
        <InvalidPhoneMessage validPhone={validPhone} />
        <InvalidStreetMessage validStreet={validStreet} />
        <InvalidCityMessage validCity={validCity} />
        <InvalidStateMessage validState={validState} />
        <InvalidZipMessage validZip={validZip} />
      </div>

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

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  // value={newMerchant["city"]}
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
                  // value={newMerchant["zip"]}
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
      </form>
    </div>
  );
}

function LoginInformation() {
  const {currentMerchant, setCurrentMerchant} = useLogin();
  const {
    updateMerchant,
    getMerchant,
    updateEmail,
    updatePassword,
    fillLoginInfo,
    password,
    email,
    merchants,
  } = useMerchant();
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  useEffect(() => {}, [validEmail, validPassword]);
  useEffect(() => {
    fillLoginInfo(currentMerchant);
  }, []);

  return (
    <div>
      <div>
        <InvalidEmailMessage validEmail={validEmail} />
        <InvalidPasswordMessage validPassword={validPassword} />
      </div>
      <form>
        <div className="border-b border-gray-900/10 pb-[2rem]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-8">
            <div className="sm:col-span-3">
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

            <div className="sm:col-span-2">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  placeholder={currentMerchant.password}
                  type="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  maxLength={225}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function DeleteAccount() {
  const {currentMerchant, toggleLogout} = useLogin();
  const {deleteMerchant} = useMerchant();
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
    <div>
      <div>
        <DeleteAccountMessage/>
      </div>
      <div>
        <Link
          className='link bg-red-500'
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
  const {currentMerchant} = useLogin();

  return (
    <main>
      <section>
        <h2>{currentMerchant.restaurant_name}</h2>
        <section>
          <h3>Store Information</h3>
          <StoreInformation></StoreInformation>
        </section>
        <section>
          <h3>Login Information</h3>
          <LoginInformation />
        </section>
        <section>
          <h3>Delete Account</h3>
          <DeleteAccount />
        </section>
      </section>
    </main>
  );
}

export default Profile;

{/*
<View style={styles.bottomMargin}>
  <View style={{flexDirection: 'row', margin: 10}}>
    <View style={styles.fieldInput}>
      <Text style={[merchTextCSS.text, styles.textMargin]}>
        Primary Contact Email
      </Text>
      <Text style={[merchTextCSS.text, styles.textMargin]}>Password</Text>
    </View>
    <View style={styles.fieldInput}>
      <TextInput
        style={[merchContCSS.input, styles.profileInput]}
        placeholder={currentMerchant.email}
        onChangeText={text => {
          if (
            isValidEmail(text, merchants, currentMerchant) ||
            text.length === 0
          ) {
            setValidEmail(true);
          } else {
            setValidEmail(false);
          }

          updateEmail(text);
        }}
      />
      <TextInput
        style={[
          merchContCSS.input,
          styles.profileInput,
          {backgroundColor: 'grey'},
        ]}
        placeholder={'********'}
        editable={false}
      />
    </View>
  </View>
  <View style={styles.buttonContainer}>
    <Pressable
      style={[merchContCSS.button, merchContCSS.mainContent]}
      onPress={async () => {
        try {
          if (!validEmail) {
            throw new Error('Invalid email input. Please try again');
          }

          await updateMerchant(currentMerchant, email);
          let merchant = await getMerchant(currentMerchant.id, true);
          setCurrentMerchant(merchant);
        } catch (e) {
          alert(e.message);
        }
      }}>
      <Text style={merchTextCSS.buttonText}>Change Email</Text>
    </Pressable>
    <Pressable
      style={[merchContCSS.button, merchContCSS.mainContent]}
      onPress={async () => {
        //             // should raise a 400 error
        //             try {
        //               if (!validPassword) {
        //                 throw new Error('Invalid password input. Please try again');
        //               }
        //
        //               await updateMerchant(currentMerchant, password);
        //               let merchant = await getMerchant(currentMerchant.id, true);
        //               setCurrentMerchant(merchant);
        //             } catch (e) {
        //               alert(e.message);
        //             }
        alert('Unable to change password at this time');
      }}>
      <Text style={merchTextCSS.buttonText}>Change Password</Text>
    </Pressable>
  </View>
</View>
*/}