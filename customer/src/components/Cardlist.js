import React, { useState } from 'react';
import Cards from './Cards';
import { fetchShopDataByCategory } from '../service/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import foodImage from './food.jpg';
import eCom from './ecomm.jpg';
import Retail from './retail.jpg'
import Manuf from './manu.jpg'
import Finance from './finance.jpg'
import Health from './healthcare.jpg'
import Tech from './tech.jpg'
import Agric from './agri.jpg'
import Tourism from './tour.jpg'
import Edu from './edu.jpg'
import RealEstate from './real.jpg'
import Serv from './services.jpg'

const Cardlist = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically

  const handleCardClick = async (category) => {
    try {
      const data = await fetchShopDataByCategory(category);
      // Navigate to the shop-list route with the fetched category
      navigate(`/shop-list/${category}`);
    } catch (error) {
      console.error('Error fetching shop data:', error);
      setError('Failed to fetch shop data. Please try again later.');
    }
  };

  const products = [
    { id: 1, name: 'Retail', image: Retail },
    { id: 2, name: 'Food and Beverage', image: foodImage },
    { id: 3, name: 'Services', image: Serv },
    { id: 4, name: 'E-commerce', image: eCom },
    { id: 5, name: 'Healthcare', image: Health },
    { id: 6, name: 'Technology', image: Tech },
    { id: 7, name: 'Manufacturing', image: Manuf},
    { id: 8, name: 'Agriculture and Agribusiness', image: Agric },
    { id: 9, name: 'Tourism and Hosptality', image: Tourism},
    { id: 10, name: 'Education and Training', image: Edu },
    { id: 11, name: 'Financial Services', image: Finance },
    { id: 12, name: 'Real Estate', image: RealEstate },
    
  ];

  return (
    <>
      <Cards products={products} handleCardClick={handleCardClick} />
      {error && <div>Error: {error}</div>}
    </>
  );
};

export default Cardlist;
