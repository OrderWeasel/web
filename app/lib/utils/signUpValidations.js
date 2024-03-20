import {STATES, STATE_CODES} from "./statesList";

function getStateCode(text) {
  return STATE_CODES[text];
}

// refactor - don't take the merchants nor the merchant, only text
// refactor tests
function isValidEmail(text) { //, merchants, merchant) {
  // let isUnique = !merchants.find(merch => merch.email === text);
  // let password = merchant.password;
  return (
    isNotEmpty(text) &&
    // text !== password &&
    // isUnique &&
    text.length >= 4 &&
    validEmailPattern(text)
  );
}

// refacor tests
function isValidEmailCheckout(text) {
  // let merchants = [];
  // let merchant = {password: null};

  return isValidEmail(text); //, merchants, merchant);
}

function isValidNameCheckout(text) {
  return isNotEmpty(text);
}

function isValidValidator(text, merchant) {
  return isNotEmpty(text) && text === merchant.password;
}

function isValidPassword(text) { //, merchant) {
  // let email = merchant.email;

  return isNotEmpty(text) && validPasswordPattern(text); // && text !== email;
}

function isValidRestaurantName(text) {
  return isNotEmpty(text);
}

function isValidPhoneNumber(text) {
  return isNotEmpty(text) && validNumPattern(text);
}

function isValidStreet(text) {
  return isNotEmpty(text) && validStreetPattern(text);
}

function isValidCity(text) {
  return isNotEmpty(text) && validCityPattern(text);
}

function isValidState(text) {
  // return isNotEmpty(text); // && !!(isStateCode(text) || isFullState(text));
  return text !== 'Select';

}

function isValidZip(text) {
  return isNotEmpty(text, 5) && validZipPattern(text);
}

function isNotEmpty(text, maxChars = 225) {
  if (maxChars > 225) {
    return false;
  }
  text = text.trim();

  return text.length > 0 && text.length <= maxChars;
}

function formatPhone(text) {
  return text.replace(/[-()]/g, '');
}

function validPasswordPattern(text) {
  let validPass = new RegExp(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}/,
  );
  text = text.trim();
  return validPass.test(text);
}

function validZipPattern(text) {
  let validZip = new RegExp(/^\d{5}$/);
  text = text.trim();
  return validZip.test(text);
}

function validStreetPattern(text) {
  let validStreetChars = new RegExp(/^[A-Za-z0-9\s.,#&-]+$/);
  text = text.trim();
  return validStreetChars.test(text);
}

function validCityPattern(text) {
  let validCityChars = new RegExp(/^[A-Za-z\s'.-]+$/);
  text = text.trim();
  return validCityChars.test(text);
}

function validEmailPattern(text) {
  let validEmail = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  );
  text = text.trim();
  return validEmail.test(text);
}

function validNumPattern(text) {
  let validNum = new RegExp(/^\d{10}$/);
  text = text.replace(/[-()]/g, '');
  text = text.trim();
  return validNum.test(text);
}

export {
  isValidPhoneNumber,
  isValidRestaurantName,
  isValidStreet,
  isValidCity,
  isValidState,
  isValidZip,
  isValidEmail,
  isValidPassword,
  isValidValidator,
  isNotEmpty,
  getStateCode,
  formatPhone,
  validZipPattern,
  validStreetPattern,
  validCityPattern,
  validEmailPattern,
  validNumPattern,
  validPasswordPattern,
  // isFullState,
  // isStateCode,
  isValidEmailCheckout,
  isValidNameCheckout,
};
