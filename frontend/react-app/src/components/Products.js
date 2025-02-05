// src/components/Products.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        console.log('Data produk dari API:', response.data); // Cek data di console
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="products-page">
      <h2 className="section-title">Our Exclusive Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${Number(product.price).toFixed(2)}</p>
            <Link to={`/products/${product._id}`} className="detail-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
