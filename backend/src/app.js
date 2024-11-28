const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');  // Add this line to require your orderRoutes

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the orderRoutes for any routes starting with /api/orders
app.use('/api/orders', orderRoutes);  // This line connects your order routes to the /api/orders endpoint

module.exports = app;
