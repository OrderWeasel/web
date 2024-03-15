"use client";
import Link from "next/link";
import restaurantsData from "../../lib/seedData/restaurantsData";
import Image from "next/image";

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
    <Link 
      href={{
        pathname: '/restaurants/restaurant', 
        query:{merchantId: id}
      }}
      className="bg-gray-500 mb-4 flex flex-row p-2 rounded"
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

      <Image src="/order_weasel.jpg" width={100} height={100} alt="The Order Weasel" />
      <div className='ml-2 flex-2'>
        <p>{title}</p>
        <p>Category: {category}</p>
        <p>Distance(mi): {distance}</p>
        <p>Rating: {rating}</p>
      </div>
    </Link>
  );
}

export default function Restaurants(){
  return (
    <main>
      <section> 
        <h2>Select a Restaurant</h2>

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
      </section>
    </main>
  );
}
