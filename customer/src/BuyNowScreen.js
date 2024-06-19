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

  const handleBuyNow = async () => {
    try {
      const orderData = {
        amount: product.price * quantity * 100, // Razorpay amount in paisa
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`,
      };

      // Create order on the server
      const orderResponse = await axios.post('http://localhost:5000/create-order', orderData);
      const { orderId } = orderResponse.data;

      const options = {
        key: 'rzp_test_wvOxIU5j9WDMOH', // Replace with your Razorpay Key ID
        amount: orderData.amount,
        currency: 'INR',
        name: product.name,
        description: product.description,
        image: product.image,
        order_id: orderId,
        handler: async (response) => {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            productId: product._id,
            quantity: quantity,
            shopId: product.shopId,
            customerId: userId,
            orderStatus: 'completed',
            orderDate: new Date(),
          };

          await axios.post('http://localhost:5000/buy-now', paymentData);
          await axios.post('http://localhost:5000/record-transaction', paymentData); // Record transaction
          console.log('Product bought successfully');
          navigate('/'); // Redirect to home page after buying
        },
        prefill: {
          name: 'Your Customer Name',
          email: 'customer.email@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Customer Address',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment process:', error);
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
        shopId: product.shopId, // Include the shopId here
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
