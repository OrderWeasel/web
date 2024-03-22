"use client";
import {useContext} from 'react';
import { MerchantDataContext } from '../contexts/MerchantDataContext.jsx';

// importing seed restaurant data
import resData from '../app/lib/seedData/restaurantsData.js';

// importing seed menu data
import mData from '../app/lib/seedData/menuData.js';

const useMerchantData = () => {
  const {
    menuData,
    setMenuData,
    merchantId,
    setMerchantId,
    restaurantData,
    restaurantsData,
    setRestaurantData,
    setRestaurantsData,
  } = useContext(MerchantDataContext);

  // refactor to fetch data
  // based on proximity - takes location?
  function loadRestaurants() {
    setRestaurantsData(resData);
  }

  // refactor to fetch data
  function loadMenu(merchantId) {
    let getMenuData = (id) => {
      return mData[id];
    };
    
    setMenuData(getMenuData(merchantId));
  }

  // helpers // loads restaurant from restaurantsData
  function loadRestaurantData(id){
    let restaurant = restaurantsData.find(res => res.id === Number(id));
    setRestaurantData(restaurant);
  };
  
  return {
    menuData,
    loadMenu,
    merchantId,
    setMerchantId,
    restaurantData,
    restaurantsData,
    loadRestaurants,
    loadRestaurantData,
  };
};

export default useMerchantData;
