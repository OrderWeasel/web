"use client";
import React, {createContext, useState, useEffect}  from 'react';
const MerchantDataContext = createContext(null);

const MerchantDataProvider = props => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [restaurantData, setRestaurantData] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [merchantId, setMerchantId] = useState(null);

  useEffect(() => {
    // console.log(JSON.stringify(merchantId) + " (merchantId at MerchantContext)");
  }, [merchantId]);

  useEffect(() => {
    //  console.log(JSON.stringify(menuData) + " (menuData at MerchantContext)");
  }, [menuData]);

  useEffect(() => {
    //  console.log(JSON.stringify(restaurantsData) + " (restaurantsData at MerchantContext)");
  }, [restaurantsData]);

  useEffect(() => {
    //  console.log(JSON.stringify(restaurantData) + " (restaurantData at MerchantContext)");
  }, [restaurantData]);

  return (
    <MerchantDataContext.Provider
      value={{
        menuData,
        merchantId,
        setMenuData,
        setMerchantId,
        restaurantData,
        restaurantsData,
        setRestaurantData,
        setRestaurantsData,
      }}>
      {props.children}
    </MerchantDataContext.Provider>
  );
};

export {MerchantDataContext, MerchantDataProvider};
