// backend/controllers/productController.js
const Product = require('../models/Products');

// Fungsi untuk mengambil detail produk berdasarkan id
const getProductById = async (req, res) => {
  try {
    console.log('Mencari produk dengan id:', req.params.id);
    const product = await Product.findById(req.params.id);
    console.log('Hasil query:', product);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found.' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Fungsi untuk menambahkan produk baru (Admin only)
const addProduct = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const product = new Product({ title, description, price, imageUrl });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error while adding product' });
  }
};

// Fungsi untuk mengambil semua produk (Public)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ message: 'Server error while retrieving products' });
  }
};

// Fungsi untuk mengupdate produk (Admin only)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { title, description, price, imageUrl },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

// Fungsi untuk menghapus produk (Admin only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};

// Gabungkan semua fungsi ke dalam satu objek module.exports
module.exports = { 
  getProductById,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct 
};
