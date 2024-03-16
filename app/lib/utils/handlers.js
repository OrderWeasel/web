// for signup and profile inputs
let handleStandardInput = (e, isValid, setField) => {
  let text = e.target.value;
  if (isValid(text)) {
    setField(true);
  } else {
    setField(false);
  }

  updateNewMerchant(e.target.name, text);
};

export {handleStandardInput};