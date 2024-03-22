"use client";
import React, {useState, createContext} from 'react';
let ValidationsContext = createContext(null);

// I would like to gray out the Back to restaurants button if the current page is /restaurants

export default function CheckoutLayout({ children }) {
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  function allValid() {
    return validFirstName && validLastName && validEmail && validPhone;
  }

  return (
    <ValidationsContext.Provider
      value={{
        allValid,
        validEmail,
        validPhone,
        setValidEmail,
        setValidPhone,
        validLastName,
        validFirstName,
        setValidLastName,
        setValidFirstName,
      }}
    >
      {children}
    </ValidationsContext.Provider>
  );
}

export {ValidationsContext};