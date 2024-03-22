"use client";
import React, {useContext} from 'react';
import { SignUpContext } from '../contexts/SignUpContext';
import useSession from './useSession';
import getCopy from '../app/lib/utils/getCopy';
import {getStateCode, formatPhone, isValidEmail} from '../app/lib/utils/signUpValidations';

const signUpURL = process.env.NEXT_PUBLIC_HOST_URL + '/api/signup/';

const useSignUpAPI = () => {
  const {
    newMerchant, setNewMerchant,
    validName, setValidName, validPhone, setValidPhone,
    validStreet, setValidStreet, validCity, setValidCity,
    validZip, setValidZip, validState, setValidState,
    validEmail, setValidEmail, validPassword, setValidPassword,
    validValidator, setValidValidator, defaultNewMerchant, resetState
  } = useContext(SignUpContext);

  // API methods
  async function signUp() {
    let formattedBody = formatNewMerchant(newMerchant);

    // // temporary
    formattedBody = {
      "email": "fwklausmeier@gmail.com",
      "password": "K!aus719",
      "restaurantName": "Red Table",
      "street": "5555 Elm street",
      "city": "Trinidad",
      "state": "CO",
      "zip": "80808",
      "estimatedMinutesForPickup": "30",
      "phone": "1234567890"
    };
    // //-----------

    let requestObject = {
      method: 'POST',
      credentials: "include",
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

      return json.newMerchantDetails;
    } catch (e) {
      console.log(e.message + ' (at useSignUp.signUp)');
      throw new Error(e.message);
    }
  }

  // handlers

  let handleStandardInput = (e, isValid, setField) => {  
    let text = e.target.value;
    if (isValid(text)) {
      setField(true);
    } else {
      setField(false);
    }
  
    updateNewMerchant(e.target.name, text);
  };

  let handleStoreInfoInput = (e, isValid, setField, updateStoreInfo, specialType) => {
    let text = e.target.value;
    
    if (isValid(text) || text.length === 0) {
      if (specialType) {
        text = specialType === 'phone' ? 
          formatPhone(text) :
          getStateCode(text)
      }

      setField(true);
    } else {
      setField(false);
    }

    updateStoreInfo(e.target.name, text);
  }

  let handleEmailInput = (e, updateEmail) => {
    let text = e.target.value;
    if (isValidEmail(text) || text.length === 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }

    updateEmail(text)
  }

  let handleValidatorInput = (e, isValidValidator) => {
    let text = e.target.value;
    if (isValidValidator(text, newMerchant)) {
      setValidValidator(true);
    } else {
      setValidValidator(false);
    }

    updateNewMerchant(e.target.name, text);
  }

  let handleInvalidSubmission = (e) => {
    e.preventDefault();                
    alert('Please ensure all fields are valid before submission');
  }

  
  // Helper functions

  function resetSignUpState() {
    setNewMerchant(defaultNewMerchant);
    resetState();
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
    // return validName && validPhone && validStreet && validCity && validZip && validState
    // && validEmail && validPassword && validValidator
    return true
  }

  function isValidStoreInfo() {
    return validName && validPhone && validState && validCity && validStreet && validZip;
  }

  function isValidLoginInformation() {
    return validEmail;
  }

	// function isValidContactInfo() {
	// 	return validEmail && validPassword && validValidator;
	// }

  return {
    signUp,
    validZip,
    validCity,
    validName,
    validEmail,
    validState,
    validPhone,
    validStreet,
    validPassword,
    validValidator,
    setValidZip,
    setValidCity,
    setValidName,
    setValidEmail,
    setValidPhone,
    setValidState,
    setValidStreet,
    setValidPassword,
    setValidValidator,
    newMerchant,
    formatNewMerchant,
    updateNewMerchant,
    isAllValid,
    isValidStoreInfo,
    isValidLoginInformation,
    resetSignUpState,
    // isValidLocationInfo,
    handleEmailInput,
    handleStandardInput,
    handleValidatorInput,
    handleStoreInfoInput,
    handleInvalidSubmission,
  };
};

export default useSignUpAPI;
