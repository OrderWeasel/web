"use client";
import React, {useState, useEffect} from 'react';

import useOrders from '../../../hooks/useOrders';
import OrderItemModal from '../../ui/orderItemModal'

function OrderItem({item}) {
  const [modalVisible, setModalVisible] = useState(false);
  let id = item.id;
  let orderId = item.order_id;
  let fullName = item.full_name;
  let customerPhone = item.phone;
  let timestamp = item.timestamp;

  let handleClick = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <div className="flex-initial h-30 bg-black p-2 mb-2 rounded" onClick={handleClick}>
      <OrderItemModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
    />
      <p>OrderID: {orderId}</p>
      <p>Name: {fullName}</p>
      <p>Phone: {customerPhone}</p>
      <p>Timestamp: {timestamp}</p>
    </div>
  );
}

function NewOrdersPanel() {
  const {orders} = useOrders();

  return (
    <div className='panel flex flex-1 flex-col overflow-y-auto'>
      <h3>New Orders</h3>
      {orders.new.map((item, index) => {
        return (
          <OrderItem item={item} key={index}/>
        );
      })}
    </div>
  );
}

function OpenOrdersPanel() {
  const {orders} = useOrders();

  return (
    <div className='panel flex flex-1 flex-col overflow-y-auto'>
      <h3>Open Orders</h3>
      {orders.open.map((item, index) => {
        return (
          <OrderItem item={item} key={index}/>
        );
      })}
    </div>
  );
}

function CompleteOrdersPanel() {
  const {orders} = useOrders();

  return (
    <div className='panel flex flex-1 flex-col overflow-y-auto'>
      <h3>Complete Orders</h3>
      {orders.complete.map((item, index) => {
        return (
          <OrderItem item={item} key={index}/>
        );
      })}
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
  const {getOrders, takingOrders} = useOrders();

  useEffect(() => {
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
    </main>
  );
}
