"use client";
import React, {useState} from 'react';
import { usePathname } from 'next/navigation';
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

function ModalHeader({modalVisible, setModalVisible, item}) {
  let name = item.name;
  let cost = item.cost;

  let closeModal= () => {
    setModalVisible(!modalVisible);
  };

  return (
    <p onClick={closeModal}>
      X
    </p>
  );
}

function ModalBody({quantity, setQuantity, item}) {
  let desc = item.desc;

  return (
    <div>
      <p>{desc}</p>
      <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
    </div>
  );
}

function ModalFooter({modalVisible, setModalVisible, quantity, cart, item}) {
  const {addItem, editItem, deleteItem, findIndex} = useCart();
  // const route = useRoute();
  const pathname = usePathname();
  let id = item.id;

  let updateCart = () => {
    if (findIndex(cart, id) === -1) {
      addItem(id, quantity);
    } else {
      editItem(id, quantity);
    }

    setModalVisible(!modalVisible);
  }

  return (
    <div>
      <button onClick={() => {deleteItem(id)}}>Delete Item</button>
      <button onClick={updateCart} >{pathname === 'Menu' ? 'Add to Cart' : 'Update Cart'}</button>
    </div>
  );
}

function CartModal({modalVisible, setModalVisible, item, cart}) {
  const pathname = usePathname();

  let itemQuantity = pathname === 'Menu' ? '0' : item.quantity;
  const [quantity, setQuantity] = useState(itemQuantity);

  console.log(JSON.stringify(modalVisible))

  return (
    <dialog 
      className={modalVisible? 'cart-modal-visible' : 'cart-modal-hidden'}>
      <ModalHeader
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
      <ModalBody
        quantity={quantity}
        setQuantity={setQuantity}
        item={item}
      />
      <ModalFooter
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        quantity={quantity}
        cart={cart}
        item={item}
      />
    </dialog>
  );
}

export default CartModal;
