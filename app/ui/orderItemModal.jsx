"use client"
import React from 'react';
import useOrders from '../../hooks/useOrders';
import { GrClose } from "react-icons/gr";

function ListItem({item}) {
  let name = item.name;
  let quantity = item.quantity;

  return (
    <div className='flex flex-row border-b-2 border-grey-500 items-center'>
      <p className='flex-initial w-[20%] text-center'>{quantity}</p>
      <p className='flex-initial w-[10%]'>X</p>
      <p className='flex-1'>{name}</p>
    </div>
  );
}

function OrderEnteredButton({item, onClose}) {
  const {updateOrderStatus, getOrders} = useOrders();
  let id = item.id;

  let handleClick = (e) => {
      e.stopPropagation();
      console.log(`Update status of ${id} to open`);
      try {
        updateOrderStatus(id, 'open');
        onClose();
      } catch (e) {
        alert(e.message);
      }
  };

  return (
    <div className="link hover:cursor-pointer" onClick={handleClick}>Order was entered</div>
  );
}

function OrderCompleteButton({item, onClose}) {
  const {updateOrderStatus, getOrders} = useOrders();
  let id = item.id;

  const handleClick = (e) => {
      e.stopPropagation();
      console.log( 'Send push notification altering the customer that the order is done');
      console.log(`Update status of ${id} to complete`);
      try {
        updateOrderStatus(id, 'complete');
        onClose();
      } catch (e) {
        alert(e.message);
      }
  };

  return (
    <>
      {item.status === 'complete' ? (
        <></>
      ) : (
        <div onClick={handleClick}  className="link hover:cursor-pointer" >Order is Complete</div>
      )}
    </>
  );
}

function OrderItemModal({item, onClose}) {
  const fullName = item.full_name;
  const phone = item.phone;
  const items = item.items;
  const status = item.status;

  return (
    <div className='modal-content flex flex-col lg:h-[35%] lg:w-[25%] md:h-[45%] sm:h-[45%] sm:w-[35%]'>
      <div className='flex flex-initial flex-grow-0 h-[20%] flex-row border-b-2 border-grey-500 p-2 items-center'>
        <div className='flex-1 flex-row p-2 items-center'>
          <p>Customer: {fullName}</p>
          <p>Phone: {phone}</p>
        </div>
        <div className='hover:cursor-pointer p-4' onClick={onClose}>
          <GrClose />
        </div>
      </div>
      <div className='flex flex-1 flex-col align-center  justify-start border-b-2 border-grey-500 p-2'>
        <h3>Items:</h3>
        {items.map((item, index) => {
          return (
            <ListItem  item={item} key={index}/>
          );
        })}
      </div>
      <div className='flex flex-initial flex-grow-0 h-[20%] flex-row p-2 justify-end'>
        {item.status === 'new' ? (
          <OrderEnteredButton
            onClose={onClose}
            item={item}
          />
          ) : (
            <OrderCompleteButton
              onClose={onClose}
              item={item}
            />
            )}
      </div>
    </div>
  );
}

export default OrderItemModal;
