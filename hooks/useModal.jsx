"use client";
import React, {useContext} from 'react';
import { ModalContext } from '../contexts/ModalContext';
import getCopy from '../app/lib/utils/getCopy';

const useModal = () => {
  const {openModalId, setOpenModalId} = useContext(ModalContext);

  const handleItemClick = (item) => {
    setOpenModalId(item.id)
  };

  const closeModal = () => {
    console.log('Before: ' + openModalId); // 1
    setOpenModalId(null);
  };

  return {
    closeModal, 
    handleItemClick,
    openModalId,
    setOpenModalId
  };
};

export default useModal;
