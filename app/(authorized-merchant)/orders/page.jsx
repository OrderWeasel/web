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
    <div className="bg-grey-500" onClick={handleClick}>
      <OrderItemModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
      <p>
        OrderID: {orderId}
      </p>
      <p>Name: {fullName}</p>
      <p>
        Phone: {customerPhone}
      </p>
      <p>
        Timestamp: {timestamp}
      </p>
    </div>
  );
}

function NewOrdersPanel() {
  const {orders} = useOrders();

  return (
    <div className='flex-1 panel'>
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
    <div className='flex-1 panel'>
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
    <div className='flex-1 panel'>
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
      <h2 className='text-center lg:text-[3rem] md:text-[2rem]'> {takingOrders ? 'Taking Orders' : 'Unavailable. Press Take Orders to start accepting new orders.'}</h2>
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
      <section className={`${takingOrders ? 'active' : 'inactive'} flex flex-1 flex-row w-[100%]`}>
        <NewOrdersPanel />
        <OpenOrdersPanel />
        <CompleteOrdersPanel />
      </section>
    </main>
  );
}
