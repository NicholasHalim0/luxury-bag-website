// backend/controllers/orderController.js
const Order = require('../models/Order');
const paypal = require('../config/paypal');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Create order and initiate PayPal payment
const createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  const userId = req.user.id;

  // Create order in database with isPaid=false initially
  try {
    const order = new Order({ user: userId, products, totalAmount });
    await order.save();

    // Prepare PayPal payment JSON
    const create_payment_json = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      redirect_urls: {
        return_url: `http://localhost:${process.env.PORT}/api/orders/success?orderId=${order._id}`,
        cancel_url: `http://localhost:${process.env.PORT}/api/orders/cancel`
      },
      transactions: [
        {
          item_list: {
            items: products.map((p) => ({
              name: p.title,
              sku: p.product,
              price: p.price.toFixed(2),
              currency: 'USD',
              quantity: p.quantity
            }))
          },
          amount: {
            currency: 'USD',
            total: totalAmount.toFixed(2)
          },
          description: 'Purchase of luxury bags'
        }
      ]
    };

    // Create PayPal payment
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.error('PayPal payment creation error:', error);
        return res.status(500).json({ message: 'Error creating PayPal payment' });
      } else {
        // Find approval_url to redirect the user
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
        res.json({ approvalUrl });
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// Handle PayPal payment success
const paymentSuccess = async (req, res) => {
  const { paymentId, PayerID, orderId } = req.query;
  const execute_payment_json = {
    payer_id: PayerID
  };

  // Execute payment
  paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
    if (error) {
      console.error('Payment execution error:', error.response);
      return res.status(500).json({ message: 'Error executing PayPal payment' });
    } else {
      try {
        // Update order as paid
        const order = await Order.findByIdAndUpdate(orderId, { isPaid: true }, { new: true });

        // Send email notification to admin
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Order Received',
          text: `A new order has been placed. Order ID: ${order._id}`
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.error('Error sending email:', err);
          else console.log('Email sent:', info.response);
        });

        res.send('Payment successful. Your order has been processed.');
      } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ message: 'Server error updating order status' });
      }
    }
  });
};

// Handle payment cancellation
const paymentCancel = (req, res) => {
  res.send('Payment was cancelled.');
};

// Get all orders (Admin dashboard)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'email').populate('products.product', 'title price');
    res.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ message: 'Server error retrieving orders' });
  }
};

module.exports = { createOrder, paymentSuccess, paymentCancel, getAllOrders };
