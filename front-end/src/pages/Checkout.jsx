import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../services/requests';
import Address from '../components/CheckoutTable/Address';
import Table from '../components/CheckoutTable/Table';
import Header from '../components/Header';

export default function Checkout() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  return (
    <div>
      <Header />
      <Table />
      <Address />
    </div>
  );
}
