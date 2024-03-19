"use client";
import React, {useContext} from 'react';
import { ModalContext } from '../contexts/ModalContext';
import getCopy from '../app/lib/utils/getCopy';

const useModal = () => {
  const {openModalId, setOpenModalId, isVisible, setIsVisible} = useContext(ModalContext);

  const handleItemClick = (item) => {
    setOpenModalId(item.id)
  };

  const closeModal = () => {
    console.log('Before: ' + openModalId); // 1
    setOpenModalId(null);
  };


   function toggleModal() {
    setIsVisible(!isVisible);
  }

  return {
    isVisible, 
    toggleModal,
    closeModal, 
    handleItemClick,
    openModalId,
    setOpenModalId
  };
};

export default useModal;
