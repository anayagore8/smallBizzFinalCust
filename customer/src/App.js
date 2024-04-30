// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import GoogleSignInButton from './GoogleSignInButton';
// import WelcomeScreen from './WelcomeScreen';
// import Cardlist from './components/Cardlist';
// import ShopList from './components/ShopList';
// import ProductList from './ProductList';
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import BuyNowScreen from './BuyNowScreen';



// // Your Firebase initialization code here
// const firebaseConfig = {
//   apiKey: "AIzaSyD7XXwvVZ1uMhWFbaEQ3clSdBJn5sKkItU",
//   authDomain: "smallbusiness-26cbb.firebaseapp.com",
//   projectId: "smallbusiness-26cbb",
//   storageBucket: "smallbusiness-26cbb.appspot.com",
//   messagingSenderId: "144105488810",
//   appId: "1:144105488810:web:be17cb9dd0acb157312bd3",
//   measurementId: "G-9GQ2ZD1647"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// function App() {
//   return (
//     <Router>
//       <div>
       
//         <Routes> {/* Use Routes instead of Switch */}
//         <Route path="/welcome" element={<WelcomeScreen />} />
//           {/* <Route path="/" element={<GoogleSignInButton />} /> */}
//           <Route path="/signup" exact element={<Signup />} />
//           <Route path="/" exact element={<Navigate replace to="/login" />} />
//           <Route path="/login" exact element={<Login />} />
//           <Route path="/shops" element={<Cardlist />} />
//           {/* <Route path="/shop-list" element={<ShopList />} /> New route for ShopList */}
//           <Route path="/shop-list/:category" element={<ShopList />} />
//           <Route path="/shop/:shopId/products" element={<ProductList />} />
//           <Route path="/buy-now/:productId" element={<BuyNowScreen />} /> {/* Route for BuyNowScreen */}
        

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import GoogleSignInButton from './GoogleSignInButton';
import WelcomeScreen from './WelcomeScreen';
import Cardlist from './components/Cardlist';
import ShopList from './components/ShopList';
import ProductList from './ProductList';
import Login from "./components/Login";
import Signup from "./components/Signup";
import BuyNowScreen from './BuyNowScreen';
import { useState } from "react";





// Your Firebase initialization code here
const firebaseConfig = {
  apiKey: "AIzaSyD7XXwvVZ1uMhWFbaEQ3clSdBJn5sKkItU",
  authDomain: "smallbusiness-26cbb.firebaseapp.com",
  projectId: "smallbusiness-26cbb",
  storageBucket: "smallbusiness-26cbb.appspot.com",
  messagingSenderId: "144105488810",
  appId: "1:144105488810:web:be17cb9dd0acb157312bd3",
  measurementId: "G-9GQ2ZD1647"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [username, setUsername] = useState("");
  return (
    <Router>
      <div>
      
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/welcome" element={<WelcomeScreen username={username} />} /> {/* Pass username as prop */}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/" exact element={<Navigate replace to="/login" />} />
          <Route path="/login" exact element={<Login setUsername={setUsername} />} /> {/* Pass setUsername as prop */}
          <Route path="/shops" element={<Cardlist />} />
          {/* <Route path="/shop-list" element={<ShopList />} /> New route for ShopList */}
          <Route path="/shop-list/:category" element={<ShopList />} />
          <Route path="/shop/:shopId/products" element={<ProductList />} />
          <Route path="/buy-now/:productId" element={<BuyNowScreen />} /> {/* Route for BuyNowScreen */}
        

        </Routes>
      </div>
    </Router>
  );
}

export default App;