import { STATE_CODES } from "./statesList";

export default function getFullState(code) {
  let fullStates = Object.keys(STATE_CODES);

  for (let i=0; i < fullStates.length; i++) {
    let currentState = fullStates[i];
    let currentCode = STATE_CODES[currentState];

    if (currentCode === code) {
      return currentState;
    }
  }

  return false;
}
