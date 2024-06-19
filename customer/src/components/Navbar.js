import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { AccountCircle, ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from 'axios';

function Navbar({ userId }) {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (userId) {
      // Fetch number of items in the cart for the user
      axios.get(`http://localhost:5000/cart/${userId}/count`)
        .then(response => {
          setCartItemCount(response.data.count);
        })
        .catch(error => {
          console.error('Error fetching cart item count:', error);
        });
    }
  }, [userId]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Small BiZZ
        </Typography>
        <div>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            component={Link}
            to="/cart"
          >
            {cartItemCount > 0 && <span style={{ marginRight: 5 }}>{cartItemCount}</span>}
            <ShoppingBasket />
            
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            component={Link}
            to="/profile"
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1 }}>
            {/* {userId ? `User ID: ${userId}` : 'Not logged in'} */}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
