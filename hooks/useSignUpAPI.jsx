"use client";
import React, {useContext} from 'react';
import { SignUpContext } from '../contexts/SignUpContext';
import useSession from './useSession';
import getCopy from '../app/lib/utils/getCopy';

import {getStateCode, formatPhone} from '../app/lib/utils/signUpValidations';

const signUpURL = process.env.NEXT_PUBLIC_HOST_URL + '/api/signup/';

const useSignUpAPI = () => {
  const {
    newMerchant, setNewMerchant,
    validName, setValidName, validPhone, setValidPhone,
    validStreet, setValidStreet, validCity, setValidCity,
    validZip, setValidZip, validState, setValidState,
    validEmail, setValidEmail, validPassword, setValidPassword,
    validValidator, setValidValidator, defaultNewMerchant
  } = useContext(SignUpContext);

  const {createNewSession} = useSession();

  // API methods
  async function signUp() {
    let formattedBody = formatNewMerchant(newMerchant);

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

      resetSignUpFields();
      resetSignUpState();
      console.log(json.message);
      return json;
    } catch (e) {
      console.log(e.message + ' (at useSignUp.signUp)');
      throw new Error(e.message);
    }
  }

  // Helper functions

  function resetSignUpFields() {
    setNewMerchant(defaultNewMerchant);
    resetSignUpState();
  }
  function resetSignUpState() {
    setValidName(false);
    setValidPhone(false);
    setValidStreet(false);
    setValidCity(false);
    setValidZip(false);
    setValidState(false);
    setValidEmail(false);
    setValidPassword(false);
    setValidValidator(false);
  }

  let handleStandardInput = (e, isValid, setField) => {  
    let text = e.target.value;
    if (isValid(text)) {
      setField(true);
    } else {
      setField(false);
    }
  
    updateNewMerchant(e.target.name, text);
  };

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
    handleStandardInput,
    handleValidatorInput,
    handleInvalidSubmission,
    resetSignUpFields,
    resetSignUpState
  };
};

export default useSignUpAPI;
