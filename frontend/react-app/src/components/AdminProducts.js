// src/components/AdminProducts.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminProducts.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Ambil daftar produk dari API
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Fungsi untuk menghapus produk
  const handleDelete = async (id) => {
    try {
      // Pastikan Anda menambahkan token jika endpoint dilindungi oleh middleware protect
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Product deleted successfully.');
      // Update daftar produk
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error);
      setMessage('Failed to delete product.');
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="admin-products">
      <h2>Admin - Manage Products</h2>
      {message && <p className="message">{message}</p>}
      <table className="products-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>
                {/* Link untuk mengedit produk */}
                <Link to={`/admin/edit-product/${product._id}`} className="btn-edit">Edit</Link>
                {/* Tombol untuk menghapus produk */}
                <button onClick={() => handleDelete(product._id)} className="btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
