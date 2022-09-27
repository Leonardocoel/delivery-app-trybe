import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import Header from '../components/Header';
import { requestGet, setToken } from '../services/requests';

export default function SellerOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');
    setToken(user.token);
  }, [navigate]);

  useEffect(() => {
    const requestOrders = async () => {
      const sellerOrders = await requestGet('/seller/orders');

      setOrders(sellerOrders);
    };

    requestOrders();
  }, []);

  return (
    <main>
      <Header />
      <div>
        {orders.length !== 0
        && (
          <div>
            {' '}
            {
              orders.users
                .map((order) => <OrderCard key={ order.id } order={ order } />)
            }
          </div>
        )}
      </div>
    </main>
  );
}
