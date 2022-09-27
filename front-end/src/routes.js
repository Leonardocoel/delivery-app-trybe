import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProvider from './context/CostumerProvider';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import CustomerProducts from './pages/Customer';
import Login from './pages/Login';
import SellerOrders from './pages/SellerOrders';

export default function ReactRoutes() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user && !user?.token) return setRedirectToLogin(true);

    setRedirectToLogin(false);
  }, []);

  const redirectTo = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.role === 'seller') return '/seller/orders';
    if (user?.role === 'admin') return '/admin/manage';
    if (user?.role === 'customer') return '/customer/products';
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={ (redirectToLogin)
            ? <Navigate to="/login" />
            : <Navigate to={ redirectTo() } /> }
        />
        <Route
          path="/login"
          element={ <Login /> }
        />
        <Route
          path="/register"
          element={ <Register /> }
        />
        <Route
          path="/customer/products"
          element={
            <CustomerProvider>
              <CustomerProducts />
            </CustomerProvider>
          }
        />
        <Route
          path="/customer/checkout"
          element={
            <CustomerProvider>
              <Checkout />
            </CustomerProvider>
          }
        />

        <Route
          path="/seller/orders"
          element={ <SellerOrders /> }
        />
      </Routes>
    </BrowserRouter>
  );
}
