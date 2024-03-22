"use client";
import React, {useState, useEffect} from 'react';

import useOrders from '../../../hooks/useOrders';
import useModal from '../../../hooks/useModal';
import Modal from '../../ui/modal';
import OrderItemModal from '../../ui/orderItemModal'

function OrderItem({item}) {
  const { openModalId, isVisible, handleItemClick} = useModal();

  let id = item.id;
  let orderId = item.order_id;
  let fullName = item.full_name;
  let customerPhone = item.phone;
  let timestamp = item.timestamp;
  return (
    <li 
      className="flex-initial h-30 bg-black p-2 mb-2 rounded hover:cursor-pointer hover:border-solid hover:border-blue-500 hover:border-2 hover:h-28" 
      onClick={() => {handleItemClick(item)}}
    >
    {isVisible && openModalId === item.id && (
      <Modal>
        <div 
          className='modal'
          id='modal-backdrop' 
          onClick={(e) => {
            e.stopPropagation();
            if (e.target.id === 'modal-backdrop') {
              handleItemClick(item);
            }
          }}
        >
          <OrderItemModal
            item={item}
            onClose={() => {handleItemClick(item.id)}}
          />
        </div>
      </Modal>
    )}
      <div>
        <p>OrderID: {orderId}</p>
        <p>Name: {fullName}</p>
        <p>Phone: {customerPhone}</p>
        <p>Timestamp: {timestamp}</p>
      </div>
    </li>
  );
}

function NewOrdersPanel() {
  const {orders} = useOrders();

  return (
    <div className='panel flex flex-1 flex-col overflow-y-auto'>
      <h3>New Orders</h3>
        <ul>
          {orders.new.map((item, index) => {
            return (
              <OrderItem item={item} key={index}/>
            );
          })}
        </ul>
    </div>
  );
}

function OpenOrdersPanel() {
  const {orders} = useOrders();

  return (
    <div className='panel flex flex-1 flex-col overflow-y-auto'>
      <h3>Open Orders</h3>
      <ul>
        {orders.open.map((item, index) => {
          return (
            <OrderItem item={item} key={index}/>
          );
        })}
      </ul>
    </div>
  );
}

function CompleteOrdersPanel() {
  const {orders} = useOrders();

  return (
    <div className='panel flex flex-1 flex-col overflow-y-auto'>
      <h3>Complete Orders</h3>
      <ul>
        {orders.complete.map((item, index) => {
          return (
            <OrderItem item={item} key={index}/>
          );
        })}
      </ul>
    </div>
  );
}

function Status() {
  const {takingOrders} = useOrders();
  return (
    <div className={ `${takingOrders ?'suspended-orders' : 'active-orders'} flex flex-initial h-[10%] justify-center items-center`}>
      <h2 className='text-center lg:text-[2rem] md:text-[2rem] sm:text-[2rem]'> {takingOrders ? 'Taking Orders' : 'Unavailable. Press Take Orders to start accepting new orders.'}</h2>
    </div>
  );
}

export default function Orders(){
  const {getOrders, takingOrders, setTakingOrders} = useOrders();

  useEffect(() => {
    setTakingOrders(false);
    getOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='p-0 flex flex-col overflow-clip justify-start'>
      <Status />
        <section className='flex flex-1 flex-row w-[100%] relative z-1'>
          <NewOrdersPanel />
          <OpenOrdersPanel />
          <CompleteOrdersPanel />

          {!takingOrders && (
            <div className='inactive-overlay'></div>
          )}
        </section>
        <div id="modal-root"></div>
    </main>
  );
}
