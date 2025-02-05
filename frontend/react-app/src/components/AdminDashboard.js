// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk mengambil data produk dari backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setMessage('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  // Fungsi untuk menghapus produk
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Product deleted successfully.');
      // Update state produk dengan menghapus produk yang sudah dihapus
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error);
      setMessage('Failed to delete product.');
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Di sini admin dapat mengelola produk, mengedit, dan menghapus produk.</p>
      {message && <p className="message">{message}</p>}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
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
                  {/* Tombol Edit mengarahkan ke halaman EditProduct dengan id produk */}
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                  >
                    Edit
                  </button>
                  {/* Tombol Delete memanggil fungsi handleDelete */}
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
