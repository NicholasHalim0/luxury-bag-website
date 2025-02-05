// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  paymentSuccess,
  paymentCancel,
  getAllOrders
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create a new order and initiate payment
router.post('/', protect, createOrder);

// @route   GET /api/orders/success
// @desc    Handle successful payment
router.get('/success', paymentSuccess);

// @route   GET /api/orders/cancel
// @desc    Handle cancelled payment
router.get('/cancel', paymentCancel);

// @route   GET /api/orders
// @desc    Get all orders (Admin)
router.get('/', protect, getAllOrders);

module.exports = router;
