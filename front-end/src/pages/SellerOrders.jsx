import { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import { requestGet } from '../services/requests';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const requestOrders = async () => {
    const data = await requestGet('');
    setOrders(data);
  };
  useEffect(() => {
    requestOrders();
  }, []);

  return (
    <div>
      {orders.map((order) => <OrderCard key={ order.id } order={ order } />)}
    </div>
  );
}
