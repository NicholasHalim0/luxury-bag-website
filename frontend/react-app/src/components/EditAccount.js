// src/components/EditAccount.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditAccount.css';

function EditAccount({ user, setUser }) {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAddress(user.address || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = user.token;
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        { name, address, phone, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage('Profile updated successfully!');
      const updatedUser = { ...user, name, address, phone, email };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="edit-account">
      <h2>Edit Account</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="edit-account-form">
        <label>Nama Lengkap:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama lengkap" 
          required 
        />
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email" 
          required 
        />
        <label>Alamat:</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Masukkan alamat lengkap" 
          required 
        />
        <label>Nomor Telepon:</label>
        <input 
          type="text" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Masukkan nomor telepon" 
          required 
        />
        <label>Password (opsional):</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan password baru jika ingin diubah" 
        />
        <button type="submit" className="btn-submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditAccount;
