import React from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import moment from 'moment/moment';

import convertValue from '../../utils/convertValue';

export default function OrderCard({ order }) {
  const { id, status, sale_date: saleDate,
    totalPrice, deliveryAddress, deliveryNumber } = order;

  return (
    <Link to={ `/seller/orders/${id}` }>
      <div>
        <p data-testid={ `seller_orders__element-order-id-${id}` }>
          {`Pedido 000${id}`}
        </p>
        <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
          {status}
        </p>
        <p data-testid={ `seller_orders__element-order-date-${id}` }>
          {moment(saleDate).format('DD/MM/YYYY')}
        </p>
        <p data-testid={ `seller_orders__element-card-price-${id}` }>
          {convertValue(totalPrice)}
        </p>
        <p data-testid={ `seller_orders__element-card-address-${id}` }>
          {`${deliveryAddress}, ${deliveryNumber}`}
        </p>
      </div>
    </Link>
  );
}
OrderCard.propTypes = {
  order: PropType.shape({
    id: PropType.number,
    status: PropType.string,
    sale_date: PropType.string,
    totalPrice: PropType.string,
    deliveryAddress: PropType.string,
    deliveryNumber: PropType.string,
  }).isRequired,
};
