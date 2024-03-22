"use client";
import React, {useEffect, useState} from 'react';
// import { useSearchParams } from 'next/navigation';
import useCart from '../../hooks/useCart';
import { GrClose } from "react-icons/gr";

function QuantityInput({quantity, setQuantity}) {
  let decreaseQuantity = (e) => {
    e.stopPropagation();

    if (quantity === '0') {
      return;
    } else {
      setQuantity(String(Number(quantity) - 1));
    }
  }

  let increaseQuantity = (e) => {
    e.stopPropagation();
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

function CartModal({item, onClose, pathname}) {
  // if (!isOpen) return null;
  // const searchParams = useSearchParams();
  const {addItem, editItem, findIndex, cart, handleDelete} = useCart();
  let itemQuantity = pathname === 'Menu' ? '0' : item.quantity;
  const [quantity, setQuantity] = useState(itemQuantity);
  const {id, name, cost, desc} = item;

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  // let merchantId = searchParams.get('merchantId');

  // let id = item.id;
  // let name = item.name;
  // let cost = item.cost;
  // let desc = item.description;

  let updateCart = () => {
    if (findIndex(cart, id) === -1) {
      addItem(id, quantity);
    } else {
      editItem(id, quantity);
    }
    
    onClose();
  };

  let total = (cost, quantity) => {
    return (Number(cost) * Number(quantity)).toFixed(2);
  }

  return (
    <div className='modal-content flex flex-col lg:h-[35%] lg:w-[25%] md:h-[45%] sm:h-[45%] sm:w-[35%]'>
      <div className='flex flex-initial flex-grow-0 h-[20%] flex-row border-b-2 border-grey-500 p-2 items-center justify-end'>
        <h3 className='flex-1 pl-4'>Item: {name}</h3>
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
        <div className='flex p-4'>
          <div className='flex-initial w-[30%]'>
            <p className=''>Cost: ${cost}</p>
            <p className=''>Total: ${total(cost, quantity)}</p>
          </div>
          <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
        </div>
      </div>
      <div className='flex flex-initial h-[25%] flex-row p-2 justify-end'>
        { pathname === 'Cart' && quantity === '0' ?
          <button 
            className="link" 
            onClick={(e) => {
              handleDelete(e, id)
              onClose();
            }}
          >
            Delete Item
          </button>:
          <></>
        }

        <button className="link" onClick={updateCart} >{pathname === 'Menu' ? 'Add to Cart' : 'Update Cart'}</button>
      </div>
    </div>
  );
}

export default CartModal;
