// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', 
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      // Misal, respons login mengembalikan { token, email, isAdmin }
      const userData = { 
        token: response.data.token, 
        email: response.data.email, 
        isAdmin: response.data.isAdmin 
      };
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setMessage('Login successful!');
      navigate('/'); // Arahkan ke halaman Home setelah login
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error);
      setMessage('Login failed: ' + (error.response && error.response.data.message ? error.response.data.message : 'Unknown error'));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>
          <button type="submit" className="btn-auth">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
