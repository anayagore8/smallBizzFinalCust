// import { Grid, Card, CardContent, CardMedia, Typography, styled } from "@mui/material";

// // Styled components
// const CardStyle = styled(Card)`
//   margin: 20px;
//   height: 42vh;
//   width: 200px;
// `;

// const GridStyle = styled(Grid)`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   padding-top: 20px;
// `;

// const Container = styled('div')`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const SmallCardContent = styled(CardContent)`
//   padding: 10px;
// `;

// const SmallTypography = styled(Typography)`
//   font-size: 16px;
//   text-align: center;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
// `;

// // Cards component
// const Cards = ({ products, onClickCard }) => {
//   const handleClick = async (category) => {
//     // Implement your function to retrieve data from MongoDB based on the category clicked
//     try {
//       const response = await fetch(`mongodb+srv://ayushgurav6:Ayush123@smallbizz.rwgr6tg.mongodb.net/?retryWrites=true&w=majority&appName=SmallBizz/test_customer/${category}`);
//       const data = await response.json();
//       // Handle the retrieved data, e.g., display it in a modal or update the UI
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching data from MongoDB:', error);
//     }
//   };

//   return (
//     <Container>
//       <GridStyle container spacing={2}>
//         {products.map((product) => (
//           <Grid item key={product.id}>
//             <CardStyle onClick={() => handleClick(product.name)}>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={product.image}
//                 alt={product.name}
//               />
//               <SmallCardContent>
//                 <SmallTypography variant="h6" component="div">
//                   {product.name}
//                 </SmallTypography>
//               </SmallCardContent>
//             </CardStyle>
//           </Grid>
//         ))}
//       </GridStyle>
//     </Container>
//   );
// };

// export default Cards;
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
