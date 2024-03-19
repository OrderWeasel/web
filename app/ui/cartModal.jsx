"use client";
import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import useCart from '../../hooks/useCart';
// import useModal from '../../hooks/useModal';
import { GrClose } from "react-icons/gr";
import { Tiro_Tamil } from 'next/font/google';
import { queryAllByAltText } from '@testing-library/react';


function QuantityInput({quantity, setQuantity}) {
  let decreaseQuantity = () => {
    if (quantity === '0') {
      return;
    } else {
      setQuantity(String(Number(quantity) - 1));
    }
  }

  let increaseQuantity = () => {
    setQuantity(String(Number(quantity) + 1));
  }

  return (
    <div className='flex flex-1 items-center self-center'>
      <button className="link" onClick={decreaseQuantity}>
        -
      </button>
      <input type="text"
        className='bg-white text-black border-2 border-black rounded-xl p-0 w-12 h-12 text-center align-middle' 
        value={quantity}
      />
      <button className="link" onClick={increaseQuantity}>
        +
      </button>
    </div>
  );
}

function CartModal({item, isOpen, onClose, pathname}) {
  if (!isOpen) return null;
  const searchParams = useSearchParams();
  const {addItem, editItem, deleteItem, findIndex, cart} = useCart();
  let itemQuantity = pathname === 'Menu' ? '0' : item.quantity;
  const [quantity, setQuantity] = useState(itemQuantity);

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  let merchantId = searchParams.get('merchantId');
  let id = item.id;
  let name = item.name;
  let cost = item.cost;
  let desc = item.description;

  let updateCart = () => {
    if (findIndex(cart, id) === -1) {
      addItem(merchantId, id, quantity);
    } else {
      editItem(merchantId, id, quantity);
    }
    
    onClose();
  };

  let deleteCartItem = () => {
    deleteItem(id);
    onClose();
  };

  let total = (cost, quantity) => {
    return (Number(cost) * Number(quantity)).toFixed(2);
  }

  return (
    <div onClick={onClose} className='modal'>
      <div className='modal-content flex flex-col lg:h-[35%] lg:w-[25%] md:h-[45%] sm:h-[45%] sm:w-[35%]'>
        <div className='flex flex-initial flex-grow-0 h-[20%] flex-row border-b-2 border-grey-500 p-2 items-center justify-end'>
          <h3 className='flex-1'>Item: {name}</h3>
          <figure 
            onClick={onClose} 
            className='flex-initial w-[20%] flex justify-center hover:cursor-pointer'
          >
            <GrClose />
          </figure>
        </div>
        <div className='flex flex-1 flex-col align-center  justify-center border-b-2 border-grey-500 p-2'>
          <div className='flex flex-1 grow-1 flex-col'>
            <p className='flex-1'>Description: {desc}</p>
          </div>
          <div className='flex'>
            <div className='flex-initial w-[30%]'>
              <p className=''>Cost: ${cost}</p>
              <p className=''>Total: ${total(cost, quantity)}</p>
            </div>
            <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
          </div>
        </div>
        <div className='flex flex-initial h-[25%] flex-row p-2 justify-end'>
          { pathname === 'Cart' && quantity === '0' ?
            <button className="link" onClick={deleteCartItem}>Delete Item</button>:
            <></>
          }

          <button className="link" onClick={updateCart} >{pathname === 'Menu' ? 'Add to Cart' : 'Update Cart'}</button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
