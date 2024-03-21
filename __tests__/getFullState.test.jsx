import '@testing-library/jest-dom'
import { STATE_CODES } from "../app/lib/utils/statesList";
import getFullState from '../app/lib/utils/getFullState';

describe("getFullState tests", () => {
  let stateCodes = Object.values(STATE_CODES);

  it("should return the full state name for a given state code", () => {
    let stateCode1 = "CO";
    let stateCode2 = "CA";
    let stateCode3 = "NY";

    expect(getFullState(stateCode1)).toBe("Colorado");
    expect(getFullState(stateCode2)).toBe("California");
    expect(getFullState(stateCode3)).toBe("New York");
  });

  it("should return false if given an invalid state code", () => {
    let invalid1 = "Select";
    let invalid2 = "FA";
    let invalid3 = "CL"

    expect(getFullState(invalid1)).toBe(false);
    expect(getFullState(invalid2)).toBe(false);
    expect(getFullState(invalid3)).toBe(false);
  });
});
