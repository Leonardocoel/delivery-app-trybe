import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { requestGet, setToken } from '../services/requests';
import Header from '../components/Header';
import CustomerOrderCard from '../components/Order/CustomerOrderCard';
import SellerOrderCard from '../components/Order/SellerOrderCard';
import { Orders } from '../styles/Orders';

export default function SellerOrders() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');
    setToken(user.token);
  }, [navigate]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await requestGet('/sales');

      setOrders(response);
    };

    getOrders();
  }, []);

  return (
    <>
      <Header />
      <Orders>
        {orders.map((order) => (
          (pathname === '/customer/orders')
            ? <CustomerOrderCard key={ order.id } order={ order } />
            : <SellerOrderCard key={ order.id } order={ order } />
        ))}
      </Orders>
    </>
  );
}
