import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QuantityCounter from './QuantityCounter';

const BuyNowScreen = ({ userId }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

//   const handleBuyNow = async () => {
//     try {
//       const data = {
//         productId: product._id,
//         quantity: quantity, // Add quantity to data object
//         shopId: product.shopId // Add shopId to data object
//       };
//       await axios.post('http://localhost:5000/buy-now', data);
//       console.log('Product bought successfully');
//       //navigate('/'); // Redirect to home page after buying
//     } catch (error) {
//       console.error('Error buying product:', error);
//     }
// };
const handleBuyNow = async () => {
  try {
    const data = {
      orderDate: new Date(), // Add orderDate
      productName: product.name, // Add productName
      productId: product._id, // Add productId
      quantity: quantity, // Add quantity
      shopId: product.shopId, // Add shopId
      customerId: userId, // Add customerId
      orderStatus: 'pending' // Add orderStatus
    };
    await axios.post('http://localhost:5000/buy-now/', data);
    console.log('Product bought successfully');
    //navigate('/'); // Redirect to home page after buying
  } catch (error) {
    console.error('Error buying product:', error);
  }
};



const handleAddToCart = async () => {
  try {
      const data = {
          userId: userId,
          productId: product._id,
          productName: product.name,
          price: product.price,
          description: product.description,
          quantity: quantity,
          shopId: product.shopId // Include the shopId here
      };
      await axios.post('http://localhost:5000/add-to-cart', data);
      console.log('Product added to cart');
      navigate('/cart');
  } catch (error) {
      console.error('Error adding product to cart:', error);
  }
};


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <div>
          <h1>{product.name}</h1>
          <p>Description: {product.description}</p>
          <img src={product.image} alt={product.name} />
          <p>Price: {product.price}</p>
          <QuantityCounter
            quantity={quantity}
            onChange={(newQuantity) => setQuantity(newQuantity)}
          />
          <button onClick={handleBuyNow}>Buy Now</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default BuyNowScreen;
