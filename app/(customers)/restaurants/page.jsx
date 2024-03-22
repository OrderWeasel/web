"use client";
import React, {useEffect} from 'react';
import Link from "next/link";
import Image from "next/image";
import useMerchantData from '../../../hooks/useMerchantData';

function RestaurantItem({
  id,
  title,
  category,
  distance,
  rating,
  phone,
  hours,
  address,
}) {
  return (
    <li className='bg-gray-500 rounded'>
      <Link 
        href={{
          pathname: '/restaurants/restaurant', 
          query:{
            merchantId: id
          }
        }}
        className="bg-gray-500 flex flex-row p-2 justify-between rounded hover:bg-blue-500"
        info={{         
          id,
          title,
          category,
          distance,
          rating,
          phone,
          hours,
          address,}}
          >

        <figure className='flex flex-initial w-[30%] mr-2 flex-col justify-center'>
          <Image src="/order_weasel.jpg" className="rounded-[3rem]" width={100} height={100} alt="The Order Weasel" />
        </figure>
        <div className='flex flex-auto flex-col'>
          <h3>{title}</h3>
          <p>Category: {category}</p>
          <p>Distance(mi): {distance}</p>
          <p>Rating: {rating}</p>
        </div>
      </Link>
    </li>  
  );
}

export default function Restaurants(){
  const {loadRestaurants, restaurantsData} = useMerchantData();
  // const {requestNotificationsPermissions, getFCMToken, usePushNotifications} = usePush();

  // useEffect(() => {
  //   (async function(){
	//     try {
	// 	    if (usePushNotifications) {
	// 	      await getFCMToken();
	// 	      await requestNotificationsPermissions();
	// 	    }
	//     } catch (e) {
	// 			console.log(e.message);
	//     }
  //   })();
  // },[]);

  // need an api to getRestaurants
  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <main>
      <section> 
        <h2>Select a Restaurant</h2>
        <ul className="grid grid-cols-2 gap-4">
          {restaurantsData.map((restaurant, index) => {
            return (
              <RestaurantItem 
              id={restaurant.id}
              title={restaurant.title}
              category={restaurant.category}
              distance={restaurant.distance}
              rating={restaurant.rating}
              phone={restaurant.phone}
              hours={restaurant.hours}
              address={restaurant.address}
              key={index}
              />
              );
            })}
          </ul>
      </section>
    </main>
  );
}
