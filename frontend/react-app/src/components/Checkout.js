// src/components/Checkout.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleProceedToPayment = () => {
    // Pastikan user mengisi data alamat pengiriman
    if (!shippingAddress || !city || !postalCode || !country) {
      setMessage('Please fill in your shipping address completely.');
      return;
    }
    // Simpan informasi shipping ke localStorage atau state global jika diperlukan
    const shippingInfo = { shippingAddress, city, postalCode, country };
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    // Arahkan ke halaman payment
    navigate('/payment');
  };

  return (
    <div className="checkout">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.imageUrl} alt={item.title} />
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p>${Number(item.price).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="shipping-form">
            <h3>Shipping Address</h3>
            <input 
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Street address"
              required
            />
            <input 
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
            <input 
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
              required
            />
            <input 
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
          </div>
          {message && <p className="message">{message}</p>}
          <div className="cart-summary">
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleProceedToPayment}>Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
