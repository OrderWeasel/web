"use client";
import React, {createContext, useState, useEffect} from 'react';
const ModalContext = createContext(null);

const ModalProvider = props => {
  const [openModalId, setOpenModalId] = useState(null);

  useEffect(() => {
    console.log(openModalId + " (at ModalContext)");
  }, [openModalId]);

  return (
    <ModalContext.Provider 
      value={{openModalId, setOpenModalId}}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export {ModalContext, ModalProvider};
