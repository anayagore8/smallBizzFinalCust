
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Cards = ({ products, handleCardClick }) => {
  const handleClick = (category) => {
    if (handleCardClick) {
      handleCardClick(category);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {products.map((product) => (
        <Card key={product.id} style={{ margin: '10px', width: '200px', cursor: 'pointer' }} onClick={() => handleClick(product.name)}>
          <CardContent>
            <Typography variant="h6" component="div">
              {product.name}
            </Typography>
            <img src={product.image} alt={product.name} style={{ width: '100%', marginTop: '10px' }} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
