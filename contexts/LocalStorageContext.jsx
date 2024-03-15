"use client";
import React, {createContext, useState, useEffect} from 'react';
const LocalStorageContext = createContext(null);

const LocalStorageProvider = props => {
  const [LocalStorage, setLocalStorage] = useState([]);

  useEffect(() => {
    //     console.log(`LocalStorage in LocalStorageContext : ${JSON.stringify(LocalStorage)`);
  }, [LocalStorage]);

  return (
    <LocalStorageContext.Provider value={[LocalStorage, setLocalStorage]}>
      {props.children}
    </LocalStorageContext.Provider>
  );
};

export {LocalStorageContext, LocalStorageProvider};
