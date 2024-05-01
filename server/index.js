// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const shopRoutes=require("./router/cust");
const authRoutes=require("./router/auth");
const app = express();
const session = require('express-session')

// Enable CORS
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayushgurav6:Ayush123@smallbizz.rwgr6tg.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});

// Define schema for shop collection
const shopSchema = new mongoose.Schema({
    name: String,
    category: String,
    // Add more fields as per your data structure
});

// Define model for shop collection
const Shop = mongoose.model('Shop', shopSchema);

// Define schema for product collection
const productSchema = new mongoose.Schema({
    name: String,
    shopId: mongoose.Types.ObjectId, // Reference to the shop ID
    // Add more fields as per your data structure
});

// Define model for product collection
const Product = mongoose.model('Product', productSchema);

// Fetch all data from shop collection
const fetchShops = async () => {
    try {
        const shops = await Product.find({});
        console.log("All Shops:", shops);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call fetchShops to fetch data
fetchShops();

// Define a route to display all shops
app.get('/users', async (req, res) => {
    try {
        const shops = await Shop.find({});
        res.json(shops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Define a route to display shops by category
app.get('/users/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const shops = await Shop.find({ category: category });
        res.json(shops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Modify the route to fetch products by shop ID
app.get('/shop/:shopId/products', async (req, res) => {
    const shopId = req.params.shopId;
    try {
        const products = await Product.find({ shopId: shopId });
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Add middleware for session management
app.use(session({
    secret: 'c6438a7fe3de5a86596e892c13994a33f7590c5228305aafae981344f059d5b5 ', // Change this to a secure random key
    resave: false,
    saveUninitialized: false
  }));



  // Define schema for cart collection
const cartSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    productName: String,
    price: Number,
    description: String,
    count: { type: Number, default: 1 }
});

// Define model for cart collection
const CartItem = mongoose.model('CartItem', cartSchema);

// Route to add product to cart
app.post('/add-to-cart', async (req, res) => {
    const { userId, productId, productName, price, description } = req.body;
    try {
        const cartItem = new CartItem({
            userId,
            productId,
            productName,
            price,
            description
        });
        await cartItem.save();
        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to fetch cart items for a user
app.get('/cart/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const cartItems = await CartItem.find({ userId });
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to count total number of cart items for a user
app.get('/cart/:userId/count', async (req, res) => {
    const userId = req.params.userId;
    try {
        const cartItemCount = await CartItem.countDocuments({ userId });
        res.json({ count: cartItemCount });
    } catch (error) {
        console.error("Error counting cart items:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/cart/:userId/items', async (req, res) => {
    const userId = req.params.userId;
    try {
        const cartItems = await CartItem.find({ userId });
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to update the count of a cart item
// index.js

// Route to update the count of a cart item
app.put('/cart/:itemId/count', async (req, res) => {
    const itemId = req.params.itemId;
    const { count } = req.body;
    try {
      // Find the cart item by its ID and update the count
      const updatedItem = await CartItem.findByIdAndUpdate(itemId, { count }, { new: true });
      if (!updatedItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating cart item count:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
// Route to delete a cart item
app.delete('/cart/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    try {
        // Delete the cart item by its ID
        const deletedItem = await CartItem.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).send("Internal Server Error");
    }
});



app.use("/api/shops",shopRoutes);
app.use("/api/auth",authRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});