// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Hubungkan ke database
connectDB();

const app = express();

// Middleware untuk parsing JSON dan mengaktifkan CORS
app.use(express.json());
app.use(cors());

// Mount routes untuk autentikasi, produk, dan pesanan
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Luxury Bags E-commerce API');
});

// Jalankan server pada port yang ditentukan
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
