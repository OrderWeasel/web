import '@testing-library/jest-dom'

import {
  isValidPhoneNumber, isValidRestaurantName, isValidStreet, isValidCity,
  isValidState, isValidZip, isValidEmail, isValidPassword, isValidValidator,
  isNotEmpty, formatPhone, validZipPattern, validStreetPattern,
  validCityPattern, validEmailPattern, validNumPattern, validPasswordPattern,
  isValidEmailCheckout, isValidNameCheckout, getStateCode
} from '../app/lib/utils/signUpValidations';
import {STATE_CODES} from '../app/lib/utils/statesList';

const maxLengthTest = func => {
  it('should not be greater than 225 characters', () => {
    const MaxLengthString = Array(225).fill('a').join('');
    const MaxLengthPlusOne = MaxLengthString + 'a';

    expect(func(MaxLengthString)).toBe(true);
    expect(func(MaxLengthPlusOne)).toBe(false);
  });
};

const emptyStringTest = (func, validStr) => {
  it('should return false given an empty string', () => {
    let emptyText = '';
    let result1 = func(emptyText);
    let result2 = func(validStr);

    expect(result1).toBe(false);
    expect(result2).toBe(true);
  });
};

const allowLettersAndDigits = func => {
  it('should allow letters, digit, and space characters', () => {
    let lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
    let upperLetters = lowerLetters.toUpperCase();
    let digits = '0123456789';
    let allChars = lowerLetters + upperLetters + digits;
    let address1 = '4444 Tejon Street';
    let address2 = '5555     Singer Ave';

    let result1 = expect(func(allChars)).toBe(true);
    let result2 = expect(func(address1)).toBe(true);
    let result3 = expect(func(address2)).toBe(true);
  });
};

const allowLetters = func => {
  it('should allow letter characters', () => {
    let lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
    let upperLetters = lowerLetters.toUpperCase();
    let result1 = expect(func(lowerLetters + upperLetters)).toBe(true);
  });
};

let allowSpecialCharsStreet = func => {
  it('should allow periods, commas, pound, ampersand, whitespace and dash characters', () => {
    let specialChars = '.,#& -';
    let address1 = 'Mt. Carmel Way';
    let address2 = '123 Oak Street #3';
    let address3 = 'C & S Blvd.';
    let address4 = 'Saint-Anne River Place';

    expect(func(specialChars)).toBe(true);
    expect(func(address1)).toBe(true);
    expect(func(address2)).toBe(true);
    expect(func(address3)).toBe(true);
    expect(func(address4)).toBe(true);
  });
};

let allowSpecialCharsCity = func => {
  it('should allow apostrophe, period, dash, and whitespace characters', () => {
    let specialChars = "'. -";
    let city1 = 'St. Louis';
    let city2 = "Martha's Vineyard";
    let city3 = 'Winston-Salem';

    expect(func(specialChars)).toBe(true);
    expect(func(city1)).toBe(true);
    expect(func(city2)).toBe(true);
    expect(func(city3)).toBe(true);
  });
};

let allowFiveDigits = func => {
  it('should return true for a number with exactly 5 digits', () => {
    let validZip = '80917';
    let invalidZip1 = '123456';
    let invalidZip2 = 'a2412';
    let invalidZip3 = '12 12';

    expect(func(validZip)).toBe(true);
    expect(func(invalidZip1)).toBe(false);
    expect(func(invalidZip2)).toBe(false);
    expect(func(invalidZip3)).toBe(false);
  });
};

let allowSpecialCharsPhone = func => {
  it('should allow parentheses and dashes', () => {
    let valid = {
      1: '(719)5978918',
      2: '(719)597-8918',
      3: ')))))7()(1))(9)5-97-891---8',
    };

    let invalid = {
      1: '<719>5978918',
      2: '719 597 8918',
      3: '719.597.8918',
    };

    Object.values(valid).forEach(num => {
      expect(func(num)).toBe(true);
    });

    Object.values(invalid).forEach(num => {
      expect(func(num)).toBe(false);
    });
  });
};

let allowDigits = func => {
  it('should allow digits', () => {
    let validDigits = '1234567890';
    let invalidDigits = '123abc7890';

    expect(func(validDigits)).toBe(true);
    expect(func(invalidDigits)).toBe(false);
  });
};

