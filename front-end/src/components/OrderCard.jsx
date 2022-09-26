import { Link } from 'react-router-dom';
import PropType from 'prop-types';

export default function OrderCard({ order }) {
  const { id, status, saleDate, totalPrice, deliveryAddress } = order;
  return (
    <Link to={ `/seller/orders/${id}` }>
      <div>
        <p data-testid={ `seller_orders__element-order-id-${id}` }>{id}</p>
        <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
          {status}
        </p>
        <p data-testid={ `seller_orders__element-order-date-${id}` }>
          {saleDate}
        </p>
        <p data-testid={ `seller_orders__element-card-price-${id}` }>
          {totalPrice}
        </p>
        <p data-testid={ `seller_orders__element-card-address-${id}` }>
          {deliveryAddress}
        </p>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropType.shape({
    id: PropType.number,
    status: PropType.string,
    saleDate: PropType.string,
    totalPrice: PropType.number,
    deliveryAddress: PropType.string,
  }).isRequired,
};
