"use client";
import {useContext} from 'react';
import {MerchantContext} from '../contexts/MerchantContext';
import useSessions from './useSession';

const merchantsURL = process.env.NEXT_PUBLIC_HOST_URL + '/api/merchants/';

const useMerchantAPI = () => {
  const {
    email,
    setEmail,
    password,
    storeInfo,
    merchants,
    setPassword,
    setStoreInfo,
    setMerchants,
    defaultEmail,
    defaultStoreInfo,
  } = useContext(MerchantContext);

  const {encodeSessionId} = useSessions();

  // API methods

  // should be an anonymous user that calls this when loading SignInTab
  async function getMerchants() {
    let requestObj = {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, 
    };

    try {
      let response = await fetch(merchantsURL, requestObj);
      let json = await response.json();

      if (response.status === 400) {
        throw new Error(json.error);
      }

      if (JSON.stringify(merchants) !== JSON.stringify(json)) {
        setMerchants(json);
      }

    } catch (e) {
      console.log(e.message + ' (at getMerchants)');
      throw new Error(e.message);
    }
  }

  async function getMerchant(merchantId, update = false) {
    // let sessionID = encodeSessionId();
    // let cookie = `connect.sid=${sessionID}`;
    let requestObject = {
      method: 'GET',
      credentials: "include",
      headers: {
        // Cookie: cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      let response = await fetch(merchantsURL + merchantId, requestObject);
      let json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error);
      }

      if (update) {
        replaceUpdatedMerchant(json);
      }

      return json;
    } catch (e) {
      console.log(e.message + ' (at getMerchant)');
      throw new Error(e.message);
    }
  }

  async function updateMerchant(merchant, updateObj) {
    let updateFields = getUpdateFields(merchant, updateObj);
    let requests = createRequests(merchant, updateFields, updateObj);

    try {
      let responses = await Promise.all(requests);

      // check for 400 status
      // comes from trying to update password
      // comes from trying to update id
      // comes from trying to update nonexistent merchant
      responses.forEach(response => {
        if (response.status === 400) {
          throw new Error('Bad request');
        }
      });

      let json = await Promise.all(responses.map(response => response.json()));
      json.forEach(obj => console.log(obj.message || obj.error));
    } catch (e) {
      console.log(e.message + ' (at useMerchant.updateMerchant)');
      throw new Error(e.message);
    }
  }

  async function deleteMerchant(id) {
    // let sessionID = encodeSessionId();
    // let cookie = `connect.sid=${sessionID}`;
    let requestObj = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        // Cookie: cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    
    // delete the merchant on the server
    try {
      let res = await fetch(merchantsURL + id, requestObj);
      let json = await res.json();
      
      if (res.status === 400) {
        throw new Error(json.error);
      }
      return json.message;
    } catch (e) {
      console.log(e.message + ' (at deleteMerchant)');
      throw new Error(e.message);
    }
  }

  // handlers
  async function handleProfileUpdate(currentMerchant, setCurrentMerchant) {
    try {
      await updateMerchant(currentMerchant, storeInfo);
      let merchant = await getMerchant(currentMerchant.id, true);
      setCurrentMerchant(merchant);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function handleLoginUpdate(e, currentMerchant, setCurrentMerchant, email) {
    try {
      await updateMerchant(currentMerchant, email);
      let merchant = await getMerchant(currentMerchant.id, true);
      setCurrentMerchant(merchant);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // helper functions

  function getUpdateFields(merchant, updateObj) {
    let updateFields = [];

    for (const field in updateObj) {
      let value = updateObj[field];
      let merchantValue = merchant[field];
      if (value !== merchantValue) {
        updateFields.push(field);
      }
    }

    return updateFields;
  }

  function createRequests(merchant, updateFields, updateObj) {
    let merchantId = merchant.id;
    let sessionID = encodeSessionId();
    let cookie = `connect.sid=${sessionID}`;
    let requests = updateFields.map(field => {
      let body = {
        columnName: field,
        newValue: updateObj[field],
      };

      let requestObject = {
        method: 'PATCH',
        credentials: "include",
        headers: {
          Cookie: cookie,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };

      return fetch(merchantsURL + merchantId, requestObject);
    });

    return requests;
  }

  function replaceUpdatedMerchant(newMerchant) {
    let idx = findIndex(newMerchant.id);
    if (idx === -1) {
      throw Error('Id is undefined (at replaceUpdatedMerchant)');
    }

    let merchantsCopy = getCopy(merchants);
    merchantsCopy.splice(idx, 1, newMerchant);
    setMerchants(merchantsCopy);
  }

  function addNewMerchant(newMerchant) {
    let merchantsCopy = getCopy(merchants);
    merchantsCopy.push(newMerchant.newMerchantDetails);
    setMerchants(merchantsCopy);
  }

  function removeMerchant(id) {
    let merchantsCopy = getCopy(merchants);
    let filtered = merchantsCopy.filter(merchant => merchant.id !== id);
    setMerchants(filtered);
  }

  function getCopy(collection) {
    return JSON.parse(JSON.stringify(collection));
  }

  function fillStoreInfo(currentMerchant) {
    let fields = {
      restaurant_name: currentMerchant.restaurant_name,
      phone: currentMerchant.phone,
      street: currentMerchant.street,
      city: currentMerchant.city,
      state: currentMerchant.state,
      zip: currentMerchant.zip,
    };
    setStoreInfo(fields);
  }

  function fillLoginInfo(currentMerchant) {
    setEmail({
      email: currentMerchant.email,
    });

    // need to set to hidden unencrypted password
    // get merchant by currentMerchant.id ?
    // route to return unencrypted password ?
    // setPassword({
    //   password: currentMerchant.password,
    // });
  }

  function updateStoreInfo(field, text) {
    let copy = JSON.parse(JSON.stringify(storeInfo));

    copy[field] = text;
    setStoreInfo(copy);
  }

  function updatePassword(text) {
    let copy = JSON.parse(JSON.stringify(password));
    copy.password = text;
    setPassword(copy);
  }

  function updateEmail(text) {
    let copy = JSON.parse(JSON.stringify(email));
    copy.email = text;
    setEmail(copy);
  }

  function findIndex(id) {
    return merchants.findIndex(merchant => merchant.id === id);
  }

  return {
    email,
    password,
    merchants,
    storeInfo,
    getMerchant,
    updateEmail,
    getMerchants,
    fillStoreInfo,
    fillLoginInfo,
    removeMerchant,
    addNewMerchant,
    updateMerchant,
    deleteMerchant,
    updatePassword,
    updateStoreInfo,
    handleLoginUpdate,
    handleProfileUpdate,
  };
};

export default useMerchantAPI;
