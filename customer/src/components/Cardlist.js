import React, { useState } from 'react';
import Cards from './Cards';
import { fetchShopDataByCategory } from '../service/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import foodImage from './food.jpg';
import Retail from './retail.jpg';
import Health from './healthcare.jpg';
import Agric from './agri.jpg';
import Tourism from './tour.jpg';
import Edu from './edu.jpg';
import Serv from './services.jpg';
import Art from './art.png';
import Fitness from './fitness.jpeg';
import Others from './others.png';

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
{ id: 2, name: 'Food and Beverages', image: foodImage },
{ id: 3, name: 'Services', image: Serv },
{ id: 4, name: 'Healthcare', image: Health },
{ id: 5, name: 'Agriculture', image: Agric },
{ id: 6, name: 'Tourism and Hospitality', image: Tourism },
{ id: 7, name: 'Education and Training', image: Edu },
{ id: 8, name: 'Art and Handicrafts', image: Art },
{ id: 9, name: 'Health and Fitness', image: Fitness },
{ id: 10, name: 'Others', image: Others },
];

return (
<>
<Cards products={products} handleCardClick={handleCardClick} />
{error && <div>Error: {error}</div>}
</>
);
};

export default Cardlist;