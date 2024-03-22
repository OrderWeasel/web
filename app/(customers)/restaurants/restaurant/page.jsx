"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FaTrash } from "react-icons/fa";
import useLocalStorage from '../../../../hooks/useLocalStorage';
import useMerchantData from '../../../../hooks/useMerchantData';
import useModal from '../../../../hooks/useModal';
import useCart from '../../../../hooks/useCart';

import CartModal from '../../../ui/cartModal';
import Modal from '../../../ui/modal';

function FoodCategory({category, items}) {
  const { openModalId, isVisible, handleItemClick} = useModal();

  return (
    <li>
    <h3>{category}</h3>
    <section>
      <ul className='grid grid-cols-2 lg:gap-4 md:gap-1'>
        {items.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() =>{handleItemClick(item)}}
              className='item bg-gray-500 m-2 flex rounded p-2 hover:bg-blue-500 hover:cursor-pointer'
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
                  <CartModal 
                    item={item}
                    onClose={() => {handleItemClick(item.id)}}
                    pathname={"Menu"}
                  />
                </div>
              </Modal>
            )}
 

              <div className='flex flex-col flex-1 justify-center'>
                <p className='flex-2'>{item.name}</p>
                <p className='flex-1 text-sm'>{item.description}</p>
                <p className='flex-2'>${item.cost}</p>
              </div>
              <figure className='flex flex-1 justify-end'>
                <Image src="/order_weasel.jpg" className='rounded-[3rem]' width={100} height={100} alt="The Order Weasel" />
              </figure>
            </li>
          )
        })}
      </ul>
    </section>
  </li>
  )
}

function MenuSection() {
  const {restaurantData, menuData} = useMerchantData();
  let {title, category, phone, address} = restaurantData;

  return (
    <section className='flex overflow-y-auto w-[70%] items-center pt-8 pb-8 border-r-2 border-indigo-500'>
    <div className='lg:w-[75%] md:w-[100%] pl-[10%]'>
      {/* <ModalExample /> */}
      <div>
        <h2>{title}</h2>
        <div className='m-2'>
          <p>Address: {address}</p>
          <p>Phone: {phone}</p>
          <p>style: {category}</p>
        </div>
      </div>
      <ul>
        {menuData.map((section, index) => {
          return (
            <FoodCategory category={section.title} items={section.data} key={index}/>
          )
        })}
      </ul>
    </div>
    </section>
  );
}

function CartItem({item}) {
  const {openModalId, isVisible, handleItemClick} = useModal();
  const {handleDelete} = useCart();
  // const {merchantId} = useMerchantData();
  let {id, name, cost, quantity} = item;

  return (
    <li
      onClick={() =>{handleItemClick(item)}}
      className='flex flex-row hover:cursor-pointer mb-2 justify-between ml-[10%] mr-[10%] border-t-2 border-gray-800 pl-2 pr-2'
    >
    {isVisible && openModalId === id && (
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
          <CartModal 
            item={item}
            onClose={() => {handleItemClick(id)}}
            pathname={"Cart"}
          />
        </div>
      </Modal>
    )}
      <p className='flex-initial w-[50%] text-center '>{quantity} x {name}</p>
      <p className='flex-initial w-[20%] text-left'>${(cost * quantity).toFixed(2)}</p>
      <figure
        onClick={(e) => {handleDelete(e, id)}}
        className='flex flex-1 self-center justify-center'
      >
        <FaTrash className='text-white hover:text-red-500' />
      </figure>
    </li>
  );
}

function CheckoutButton() {
  const searchParams = useSearchParams();
  let merchantId = searchParams.get('merchantId');

  const {calculateTaxAndTotals, cart} = useCart();
  const totals = calculateTaxAndTotals(cart)
 
  return (
    <Link className="link flex flex-1 items-center  justify-between"
      href={{
        pathname: '/restaurants/checkout', 
        query:{
          merchantId: merchantId,
          cart: cart,
          totals: totals,
        }
      }}
    > 
      <p>Checkout</p>
      <p>${(totals.total).toFixed(2)}</p>
    </Link>
  );
}

function CartSection({cart}) {
  return (
    <section className='flex text-center w-[30%]'>
    <h3 className='flex-initial h-[12%] flex-grow-0 mt-8'>{cart.length === 0 ? 'Your Cart is Empty' : 'Your Items'}</h3>
    <div className='flex flex-1 flex-grow'>
      <div className='flex-1 w-[90%] overflow-y-auto items-left items-left'>
        <ol>
          {cart.map((item, index) => {
          return (
            <CartItem item={item} key={index}/>
            );
          })}  
        </ol>
      </div>
    </div>
    <div className='flex flex-initial h-[12%] flex-grow-0 border-t-2 border-indigo-500 flex-row justify-center m-4 pl-2 pr-2 pt-2'>
      <CheckoutButton />
    </div>
    </section>
  );
}

export default function Restaurant(){
  const {cart, setCart} = useCart();
  const {loadCart} = useLocalStorage();
  const searchParams = useSearchParams();
  const {loadMenu, setMerchantId, loadRestaurantData} = useMerchantData();
  let merchantId = searchParams.get('merchantId');

  useEffect(() => {
    setMerchantId(merchantId);
    loadMenu(merchantId);
    loadRestaurantData(merchantId);
    let cart = loadCart(merchantId);
    if (cart !== null) {
      setCart(cart);
    }
  }, []); // eslint-disable-line 

  return (
    <main className='overflow-clip p-0'>
      <MenuSection />
      <CartSection cart={cart} />
      <div id="modal-root"></div>
    </main>
  );
}
