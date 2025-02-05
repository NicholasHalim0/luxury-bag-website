// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ user, children }) {
  if (user && user.isAdmin) {
    return children;
  }
  return <Navigate to="/" />;
}

export default AdminRoute;
