const express = require('express');
const router = express.Router();
const { register, login, updateProfile, deleteUser, updateShippingAddress } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteUser);
// Rute untuk update shipping address
router.put('/shipping', protect, updateShippingAddress);

module.exports = router;
