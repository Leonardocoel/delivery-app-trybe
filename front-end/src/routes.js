import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import CustomerProducts from './pages/Customer';
import Login from './pages/Login';
// import SellerOrders from './pages/SellerOrders';

export default function ReactRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user && !user?.token) return setIsLoggedIn(false);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ !isLoggedIn && <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <CustomerProducts /> } />
        {/* <Route path="/seller/orders" element={ <SellerOrders /> } /> */}
      </Routes>
    </BrowserRouter>
  );
}
