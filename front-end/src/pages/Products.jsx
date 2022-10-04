import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';
import Header from '../components/Header';
import ProductsCard from '../components/ProductCard';
import convertValue from '../utils/convertValue';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const { cartState } = useContext(CustomerContext);
  const [total, items] = cartState;

  return (
    <div>
      <Header />
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
      <ProductsCard />
    </div>
  );
}
