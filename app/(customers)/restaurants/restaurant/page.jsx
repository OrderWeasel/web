"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaTrash } from "react-icons/fa";
import CartModal from '../../../ui/cartModal';
import useCart from '../../../../hooks/useCart';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import useModal from '../../../../hooks/useModal';


// temporary------------------------------

import menuData from '../../../lib/seedData/menuData';
import restaurantsData from '../../../lib/seedData/restaurantsData';
let getMenu = (id) => {
  return menuData[id];
}

let getRestaurant = (id) => {
  return restaurantsData.find(res => res.id === Number(id));
};

//---------------------------------------

function FoodCategory({category, items}) {
  const {closeModal, openModalId, handleItemClick} = useModal();
  return (
    <li>
    <h3>{category}</h3>
    <section>
      <ul className='grid grid-cols-2 lg:gap-4 md:gap-1'>
        {items.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {handleItemClick(item)}}
              className='item bg-gray-500 m-2 flex rounded p-2 hover:bg-blue-500 hover:cursor-pointer'
            >
              {
                openModalId === item.id && (
                  <CartModal 
                    item={item} 
                    isOpen={true} 
                    onClose={closeModal} 
                    pathname={"Menu"} 
                  />
                )
              }

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

function MenuSection({menu, restaurantInfo}) {
  let {title, category, phone, address} = restaurantInfo;
  return (
    <section className='flex overflow-y-auto w-[70%] items-center pt-8 pb-8 border-r-2 border-indigo-500'>
    <div className='lg:w-[75%] md:w-[100%] pl-[10%]'>
      <div>
        <h2>{title}</h2>
        <div className='m-2'>
          <p>Address: {address}</p>
          <p>Phone: {phone}</p>
          <p>style: {category}</p>
        </div>
      </div>
      <ul>
        {menu.map((section, index) => {
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
  const {deleteItem, cart} = useCart();
  let id = item.id;
  let name = item.name;
  let cost = item.cost;
  let quantity = item.quantity;
  const [modalVisible, setModalVisible] = useState(false);

  let searchParams = useSearchParams();
  let merchantId = searchParams.get('merchantId');

  let handleDelete = (e) => {
    deleteItem(merchantId, id);
  };

  return (
    <li
      onClick={handleClick}
    >
      <CartModal 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
        cart={cart}
        pathname="Cart"
      />
      <p>{quantity} x {name}</p>
      <p>${(cost * quantity).toFixed(2)}</p>
      <figure
        onClick={handleDelete}
      >
        <FaTrash />
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

  let merchantId = searchParams.get('merchantId');

  // temporary ------------------------------------
  let menu = getMenu(merchantId);
  let restaurantInfo = getRestaurant(merchantId);

  // load the menu for the given merchant id
  // load the cart for the given merchant id
  // -----------------------------------------------

  useEffect(() => {
    (async function () {
      try {
        let cart = loadCart(merchantId);
        if (cart !== null) {
          setCart(cart);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []); // eslint-disable-line 

  return (
    <main className='overflow-clip p-0'>
      <MenuSection menu={menu} restaurantInfo={restaurantInfo} />
      <CartSection cart={cart} />
    </main>
  );
}




  // const {cart, setCart, cartTotal} = useCart();
  // const {loadCart} = useLocalStorage();
  // const searchParams = useSearchParams();
  // let merchantId = searchParams.get('merchantId');

  // // we get the data using the merchant id rather than prop drilling
  // // likely an API request in production
  // let menu = getMenu(merchantId);
  // let restaurant = getRestaurant(merchantId);
  // let {title, category, phone, address} = restaurant;

  // // load the menu for the given merchant id
  // // load the cart for the given restaurant

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       // setResId(restaurantId);
  //       // loadMenu(restaurantId);

  //       let cart = loadCart(merchantId);
  //       if (cart !== null) {
  //         setCart(cart);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []); // eslint-disable-line 