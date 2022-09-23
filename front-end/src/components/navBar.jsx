import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavBar({ username }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => navigate('/customer/products') }
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos

      </button>
      <button
        type="button"
        onClick={ () => navigate('/customer/orders') }
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos

      </button>
      <button
        type="button"
        onClick={ () => navigate('/customer/profile') }
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {username}

      </button>
      <button
        type="button"
        onClick={ handleLogout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair

      </button>
    </div>
  );
}
NavBar.propTypes = {
  username: PropTypes.string.isRequired,
};
