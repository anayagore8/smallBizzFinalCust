// BuyNowScreen.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyNowScreen = ({ userId }) => {
  const { productId } = useParams(); // Get productId from URL params
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details based on productId
    const fetchProductDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/products/${productId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProduct(data); // Set product details
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product details:', error);
          // Handle error state
          setLoading(false);
        }
      };
  
      fetchProductDetails();
    }, [productId]);
      

  const handleBuyNow = () => {
    // Implement buy now functionality
    console.log('Buy now clicked');
  };

  const handleAddToCart = async () => {
    try {
        const data = {
            userId:userId, // Use props.userId to access userId
            productId: product._id,
            productName: product.name,
            price: product.price,
            description: product.description
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