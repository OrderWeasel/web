"use client"
import React, {useState, useEffect} from 'react';
import useOrders from '../../hooks/useOrders';

function ModalHeader({modalVisible, setModalVisible, item}) {
  let fullName = item.full_name;
  let phone = item.phone;

  let closeModal = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <div>
      <div>
        <p>Customer: {fullName}</p>
        <p>Phone: {phone}</p>
      </div>
      <div>
        <p onClick={closeModal}>X</p>
      </div>
    </div>
  );
}

function ListItem({item}) {
  let name = item.name;
  let quantity = item.quantity;

  return (
    <div>
      <p>{quantity}</p>
      <p>X</p>
      <p>{name}</p>
    </div>
  );
}

function ModalBody({item}) {
  let items = item.items;

  return (
    <div>
      {items.map((item, index) => {
        return (
          <ListItem  item={item} key={index}/>
        );
      })}
    </div>
  );
}

function OrderEnteredButton({modalVisible, setModalVisible, item}) {
  const {updateOrderStatus, getOrders} = useOrders();
  let id = item.id;

  let handleClick = () => {
      console.log(`Update status of ${id} to open`);
      try {
        updateOrderStatus(id, 'open');
        // getOrders();
        setModalVisible(!modalVisible);
      } catch (e) {
        alert(e.message);
      }
  };

  return (
    <div onClick={handleClick}>
      <p>Order was entered</p>
    </div>
  );
}

function OrderCompleteButton({modalVisible, setModalVisible, item}) {
  const {updateOrderStatus, getOrders} = useOrders();
  let id = item.id;

  const handleClick = () => {
      console.log( 'Send push notification altering the customer that the order is done');
      console.log(`Update status of ${id} to complete`);
      try {
        updateOrderStatus(id, 'complete');
        // getOrders()
        setModalVisible(!modalVisible);
      } catch (e) {
        alert(e.message);
      }
  };

  return (
    <>
      {item.status === 'complete' ? (
        <></>
      ) : (
        <div onClick={handleClick}>
          <p>Order is Complete</p>
        </div>
      )}
    </>
  );
}

function ModalFooter({modalVisible, setModalVisible, item}) {
  return (
    <div>
      {item.status === 'new' ? (
        <OrderEnteredButton
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
        />
        ) : (
          <OrderCompleteButton
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          item={item}
          />
          )}
    </div>
  );
}

function OrderItemModal({modalVisible, setModalVisible, item}) {
  return (
    <dialog className={modalVisible ? 'order-modal-visible' : 'order-modal-hidden'}>
      <ModalHeader
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
      <ModalBody item={item} />
      <ModalFooter
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
    </dialog>
  );
}

export default OrderItemModal;
