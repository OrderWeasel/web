/* eslint-disable react/no-unescaped-entities*/
import React from 'react';
import BULLET_POINT from '../lib/utils/bulletPoint';

function InvalidNameMessage({validName}) {
  return (
    <p className={` flex-1 ${ validName ? 'success' : 'error'}`}>
      {BULLET_POINT} Restaurant Name is required
    </p>
  );
}

function InvalidPhoneMessage({validPhone}) {
  return (
    <p className={` flex-1 ${ validPhone ? 'success' : 'error'}`}>
      {BULLET_POINT} Phone number is required and must contain 10 digits and only valid characters (0-9 and [ ( ) -])
    </p>
  );
}

function InvalidStreetMessage({validStreet}) {
  return (
    <p className={` flex-1 ${ validStreet ? 'success' : 'error'}`}>
      {BULLET_POINT} Street is required and must contain valid characters
      (A-Z, a-z, 0-9, ' ' and [ . , # & - ])
    </p>
  );
}

function InvalidCityMessage({validCity}) {
  return (
    <p className={` flex-1 ${ validCity ? 'success' : 'error'}`}>
      {BULLET_POINT} City is required and must contain valid characters
      (A-Z, a-z, ' ' and [ ' . - ])
    </p>
  );
}

function InvalidStateMessage({validState}) {
  return (
    <p className={` flex-1 ${ validState ? 'success' : 'error'}`}>
      {BULLET_POINT} Select state
    </p>
  );
}

function InvalidZipMessage({validZip}) {
  return (
    <p className={` flex-1 ${ validZip ? 'success' : 'error'}`}>
      {BULLET_POINT} Zip code is required and must contain 5 digits
    </p>
  );
}

function InvalidEmailMessage({validEmail}) {
  return (
    <p className={` flex-1 ${ validEmail ? 'success' : 'error'}`}>
      {BULLET_POINT} Email field is required, and must be a valid email address
    </p>
  );
}

function InvalidValidatorMessage({validValidator}) {
  return (
    <p className={` flex-1 ${ validValidator ? 'success' : 'error'}`}>
      {BULLET_POINT} Verify password
    </p>
  );
}

function InvalidPasswordMessage({validPassword}) {
  return (
    <p className={` flex-1 ${ validPassword ? 'success' : 'error'}`}>
      {BULLET_POINT} Password is required and must have 8 or more characters, including 1 uppercase, 1 number, and 1 symbol
    </p>
  );
}

function DeleteAccountMessage() {
  return (
    <p className='error'>
      {BULLET_POINT} This action is irreversible. All account and restaurant
      information will be lost
    </p>
  );
}

export {
  InvalidNameMessage,
  InvalidPhoneMessage,
  InvalidStreetMessage,
  InvalidCityMessage,
  InvalidStateMessage,
  InvalidZipMessage,
  InvalidEmailMessage,
  InvalidPasswordMessage,
  InvalidValidatorMessage,
  DeleteAccountMessage,
};

// old messages:
// email --> {BULLET_POINT} Email field is required, must be unique, must not match
  // your password, and must be a valid email address
// phone --> {BULLET_POINT} Phone number is required and must contain 10 digits eg (555-555-5555)