let allowNumberWithTenDigits = func => {
  it('should return true for a number with a length of 10', () => {
    let nineNumbers = '123456789';
    let tenNumbers = '1234567890';
    let elevenNumbers = '12345678901';

    expect(func(nineNumbers)).toBe(false);
    expect(func(tenNumbers)).toBe(true);
    expect(func(elevenNumbers)).toBe(false);
  });
};

describe('isValidPhoneNumber Tests', () => {
  emptyStringTest(isValidPhoneNumber, '(719)597-8918');
  allowDigits(isValidPhoneNumber);
  allowNumberWithTenDigits(isValidPhoneNumber);
  allowSpecialCharsPhone(isValidPhoneNumber);
});

describe('isValidRestaurantName Tests', () => {
  emptyStringTest(isValidRestaurantName, 'The Red Table');
  maxLengthTest(isValidRestaurantName);
});

describe('isValidStreet Tests', () => {
  emptyStringTest(isValidStreet, '5555 Elm Street');
  maxLengthTest(isValidStreet);
  allowLettersAndDigits(isValidStreet);
  allowSpecialCharsStreet(isValidStreet);
});

describe('isValidCity Tests', () => {
  emptyStringTest(isValidCity, 'Denver');
  maxLengthTest(isValidCity);
  allowLetters(isValidCity);
  allowSpecialCharsCity(isValidCity);
});

describe('isValidState Tests', () => {
  emptyStringTest(isValidState, 'Colorado');

  it('should return true for all full length state names', () => {
    let fullNames = Object.keys(STATE_CODES);
    fullNames.forEach(state => {
      expect(isValidState(state)).toBe(true);
    });
  });

  it('should return true for all state codes', () => {
    let stateCodes = Object.values(STATE_CODES);

    stateCodes.forEach(code => {
      expect(isValidState(code)).toBe(true);
    });
  });
});

describe('isValidZip Tests', () => {
  emptyStringTest(isValidZip, '80903');
  allowFiveDigits(isValidZip);
});

describe('isValidPassword Tests', () => {
  it('should return false given an empty string', () => {
    let merchant = {
      email: 'test@email.com',
    };

    let emptyText = '';
    let validPassword = 'Secretp*ssw0rd';

    expect(isValidPassword(emptyText, merchant)).toBe(false);
    expect(isValidPassword(validPassword, merchant)).toBe(true);
  });

  it('should have at least 8 characters, including 1 uppercase letter, 1 symbol, and 1 number', () => {
    let merchant = {
      email: 'test@email.com',
    };

    let validPassword = 'Secretp*ssw0rd';
    let invalidPassword1 = 'secretpassword';
    let invalidPassword2 = 'Secretpassword';
    let invalidPassword3 = 'Secretp*ssword';
    expect(isValidPassword(validPassword, merchant)).toBe(true);
    expect(isValidPassword(invalidPassword1, merchant)).toBe(false);
    expect(isValidPassword(invalidPassword2, merchant)).toBe(false);
    expect(isValidPassword(invalidPassword3, merchant)).toBe(false);
  });

  it('should not be greater than 225 characters', () => {
    let merchant = {
      email: 'test@email.com',
    };

    const MaxLengthString = Array(211)
      .fill('a')
      .concat('Secretp*ssw0rd')
      .join('');
    const MaxLengthPlusOne = MaxLengthString + 'a';

    expect(isValidPassword(MaxLengthString, merchant)).toBe(true);
    expect(isValidPassword(MaxLengthPlusOne, merchant)).toBe(false);
  });

  it('should not be the same as the email for a given merchant', () => {
    let merchant = {
      email: 'test@email.com',
    };
    let invalid = 'test@email.com';
    let valid = 'Secretp*ssw0rd';

    expect(isValidPassword(invalid, merchant)).toBe(false);
    expect(isValidPassword(valid, merchant)).toBe(true);
  });
});

