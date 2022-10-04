import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProvider from './context/CustomerProvider';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';

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
        <Route path="/customer">
          <Route
            path="products"
            element={
              <CustomerProvider>
                <Products />
              </CustomerProvider>
            }
          />
          <Route
            path="checkout"
            element={
              <CustomerProvider>
                <Checkout />
              </CustomerProvider>
            }
          />
          <Route
            path="orders"
            element={ <Orders /> }
          />
          <Route
            path="orders/:id"
            element={ <OrderDetails /> }
          />
        </Route>
        <Route path="/seller">
          <Route
            path="orders"
            element={ <Orders /> }
          />
          <Route
            path="orders/:id"
            element={ <OrderDetails /> }
          />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}
