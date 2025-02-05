// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Fungsi untuk menghasilkan token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Fungsi Registrasi User
const register = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  try {
    // Periksa apakah user sudah ada
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Untuk alasan keamanan, sebaiknya di lingkungan produksi isAdmin tidak bisa diset dari client
    user = new User({ email, password, isAdmin: isAdmin || false });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user)
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Fungsi Login User
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      message: 'Logged in successfully',
      token: generateToken(user),
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Fungsi Update Profile
const updateProfile = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Pastikan user sudah terautentikasi (misalnya, middleware protect telah mengisi req.user)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    user.email = email || user.email;
    if (password) {
      user.password = password; // Pre-save hook akan meng-hash password baru
    }
    await user.save();
    res.json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error during profile update.' });
  }
};

// Fungsi Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error during user deletion.' });
  }
};

// Contoh fungsi baru: Update Shipping Address
const updateShippingAddress = async (req, res) => {
  const { address, city, postalCode, country } = req.body;
  try {
    // Pastikan middleware proteksi telah mengisi req.user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // Misalnya, simpan data alamat pengiriman di properti baru di model User
    user.shippingAddress = { address, city, postalCode, country };
    await user.save();
    res.json({ message: 'Shipping address updated successfully.' });
  } catch (error) {
    console.error('Shipping address update error:', error);
    res.status(500).json({ message: 'Server error during shipping address update.' });
  }
};

// Gabungkan semua fungsi ke dalam satu objek dan ekspor
module.exports = {
  register,
  login,
  updateProfile,
  deleteUser,
  updateShippingAddress  // Fungsi baru ditambahkan di sini
};