describe('isValidEmail Tests', () => {
  let merchants = [
    {
      email: 'test@email.com',
      password: 'superSecret123',
    },
    {
      email: 'anotherEmail@gmail.com',
      password: 'secret567Super',
    },
  ];

  let currentMerchant = {
    email: 'tom@aol.com',
    password: 'goTeam1972',
  };

  it('should not have a length greater than 225', () => {
    const maxLengthEmail = Array(215).fill('a').concat('@email.com').join('');
    const maxLengthPlusOne = maxLengthEmail + 'a';

    expect(isValidEmail(maxLengthEmail, merchants, currentMerchant)).toBe(true);
    expect(isValidEmail(maxLengthPlusOne, merchants, currentMerchant)).toBe(
      false,
    );
  });

  it('should have a length greater than 4', () => {
    let text = 'a@bcd';
    expect(isValidEmail(text, merchants, currentMerchant)).toBe(true);
  });

  it('should return false if email is the same as the password', () => {
    let text = 'goTeam1972';
    expect(isValidEmail(text, merchants, currentMerchant)).toBe(false);
  });

  it('should be unique', () => {
    let text1 = 'test@email.com';
    let text2 = 'uniqueEmail@netscape.net';
    expect(isValidEmail(text1, merchants, currentMerchant)).toBe(false);
    expect(isValidEmail(text2, merchants, currentMerchant)).toBe(true);
  });

  it('should have a valid email pattern', () => {
    let invalid = 'abcde';
    let valid1 = 'a@bcd';
    let valid2 = 'valid@email.com';
    expect(isValidEmail(invalid, merchants, currentMerchant)).toBe(false);
    expect(isValidEmail(valid1, merchants, currentMerchant)).toBe(true);
    expect(isValidEmail(valid2, merchants, currentMerchant)).toBe(true);
  });
});

describe('isValidEmailCheckout tests', () => {});
describe('isValidNameCheckout tests', () => {});

describe('isValidValidator Tests', () => {
  let currentMerchant = {
    email: 'tom@aol.com',
    password: 'goTeam1972',
  };

  it('should be the same as the password for a given merchant', () => {
    let text1 = 'password';
    let text2 = 'goTeam1972';
    expect(isValidValidator(text1, currentMerchant)).toBe(false);
    expect(isValidValidator(text2, currentMerchant)).toBe(true);
  });
});

describe('isNotEmpty Tests', () => {
  it('should take an argument greater than length 0', () => {
    let emptyText = '';
    let text1 = 'a';
    let text2 = 'ab!defghi123lmnopq+^_t)vwxyz';

    expect(isNotEmpty(emptyText)).toBe(false);
    expect(isNotEmpty(text1)).toBe(true);
    expect(isNotEmpty(text2)).toBe(true);
  });

  it('should set the default max length of the text argument to 225', () => {
    let defaultMax = Array(225).fill('a').join('');
    let defaultMaxPlusOne = defaultMax + 'a';

    expect(isNotEmpty(defaultMax)).toBe(true);
    expect(isNotEmpty(defaultMaxPlusOne)).toBe(false);
  });

  it('should set the max length of the text argument with a second, optional argument', () => {
    let text = '80917';
    expect(isNotEmpty(text, 6)).toBe(true);
    expect(isNotEmpty(text, 5)).toBe(true);
    expect(isNotEmpty(text, 4)).toBe(false);
  });
});

describe('getStateCode Tests', () => {
  it('should take a full state name and return the state code', () => {
    let fullStateText1 = 'Colorado';
    let fullStateText2 = 'New York';

    expect(getStateCode(fullStateText1)).toBe('CO');
    expect(getStateCode(fullStateText2)).toBe('NY');
  });

  it('should be case sensitive', () => {
    let fullStateText1 = 'colorado';
    let fullStateText2 = 'new York';

    expect(getStateCode(fullStateText1)).toBe(undefined);
    expect(getStateCode(fullStateText2)).toBe(undefined);
  });
});

// describe('getStateCode Tests', () => {
//   it('should take a full state name and return the state code', () => {
//     let fullStateText1 = 'Colorado';
//     let fullStateText2 = 'New York';

//     expect(getStateCode(fullStateText1)).toBe('CO');
//     expect(getStateCode(fullStateText2)).toBe('NY');
//   });

//   it('should return the given text if not a full state name', () => {
//     let invalidStateText1 = 'Col';
//     let invalidStateText2 = 'Florid';

//     expect(getStateCode(invalidStateText1)).toBe('Col');
//     expect(getStateCode(invalidStateText2)).toBe('Florid');
//   });

//   it('should be case insensitive', () => {
//     let fullStateText1 = 'maine';
//     let fullStateText2 = 'cAliFornIA';
//     let fullStateText3 = 'neW mExIco';

