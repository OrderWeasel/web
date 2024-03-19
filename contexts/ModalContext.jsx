"use client";
import React, {createContext, useState, useEffect} from 'react';
const ModalContext = createContext(null);

const ModalProvider = props => {
  const [openModalId, setOpenModalId] = useState(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(openModalId + " (at ModalContext)");
  }, [openModalId]);

  useEffect(() => {
    console.log(isVisible + " (at ModalContext)")
  }, [isVisible]);

  return (
    <ModalContext.Provider 
      value={{openModalId, setOpenModalId, isVisible, setIsVisible}}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export {ModalContext, ModalProvider};
