// CartList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Counter from './Counter'; // Import the Counter component
import './cartItem.css'; // Import the CSS file

function CartList({ userId }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (userId) {
      // Fetch cart items for the logged-in user
      axios.get(`http://localhost:5000/cart/${userId}/items`)
        .then(response => {
          setCartItems(response.data);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [userId]);

  const handleCountUpdate = (itemId, newCount) => {
    // Update the count of the cart item in the database
    axios.put(`http://localhost:5000/cart/${itemId}/count`, { count: newCount })
      .then(response => {
        // Update the local state if the database update is successful
        if (newCount === 0) {
          // If the count becomes zero, delete the item
          handleDeleteItem(itemId);
        } else {
          setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
              if (item._id === itemId) {
                // Update the count of the specific item
                return { ...item, count: newCount };
              }
              return item;
            });
            return updatedItems;
          });
        }
      })
      .catch(error => {
        console.error('Error updating count:', error);
      });
};

const handleDeleteItem = (itemId) => {
    axios.delete(`http://localhost:5000/cart/${itemId}`)
      .then(response => {
        // Remove the item from the cart items state
        setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
};


  return (
    <div>
      <h1>Cart Items</h1>
      <div className="cart-container">
        {cartItems.map(item => (
          <div className="card" key={item._id}>
            <h3>{item.productName}</h3>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
            <Counter initialValue={item.count} onUpdate={newCount => handleCountUpdate(item._id, newCount)} />
            <p>Count in Cart: {item.count}</p>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;
