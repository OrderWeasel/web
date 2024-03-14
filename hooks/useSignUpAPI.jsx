"use client";
import {useContext} from 'react';
import {SignUpContext} from '../contexts/SignUpContext';
import useSession from './useSession';

import {getStateCode, formatPhone} from '../app/lib/utils/signUpValidations';

const HOST_URL = process.env.HOST_URL;

const signUpURL = HOST_URL + '/api/signup/';

const useSignUpAPI = () => {
  const {
    newMerchant, setNewMerchant,
    validName, setValidName, validPhone, setValidPhone,
    validStreet, setValidStreet, validCity, setValidCity,
    validZip, setValidZip, validState, setValidState,
    validEmail, setValidEmail, validPassword, setValidPassword,
    validValidator, setValidValidator
  } = useContext(SignUpContext);

  const {createNewSession} = useSession();

  // API methods
  async function signUp() {
//     let formattedBody = formatNewMerchant(newMerchant);

		let formattedBody = {
	    "email": "fwklausmeier@gmail.com",
	    "password": "K!aus719",
	    "restaurantName": "Red Table",
	    "street": "5555 Elm street",
	    "city": "Trinidad",
	    "state": "CO",
	    "zip": "80808",
	    "estimatedMinutesForPickup": "30",
	    "phone": "1234567890"
		}

    let requestObject = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedBody),
    };

    try {
      let response = await fetch(signUpURL, requestObject);
      let json = await response.json();

      if (response.status === 400) {
        throw new Error(json.error);
      }

      // createNewSession(response);
      console.log(json.message);
      return json;
    } catch (e) {
      console.log(e.message + ' (at useSignUp.signUp)');
      throw new Error(e.message);
    }
  }

  // Helper functions

  function getCopy(collection) {
    return JSON.parse(JSON.stringify(collection));
  }

  function updateNewMerchant(field, input) {
    let copy = getCopy(newMerchant);
    copy[field] = input;
    setNewMerchant(copy);
  }

  function formatNewMerchant(newMerchant) {
    let newMerchantCopy = getCopy(newMerchant);
    newMerchantCopy.state = getStateCode(newMerchantCopy.state);
    newMerchantCopy.phone = formatPhone(newMerchantCopy.phone);

    return newMerchantCopy;
  }

  function isAllValid() {
    return validName && validPhone && validStreet && validCity && validZip && validState
    && validEmail && validPassword && validValidator
  }

  function isValidStoreInfo() {
    return validName && validPhone;
  }

  function isValidLocationInfo() {
    return validStreet && validCity && validZip && validState;
  }

	function isValidContactInfo() {
		return validEmail && validPassword && validValidator;
	}

  return {
    formatNewMerchant,
    updateNewMerchant,
    newMerchant,
    signUp,
    validName,
    setValidName,
    validPhone,
    setValidPhone,
    validStreet,
    setValidStreet,
    validCity,
    setValidCity,
    validZip,
    setValidZip,
    validState,
    setValidState,
    validEmail,
    setValidEmail,
    validPassword,
    setValidPassword,
    validValidator,
    setValidValidator,
    isAllValid,
    isValidStoreInfo,
    isValidContactInfo,
    isValidLocationInfo,
  };
};

export default useSignUpAPI;
