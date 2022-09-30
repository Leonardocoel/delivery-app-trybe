import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { requestGet, setToken, requestPatch } from '../services/requests';
import convertValue from '../utils/convertValue';

const ID_BASE = 'seller_order_details__';

export default function OrderDetails() {
  const navigate = useNavigate();
  const [order, setOrder] = useState({ });
  const [status, setStatus] = useState('Pendente');
  const { id: idParams } = useParams();
  const EM_TRANSITO = 'Em Trânsito';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  useEffect(() => {
    const requestOrder = async () => {
      const data = await requestGet(`/seller/orders/${idParams}`);
      setOrder(data);
      setStatus(data.status);
    };
    requestOrder();
  }, [idParams]);

  useEffect(() => {
    // requestPatch(endpoint, status);
  }, [status]);

  const handleClickCheck = async () => {
    console.log('clicou');
    setStatus('Preparando');
    await requestPatch(`/seller/orders/${idParams}`, { message: 'Preparando' });
  };

  const handleClickDispatch = async () => {
    setStatus(EM_TRANSITO);
    await requestPatch(`/seller/orders/${idParams}`, { message: 'Em Trânsito' });
  };

  return (
    <main>
      <Header />
      <h1>Detalhe do pedido</h1>
      {Object.values(order).length > 0 && (
        <>
          <div>
            <p data-testid={ `${ID_BASE}element-order-details-label-order-id` }>
              {`PEDIDO ${order.id}`}
            </p>
            <p data-testid={ `${ID_BASE}element-order-details-label-order-date` }>
              {new Date(order.sale_date).toLocaleDateString()}
            </p>
            <p
              data-testid={ `${ID_BASE}element-order-details-label-delivery-status` }
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
                    data-testid={ `${ID_BASE}element-order-table-item-number-${index}` }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={ `${ID_BASE}element-order-table-name-${index}` }
                  >
                    {elem.name}
                  </td>
                  <td
                    data-testid={ `${ID_BASE}element-order-table-quantity-${index}` }
                  >
                    {elem.SalesProduct.quantity}
                  </td>
                  <td
                    data-testid={ `${ID_BASE}element-order-table-unit-price-${index}` }
                  >
                    {convertValue(elem.price)}
                  </td>
                  <td
                    data-testid={ `${ID_BASE}element-order-table-sub-total-${index}` }
                  >
                    {convertValue(elem.price * elem.SalesProduct.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            data-testid={ `${ID_BASE}element-order-total-price` }
          >
            {`Total: ${convertValue(order.totalPrice)}`}

          </p>
        </>
      )}
    </main>
  );
}
