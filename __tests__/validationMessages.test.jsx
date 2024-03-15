import '@testing-library/jest-dom'

import {
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
} from '../app/ui/validationMessages';

describe("validationMessage tests", () => {
  it("should execute without error", () => {
    <InvalidNameMessage />
  });

  it("should execute without error", () => {
    <InvalidPhoneMessage />
  });

  it("should execute without error", () => {
    <InvalidStreetMessage />
  });

  it("should execute without error", () => {
    <InvalidCityMessage />
  });

  it("should execute without error", () => {
    <InvalidStateMessage />
  });

  it("should execute without error", () => {
    <InvalidZipMessage />
  });

  it("should execute without error", () => {
    <InvalidEmailMessage />
  });

  it("should execute without error", () => {
    <InvalidPasswordMessage />
  });

  it("should execute without error", () => {
    <InvalidValidatorMessage />
  });

  it("should execute without error", () => {
    <DeleteAccountMessage />
  });
});

