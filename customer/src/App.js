import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import Cardlist from './components/Cardlist';
import ShopList from './components/ShopList';
import ProductList from './ProductList';
import Login from "./components/Login";
import Signup from "./components/Signup";
import BuyNowScreen from './BuyNowScreen';
import CartList from './components/CartList';

function App() {
  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
    setUserId(userId);
    // You can also store userId in localStorage or sessionStorage for persistent login
    // localStorage.setItem('userId', userId);
  };

  const handleLogout = () => {
    setUserId(null);
    // localStorage.removeItem('userId');
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/welcome" element={<WelcomeScreen userId={userId} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/shops" element={<Cardlist />} />
          <Route path="/shop-list/:category" element={<ShopList />} />
          <Route path="/shop/:shopId/products" element={<ProductList />} />
          <Route path="/buy-now/:productId" element={<BuyNowScreen userId={userId} />} />
          <Route path="/cart" element={<CartList userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
