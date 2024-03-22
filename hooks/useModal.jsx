"use client";
import React, {useContext} from 'react';
import { ModalContext } from '../contexts/ModalContext';
// import getCopy from '../app/lib/utils/getCopy';

const useModal = () => {
  const {openModalId, setOpenModalId, isVisible, setIsVisible} = useContext(ModalContext);

  const handleItemClick = (item) => {
    if (openModalId === item.id) {
      setOpenModalId(null);
      setIsVisible(false);
    } else {
      setOpenModalId(item.id);
      setIsVisible(true);
    }
  };

  const closeModal = () => {
    setOpenModalId(null);
    setIsVisible(false);
  };

  return {
    isVisible, 
    closeModal, 
    handleItemClick,
    openModalId,
    setOpenModalId
  };
};

export default useModal;
