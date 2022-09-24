import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavBar({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <header>
      <button
        type="button"
        onClick={ () => navigate('/seller/orders') }
        data-testid="customer_products__element-navbar-link-orders"
      >
        Pedidos
      </button>
      <button
        type="button"
        onClick={ () => navigate('/customer/profile') }
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {user.name}

      </button>
      <button
        type="button"
        onClick={ handleLogout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair

      </button>
    </header>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};
