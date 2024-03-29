"use client";
import React from 'react';
import {createContext, useState, useEffect} from 'react';

const SignUpContext = createContext(null);

const SignUpProvider = props => {
  const [validName, setValidName] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const [validStreet, setValidStreet] = useState(false);
  const [validCity, setValidCity] = useState(false);
  const [validZip, setValidZip] = useState(false);
  const [validState, setValidState] = useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validValidator, setValidValidator] = useState(false);

  function resetState() {
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

  let defaultNewMerchant = {
    restaurantName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    password: '',
    validator: '',
    estimatedMinutesForPickup: 30,
  }

  defaultNewMerchant = {
    "email": "email@gmail.com",
    "password": "P@55word",
    "restaurantName": "Red Table",
    "street": "5555 Elm street",
    "city": "Fort Collins",
    "state": "CO",
    "zip": "80827",
    "estimatedMinutesForPickup": "30",
    "phone": "1234567890"
  };

  const [newMerchant, setNewMerchant] = useState(defaultNewMerchant);

  useEffect(() => {
    // console.log(JSON.stringify(newMerchant) + " (at SignUpContext)");
  }, [newMerchant]);

  useEffect(() => {}, [validName, validPhone]);
  useEffect(() => {}, [validStreet, validCity, validZip, validState]);
  useEffect(() => {}, [validEmail, validPassword, validValidator]);

  return (
    <SignUpContext.Provider
      value={{
        newMerchant, setNewMerchant, validName,
        setValidName, validPhone, setValidPhone,
        validStreet, setValidStreet, validCity, setValidCity,
        validZip, setValidZip, validState, setValidState,
        validEmail, setValidEmail, validPassword, setValidPassword,
        validValidator, setValidValidator, defaultNewMerchant, resetState
      }}
    >
      {props.children}
    </SignUpContext.Provider>
  );
};

export {SignUpContext, SignUpProvider};
