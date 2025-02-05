// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  // State untuk menyimpan produk unggulan yang diambil dari API
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect untuk mengambil data produk saat komponen dimount
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        // Misalnya, ambil 3 produk unggulan; Anda bisa mengubah logika ini sesuai kebutuhan
        setFeaturedProducts(response.data.slice(0, 3));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Elevate Your Style</h1>
          <p className="hero-subtitle">
            Discover our exclusive collection of luxury bags crafted with elegance.
          </p>
          <button className="hero-btn" onClick={() => window.location.href="/products"}>
            Explore Collection
          </button>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="featured">
        <h2 className="section-title">Featured Collection</h2>
        <div className="featured-products">
          {loading ? (
            <p>Loading products...</p>
          ) : featuredProducts.length === 0 ? (
            <p>No featured products found.</p>
          ) : (
            featuredProducts.map(product => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.title} />
                <h3>{product.title}</h3>
                <p className="price">${Number(product.price).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="info">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="info-text">
          Our bags are a symbol of refined taste. With premium materials, impeccable craftsmanship, and timeless designs, we provide an experience that redefines luxury.
        </p>
      </section>
    </div>
  );
}

export default Home;
