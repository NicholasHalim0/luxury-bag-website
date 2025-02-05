// src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Token tidak ditemukan. Pastikan Anda sudah login.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products', 
        { title, description, price, imageUrl },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage('Product added successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error);
      setMessage('Failed to add product: ' + (error.response ? error.response.data.message : 'Unknown error'));
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-product-form">
        <label>Title:</label>
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          placeholder="Product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          placeholder="Product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
