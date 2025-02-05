const express = require('express');
const router = express.Router();
const { getProductById, addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.get('/', getProducts);            // Ambil semua produk
router.get('/:id', getProductById);        // Ambil detail produk berdasarkan id
router.post('/', protect, addProduct);     // Tambah produk (untuk admin)
router.put('/:id', protect, updateProduct);  // Update produk
router.delete('/:id', protect, deleteProduct); // Delete produk

module.exports = router;
