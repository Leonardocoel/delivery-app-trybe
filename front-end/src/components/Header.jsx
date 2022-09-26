import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [{ name, role }, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setUser({ name: user.name, role: user.role });
  }, [navigate]);

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

      {role === 'customer' && (
        <button
          type="button"
          onClick={ () => navigate('/customer/orders') }
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </button>
      )}
      <button
        type="button"
        onClick={ () => navigate('/customer/profile') }
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {name}
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
