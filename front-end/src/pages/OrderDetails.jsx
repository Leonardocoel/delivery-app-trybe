import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { requestGet } from '../services/requests';
import convertValue from '../utils/convertValue';

const ID_BASE = 'seller_order_details__';

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const [status, setStatus] = useState('Pendente');
  const { id: idParams } = useParams();

  useEffect(() => {
    const requestOrder = async () => {
      const data = await requestGet(`/customer/orders/${idParams}`);
      console.log(data);
      setOrder(data);
      setStatus(data.status);
    };
    requestOrder();
  }, [idParams]);

  useEffect(() => {
    // requestPatch(endpoint, status);
  }, [status]);

  return (
    <main>
      <Header />
      <h1>Detalhe do pedido</h1>
      {order && (
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
              data-testid={ `${ID_BASE}button-preparing-check` }
              type="button"
              disabled={ status !== 'Pendente' }
              onClick={ () => setStatus('Preparando') }
            >
              Preparar pedido
            </button>
            <button
              data-testid={ `${ID_BASE}button-dispatch-check` }
              type="button"
              disabled={ status !== 'Preparando' }
              onClick={ () => setStatus('Em Trânsito') }
            >
              Saiu para entrega
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
