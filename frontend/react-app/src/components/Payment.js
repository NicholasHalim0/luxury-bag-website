// Misalnya, di Payment.js
import React, { useContext } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CartContext } from '../context/CartContext';
import './Payment.css';

function Payment() {
  const { cart } = useContext(CartContext);

  // Hitung total harga dari semua item di keranjang
  const totalAmount = cart.reduce((total, item) => total + Number(item.price), 0).toFixed(2);

  // Pastikan Anda mengganti YOUR_PAYPAL_CLIENT_ID dengan client ID yang valid
  const initialOptions = {
    "client-id": "AZndZ6nq8iBgMdTLnCto3lswUINfd5tsG9cBt--h8e9jqakRK9z-0pyqg6drt4gZzHFVyE-I4Z0PEn9A",
    currency: "USD",
    intent: "capture"
  };

  return (
    <div className="payment">
      <h2>Payment Page</h2>
      <p>Silakan pilih metode pembayaran melalui PayPal.</p>
      <p>Total Payment: ${totalAmount}</p>
      <PayPalScriptProvider options={initialOptions}>
        <div className="paypal-button-container">
          <PayPalButtons
            style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: totalAmount  // Gunakan nilai total dinamis dari keranjang
                  }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert("Payment completed by " + details.payer.name.given_name);
                // Lakukan aksi selanjutnya, misalnya update status pesanan di backend
              });
            }}
            onError={(err) => {
              console.error("PayPal Checkout onError", err);
              alert("An error occurred during the payment process.");
            }}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment;
