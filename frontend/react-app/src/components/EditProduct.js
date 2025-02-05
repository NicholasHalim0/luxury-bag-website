// src/components/EditProduct.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  // Muat data produk berdasarkan id
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        const product = response.data;
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setImageUrl(product.imageUrl);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setMessage('Error loading product details.');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, 
        { title, description, price, imageUrl },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage('Product updated successfully!');
      // Setelah berhasil, arahkan kembali ke halaman admin atau daftar produk
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error);
      setMessage('Failed to update product.');
    }
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="edit-product-form">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn-submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
