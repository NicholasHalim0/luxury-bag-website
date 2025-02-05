// src/components/Header.js
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user, setUser }) {
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowAccountDropdown(false);
    navigate('/');
  };

  const handleEditAccount = () => {
    navigate('/edit-account');
    setShowAccountDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-wrapper">
        <Link to="/" className="logo">LUXURY BAGS</Link>
        <nav className="nav">
          <NavLink to="/" className="nav-item" end>Home</NavLink>
          <NavLink to="/products" className="nav-item">Produk</NavLink>
          {user && user.isAdmin && (
            <>
              <NavLink to="/add-product" className="nav-item">Add Product</NavLink>
              <NavLink to="/admin" className="nav-item">Dashboard</NavLink>
            </>
          )}
          <NavLink to="/checkout" className="nav-item">🛒</NavLink>
          {user ? (
            <div className="account-menu">
              <span
                className="account-icon"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              >
                👤
              </span>
              {showAccountDropdown && (
                <div className="account-dropdown">
                  {/* Tampilkan username jika ada, jika tidak fallback ke email */}
                  <p className="account-info">{user.name || user.email}</p>
                  <button onClick={handleEditAccount} className="dropdown-btn">
                    Edit Account
                  </button>
                  <button onClick={handleLogout} className="dropdown-btn">
                    Logout
                  </button>
                  <button
                    onClick={() => setShowAccountDropdown(false)}
                    className="dropdown-close"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-menu">
              <button onClick={() => setShowAuthDropdown(!showAuthDropdown)} className="btn-auth">
                Login
              </button>
              {showAuthDropdown && (
                <div className="auth-dropdown">
                  <NavLink
                    to="/login"
                    onClick={() => setShowAuthDropdown(false)}
                    className="dropdown-link"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setShowAuthDropdown(false)}
                    className="dropdown-link"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
