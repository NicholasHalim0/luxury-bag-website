// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Register from './components/Register';
import EditAccount from './components/EditAccount'; // Import komponen EditAccount
import AddProduct from './components/AddProduct';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import AdminProducts from './components/AdminProducts';
import EditProduct from './components/EditProduct';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          {/* Rute Edit Account, bisa diakses oleh user yang sudah login */}
          <Route path="/edit-account" element={<EditAccount user={user} setUser={setUser} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/add-product" element={
            <AdminRoute user={user}>
              <AddProduct />
            </AdminRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute user={user}>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/edit-product/:id" element={
            <AdminRoute user={user}>
              <EditProduct />
            </AdminRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
