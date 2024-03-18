"use client";
import React, {useState} from 'react';
import { useSearchParams } from 'next/navigation';
// import { usePathname } from 'next/navigation';
import useCart from '../../hooks/useCart';

function QuantityInput({quantity, setQuantity}) {
  let increaseQuantity = () => {
    if (quantity === '0') {
      return;
    } else {
      setQuantity(String(Number(quantity) - 1));
    }
  }

  let decreaseQuantity = () => {
    setQuantity(String(Number(quantity) + 1));
  }

  return (
    <div>
      <button onClick={decreaseQuantity}>
        -
      </button>
      <input type="text" 
      value={quantity}
      />
      <button onClick={increaseQuantity}>
        +
      </button>
    </div>
  );
}

function CartModal({modalVisible, setModalVisible, item, cart, pathname}) {
  const {addItem, editItem, deleteItem, findIndex} = useCart();
  const searchParams = useSearchParams();
  let merchantId = searchParams.get('merchantId');
  let id = item.id;
  let name = item.name;
  let cost = item.cost;
  let desc = item.desc;

  let itemQuantity = pathname === 'Menu' ? '0' : item.quantity;
  const [quantity, setQuantity] = useState(itemQuantity);

  let closeModal= () => {
    setModalVisible(!modalVisible);
  };

  let updateCart = () => {
    if (findIndex(cart, id) === -1) {
      addItem(merchantId, id, quantity);
    } else {
      editItem(merchantId, id, quantity);
    }

    setModalVisible(!modalVisible);
  }

  return (
    <dialog>
      <div>
        <p onClick={closeModal}>X</p>
      </div>
      <div>
        <p>{desc}</p>
        <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
      </div>
      <div>
        <button onClick={() => {deleteItem(id)}}>Delete Item</button>
        <button onClick={updateCart} >{pathname === 'Menu' ? 'Add to Cart' : 'Update Cart'}</button>
      </div>
    </dialog>
  );
}

export default CartModal;