//     expect(getStateCode(fullStateText1)).toBe('ME');
//     expect(getStateCode(fullStateText2)).toBe('CA');
//     expect(getStateCode(fullStateText3)).toBe('NM');
//   });
// });

// describe('isFullState Tests', () => {
//   it('should return text if given a full state name, and undefined otherwise', () => {
//     let invalidStateText1 = 'Minesota';
//     let invalidStateText2 = 'Missipi';
//     let fullState1 = 'Alaska';

//     expect(isFullState(invalidStateText1)).toBe(undefined);
//     expect(isFullState(invalidStateText2)).toBe(undefined);
//     expect(isFullState(fullState1)).toBe('Alaska');
//   });

//   it('should be case insensitive', () => {
//     let fullState1 = 'haWaiI';
//     let fullState2 = 'south dakota';

//     expect(isFullState(fullState1)).toBe('Hawaii');
//     expect(isFullState(fullState2)).toBe('South Dakota');
//   });
// });

// describe('isStateCode Tests', () => {
//   it('should return text if given a state code, and undefined otherwise', () => {
//     let invalidStateCode1 = 'WN';
//     let invalidStateCode2 = 'CR';
//     let validStateCode1 = 'WA';

//     expect(isStateCode(invalidStateCode1)).toBe(undefined);
//     expect(isStateCode(invalidStateCode2)).toBe(undefined);
//     expect(isStateCode(validStateCode1)).toBe('WA');
//   });

//   it('should be case insensitive', () => {
//     let fullState1 = 'la';
//     let fullState2 = 'mD';

//     expect(isStateCode(fullState1)).toBe('LA');
//     expect(isStateCode(fullState2)).toBe('MD');
//   });
// });

describe('formatPhone Tests', () => {
  it('should return a string of digit characters given a string of valid phone number characters', () => {
    let valid = {
      1: '(719)5978918',
      2: '(719)597-8918',
      3: ')))))7()(1))(9)5-97-891---8',
    };

    Object.values(valid).forEach(num => {
      expect(formatPhone(num)).toBe('7195978918');
    });
  });

  it('should not affect numbers containing invalid characters', () => {
    let invalid = {
      1: '<719>5978918',
      2: '719 597 8918',
      3: '719.597.8918',
    };

    Object.values(invalid).forEach(num => {
      expect(formatPhone(num)).toBe(num);
    });
  });
});

describe('validZipPattern Tests', () => {
  allowFiveDigits(validZipPattern);
});

describe('validStreetPattern Tests', () => {
  allowLettersAndDigits(validStreetPattern);
});

describe('validCityPattern Tests', () => {
  allowLetters(validCityPattern);
  allowSpecialCharsCity(validCityPattern);
});

describe('validEmailPattern Tests', () => {
  it('should return true if given a valid email pattern', () => {
    let invalid1 = 'abcde';
    let valid1 = 'a@bcd';
    let valid2 = 'valid@email.com';
    let valid4 = 'email.personal@aol.com';

    expect(validEmailPattern(invalid1)).toBe(false);
    expect(validEmailPattern(valid1)).toBe(true);
    expect(validEmailPattern(valid2)).toBe(true);
    expect(validEmailPattern(valid4)).toBe(true);
  });
});

describe('validNumPattern Tests', () => {
  allowNumberWithTenDigits(validNumPattern);
  allowDigits(validNumPattern);
  allowSpecialCharsPhone(validNumPattern);
});

describe('validPasswordPattern Tests', () => {
  it('should have at least 8 characters, including 1 uppercase letter, 1 symbol, and 1 number', () => {
    let validPassword = 'Secretp*ssw0rd';
    let invalidPassword1 = '';
    let invalidPassword2 = 'secret';
    let invalidPassword3 = 'secretpassword';
    let invalidPassword4 = 'Secretpassword';
    let invalidPassword5 = 'Secretp*ssword';

    expect(validPasswordPattern(validPassword)).toBe(true);
    expect(validPasswordPattern(invalidPassword1)).toBe(false);
    expect(validPasswordPattern(invalidPassword2)).toBe(false);
    expect(validPasswordPattern(invalidPassword3)).toBe(false);
    expect(validPasswordPattern(invalidPassword4)).toBe(false);
    expect(validPasswordPattern(invalidPassword5)).toBe(false);
  });
});
