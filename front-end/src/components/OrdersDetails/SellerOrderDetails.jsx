import moment from 'moment';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestGet, setToken, requestPatch } from '../../services/requests';
import convertValue from '../../utils/convertValue';

const PAGE_ID = 'seller_order_details__';
const EM_TRANSITO = 'Em Trânsito';

export default function OrderDetails() {
  const navigate = useNavigate();
  const [order, setOrder] = useState({ });
  const [status, setStatus] = useState('');
  const { id } = useParams();

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

  const handleClickCheck = async () => {
    setStatus('Preparando');
    await requestPatch(`/orders/${id}`, { message: 'Preparando' });
  };

  const handleClickDispatch = async () => {
    setStatus(EM_TRANSITO);
    await requestPatch(`/orders/${id}`, { message: 'Em Trânsito' });
  };

  return (

    Object.values(order).length > 0 && (
      <div>
        <h1>Detalhe do pedido</h1>
        <div>
          <p data-testid={ `${PAGE_ID}element-order-details-label-order-id` }>
            {`PEDIDO ${order.id}`}
          </p>
          <p data-testid={ `${PAGE_ID}element-order-details-label-order-date` }>
            {moment(order.sale_date).format('DD/MM/YYYY')}
          </p>
          <p
            data-testid={ `${PAGE_ID}element-order-details-label-delivery-status` }
          >
            {status}
          </p>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ status !== 'Pendente' }
            onClick={ () => handleClickCheck() }
          >
            PREPARAR PEDIDO

          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ status !== 'Preparando' }
            onClick={ () => handleClickDispatch() }

          >
            SAIU PARA ENTREGA

          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor unitário</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((elem, index) => (
              <tr key={ elem.id }>
                <td
                  data-testid={ `${PAGE_ID}element-order-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `${PAGE_ID}element-order-table-name-${index}` }
                >
                  {elem.name}
                </td>
                <td
                  data-testid={ `${PAGE_ID}element-order-table-quantity-${index}` }
                >
                  {elem.SalesProduct.quantity}
                </td>
                <td
                  data-testid={ `${PAGE_ID}element-order-table-unit-price-${index}` }
                >
                  {convertValue(elem.price)}
                </td>
                <td
                  data-testid={ `${PAGE_ID}element-order-table-sub-total-${index}` }
                >
                  {convertValue(elem.price * elem.SalesProduct.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          data-testid={ `${PAGE_ID}element-order-total-price` }
        >
          {`Total: ${convertValue(order.totalPrice)}`}

        </p>
      </div>

    ));
}
