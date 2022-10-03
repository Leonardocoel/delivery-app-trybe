import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../components/Header';
import CustomerOrderDetails from '../components/OrdersDetails/CustomerOrderDetails';
import SellerOrderDetails from '../components/OrdersDetails/SellerOrderDetails';

export default function OrdersDeatils() {
  const { pathname } = useLocation();
  const { id } = useParams();

  return (
    <>
      <Header />
      {(pathname === `/customer/orders/${id}`)
        ? <CustomerOrderDetails />
        : <SellerOrderDetails />}
    </>
  );
}
