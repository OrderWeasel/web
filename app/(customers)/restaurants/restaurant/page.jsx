"use client";
import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import menuData from '../../../lib/seedData/menuData';
import restaurantsData from '../../../lib/seedData/restaurantsData';
import CartModal from '../../../ui/cartModal';
import Link from 'next/link';
import useCart from '../../../../hooks/useCart';
import Image from 'next/image';

let getMenu = (id) => {
  return menuData[id];
}

let getRestaurant = (id) => {
  return restaurantsData.find(res => res.id === Number(id));
};

function FoodItem({item}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {cart} = useCart();

  let displayModal = () => {setModalVisible(!modalVisible)}

  const {id, name, cost, description, picture} = item;

  return (
    <div
      onClick={displayModal}
      className='bg-gray-500 m-2 flex rounded p-2 item'
    >
      <CartModal cart={cart} item={item}/>
      <div className='flex-col flex-1 item-center'>
        <p>{name}</p>
        <p>{description}</p>
        <p>${cost}</p>
      </div>
      <div className='flex-2'>
        <Image src="/order_weasel.jpg" width={100} height={100} alt="The Order Weasel" />
      </div>
    </div>
  );
}

function FoodCategory({category, items}) {
  return (
    <>
    <h3>{category}</h3>
    <section className='grid grid-cols-2 lg:gap-4 md:gap-1'>
      {items.map((item, index) => {
        return (
          <FoodItem item={item} key={index}/>
          )
        })}
    </section>
  </>
  )
}

function MenuSection() {
  const searchParams = useSearchParams();
  let merchantId = searchParams.get('merchantId');
  let menu = getMenu(merchantId);
  let restaurant = getRestaurant(merchantId);

  return (
    <section className='flex overflow-y-auto w-[70%] items-center pt-12 pb-12'>
    <div className='lg:w-[75%] md:w-[100%] pl-[10%]'>
      <h2>{restaurant.title}</h2>
      {menu.map((section, index) => {
        return (
          <FoodCategory category={section.title} items={section.data} key={index}/>
          )
        })}
    </div>
    </section>
  );
}

function CartSection() {
  const {cart} = useCart();
  return (
    <section className='flex border-l-1 border-indigo-500 p-12 text-center w-[30%]'>
    <h3 className='flex-initial h-[12%] flex-grow-0'>{cart.length === 0 ? 'Your Cart is Empty' : 'Your Items'}</h3>
    <div className='flex flex-1 flex-grow'>
      <div className='flex-1 w-[90%] bg-pink-100 overflow-y-auto items-left items-left'>
        

      </div>
    </div>
    <div className='flex flex-initial h-[12%] flex-grow-0 border-t-2 border-indigo-500 flex-row justify-center'>
        <CheckoutButton />
    </div>
    </section>
  );
}

function CheckoutButton() {
  const {cartTotal} = useCart();

  return (
    <Link className="link flex" href="/restaurants/checkout"> 
      <p className='mr-10'>Checkout</p>
      <p>{cartTotal()}</p>
    </Link>
  );
}

export default function Restaurant(){
  // useEffect here to load menu for id
  return (
    <main className='overflow-clip p-0'>
      <MenuSection />
      <CartSection />
    </main>
  );
}
