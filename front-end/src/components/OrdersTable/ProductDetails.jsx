import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestGet, setToken } from '../../services/requests';
import convertValue from '../../utils/convertValue';

export default function ProductDetails() {
  const navigate = useNavigate();
  const [order, setOrder] = useState({ });
  const { id } = useParams();
  const { seller, status, totalPrice, products } = order;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  // const getOrder = useCallback(async () => {
  //   const orderById = await requestGet(`/customer/orders/${id}`);
  //   setOrder(orderById);
  // }, [id]);

  // useEffect(() => {
  //   getOrder();
  // }, [getOrder]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const orderById = await requestGet(`/customer/orders/${id}`);
    setOrder(orderById);
  }, [id]);

  return (
    Object.values(order).length > 0 && (
      <div>
        <h2>Detalhes do Pedido</h2>
        <section>
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`PEDIDO 000${order.id}`}

          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`P.vend: ${seller.name}`}

          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {moment(order.sale_date).format('DD/MM/YYYY')}
          </span>
          <span
            data-testid={ 'customer_order_details__element-order-details-label'
            + '-delivery-status' }
          >
            {status}
          </span>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled
          >
            Marcar como entregue

          </button>
        </section>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(({ name, SalesProduct: { quantity }, price }, index) => (
                <tr key={ name }>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}

                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-name-${index}`
                    }
                  >
                    {name}

                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    {quantity}

                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    {price}

                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    {convertValue(quantity * Number(price))}

                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
        <h2
          data-testid="customer_order_details__element-order-total-price"
        >
          {convertValue(totalPrice)}
        </h2>
      </div>
    ));
}
