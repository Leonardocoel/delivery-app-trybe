import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CustomerOrderDetails from '../components/OrdersDetails/CustomerOrderDetails';
import SellerOrderDetails from '../components/OrdersDetails/SellerOrderDetails';

export default function OrdersDeatils() {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      {(pathname === '/customer/orders')
        ? <CustomerOrderDetails />
        : <SellerOrderDetails />}
    </>
  );
}
