import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CostumerContext';
import { setToken } from '../services/requests';
import NavBar from '../components/NavBar';
import Products from '../components/Products';
import convertValue from '../utils/convertValue';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const { cartState } = useContext(CustomerContext);
  const [username, setUsername] = useState('');

  const [total, items] = cartState;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');
    setUsername(user.name);
    setToken(user.token);
  }, [navigate]);

  return (
    <div>
      {console.log(Object.keys(items).length < 1)}
      <NavBar username={ username } />
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ Object.keys(items).length < 1 }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          {`Ver Carinho: ${convertValue(total)}`}
        </p>

      </button>
      <Products />
    </div>
  );
}
