import moment from 'moment';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestGet, setToken, requestPatch } from '../../services/requests';
import convertValue from '../../utils/convertValue';
import { P } from '../../styles/Status';

const PAGE_ID = 'customer_order_details__';

export default function OrderDetails() {
  const navigate = useNavigate();
  const [order, setOrder] = useState({ });
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const { seller, totalPrice, products } = order;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  const getOrders = useCallback(async () => {
    const orderById = await requestGet(`/orders/${id}`);
    setOrder(orderById);
    setStatus(orderById.status);
  }, [id]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleClick = async () => {
    await requestPatch(`orders/${id}`, { message: 'Entregue' });
    setStatus('Entregue');
  };

  return (
    Object.values(order).length > 0 && (
      <div>
        <h2>Detalhes do Pedido</h2>
        <section>
          <span
            data-testid={ `${PAGE_ID}element-order-details-label-order-id` }
          >
            {`PEDIDO 000${order.id}`}

          </span>
          <span
            data-testid={ `${PAGE_ID}element-order-details-label-seller-name` }
          >
            {`P.vend: ${seller.name}`}

          </span>
          <span
            data-testid={ `${PAGE_ID}element-order-details-label-order-date` }
          >
            {moment(order.sale_date).format('DD/MM/YYYY')}
          </span>
          <P
            status={ status }
            data-testid={ `${PAGE_ID}element-order-details-label-delivery-status` }
          >
            {status}
          </P>
          <button
            type="button"
            data-testid={ `${PAGE_ID}button-delivery-check` }
            disabled={ status !== 'Em Tr??nsito' }
            onClick={ () => handleClick() }
          >
            Marcar como entregue

          </button>
        </section>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descri????o</th>
              <th>Quantidade</th>
              <th>Valor Unit??rio</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(({ name, SalesProduct: { quantity }, price }, index) => (
                <tr key={ name }>
                  <td
                    data-testid={
                      `${PAGE_ID}element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}

                  </td>
                  <td
                    data-testid={
                      `${PAGE_ID}element-order-table-name-${index}`
                    }
                  >
                    {name}

                  </td>
                  <td
                    data-testid={
                      `${PAGE_ID}element-order-table-quantity-${index}`
                    }
                  >
                    {quantity}

                  </td>
                  <td
                    data-testid={
                      `${PAGE_ID}element-order-table-unit-price-${index}`
                    }
                  >
                    {price}

                  </td>
                  <td
                    data-testid={
                      `${PAGE_ID}element-order-table-sub-total-${index}`
                    }
                  >
                    {convertValue(quantity * Number(price))}

                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
        <h3
          data-testid={ `${PAGE_ID}element-order-total-price` }
        >
          {`Total: ${convertValue(totalPrice)}`}
        </h3>
      </div>
    ));
}
