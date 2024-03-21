/* eslint-disable react/no-unescaped-entities*/
import React from 'react';
import BULLET_POINT from '../lib/utils/bulletPoint';

let messages = {
  name: 'Restaurant Name is required',
  phone: ' Phone number is required and must contain 10 digits and only valid characters (0-9 and [ ( ) -])',
  street: "Street is required and must contain valid characters(A-Z, a-z, 0-9, ' ' and [ . , # & - ])",
  city: "City is required and must contain valid characters (A-Z, a-z, ' ' and [ ' . - ])",
  state: 'Select state',
  zip: 'Zip code is required and must contain 5 digits',
  email: 'Email field is required, and must be a valid email address',
  validator: 'Verify password',
  password: 'Password is required and must have 8 or more characters and at least one of each of the following characters: uppercase, number, and a symbol',
  delete: 'This action is irreversible. All account and restaurant information will be lost',
}

// SignUp components

function NameSignUp({validName}) {
  return (
    <p className={` flex-1 ${ validName ? 'success' : 'error'}`}>
      {BULLET_POINT} {messages.name}
    </p>
  );
}

function PhoneSignUp({validPhone}) {
  return (
    <p className={` flex-1 ${ validPhone ? 'success' : 'error'}`}>
      {BULLET_POINT} {messages.phone}
    </p>
  );
}
function StreetSignUp({validStreet}) {
  return (
    <p className={` flex-1 ${ validStreet ? 'success' : 'error'}`}>
      {BULLET_POINT} {messages.street}
    </p>
  );
}
function CitySignUp({validCity}) {
  return (
  <p className={` flex-1 ${ validCity ? 'success' : 'error'}`}>
    {BULLET_POINT} {messages.city}
  </p>
  );
}
function StateSignUp({validState}) {
  return (
    <p className={` flex-1 ${ validState ? 'success' : 'error'}`}>
      {BULLET_POINT} {messages.state}
    </p>
  );
}
function ZipSignUp({validZip}) {
  return (
    <p className={` flex-1 ${ validZip ? 'success' : 'error'}`}>
      {BULLET_POINT} {messages.zip}
    </p>
  );
}
function EmailSignUp({validEmail}) {
  return (
    <p className={` flex-1 ${ validEmail ? 'success' : 'error'}`}>
      {BULLET_POINT} {messages.email}
    </p>
  );
}

// Profile components

function NameProfile({validName}) {
  return (
    <>
      {validName ?
        <></> :
        <p className="flex-1 error">
          {BULLET_POINT} {messages.name}
        </p>
      }
    </>
  );
}

function PhoneProfile({validPhone}) {
  return (
    <>
      {validPhone ?
        <></> :
        <p className="flex-1 error">
          {BULLET_POINT} {messages.phone}
        </p>
      }
    </>
  );  
}

function StreetProfile({validStreet}) {
  return (
    <>
      {validStreet ?
        <></> :
        <p className="flex-1 error">
          {BULLET_POINT} {messages.street}
        </p>
      }
    </>
  );  
}

function CityProfile({validCity}) {
  return (
    <>
      {validCity ?
        <></> :
        <p className="flex-1 error">
          {BULLET_POINT} {messages.city}
        </p>
      }
    </>
  );  
}

function StateProfile({validState}) {
  return (
    <>
      {validState ?
        <></> :
        <p className="flex-1 error">
          {BULLET_POINT} {messages.state}
        </p>
      }
    </>
  );  
}

function ZipProfile({validZip}) {
  return (
    <>
      {validZip ?
        <></> :
        <p className="flex-1 error">
          {BULLET_POINT} {messages.zip}
        </p>
      }
    </>
  );  
}

function EmailProfile({validEmail}) {
  return (
    <>
      {validEmail ?
        <></> :
        <p className="flex-1 error">
          {BULLET_POINT} {messages.email}
        </p>
      }
    </>
  );  
}

// Base Components

function InvalidNameMessage({validName, profile}) {
  return (
    <>
      {profile ?
        <NameProfile validName={validName}/> :
        <NameSignUp validName={validName} />
      }
    </>
  );
}

function InvalidPhoneMessage({validPhone, profile}) {
  return (
    <>
      {profile ?
        <PhoneProfile validPhone={validPhone}/> :
        <PhoneSignUp validPhone={validPhone} />
      }
    </>
  );
}

function InvalidStreetMessage({validStreet, profile}) {
  return (
    <>
      {profile ?
        <StreetProfile validStreet={validStreet}/> :
        <StreetSignUp validStreet={validStreet} />
      }
    </>
  );
}

function InvalidCityMessage({validCity, profile}) {
  return (
    <>
      {profile ?
        <CityProfile validCity={validCity}/> :
        <CitySignUp validCity={validCity} />
      }
    </>
  );
}

function InvalidStateMessage({validState, profile}) {
  return (
    <>
      {profile ?
        <StateProfile validState={validState}/> :
        <StateSignUp validState={validState} />
      }
    </>
  );
}

function InvalidZipMessage({validZip, profile}) {
  return (
    <>
      {profile ?
        <ZipProfile validZip={validZip}/> :
        <ZipSignUp validZip={validZip} />
      }
    </>
  );
}

function InvalidEmailMessage({validEmail, profile}) {
  return (
    <>
      {profile ?
        <EmailProfile validEmail={validEmail}/> :
        <EmailSignUp validEmail={validEmail} />
      }
    </>
  );
}

function InvalidValidatorMessage({validValidator}) {
  return (
    <p className={` flex-1 ${ validValidator ? 'success' : 'error'}`}>
      {BULLET_POINT} {messages.validator}
    </p>
  );
}

function InvalidPasswordMessage({validPassword}) {
  return (
    <p className={` flex-1 ${ validPassword ? 'success' : 'error'}`}>
      {BULLET_POINT} {messages.password}
    </p>
  );
}

function DeleteAccountMessage() {
  return (
    <p className='error'>
      {BULLET_POINT} {messages.delete}
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
