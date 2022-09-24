import { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import Header from '../components/Header';
import { requestGet } from '../services/requests';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState();
  const requestOrders = async () => {
    const data = await requestGet('');
    setOrders(data);
  };
  useEffect(() => {
    const { user: data } = JSON.parse(localStorage.getItem('user'));
    setUser(data);
    requestOrders();
  }, []);

  return (
    <main>
      {user && <Header user={ user } />}
      <div>
        {orders.map((order) => <OrderCard key={ order.id } order={ order } />)}
      </div>
    </main>
  );
}
