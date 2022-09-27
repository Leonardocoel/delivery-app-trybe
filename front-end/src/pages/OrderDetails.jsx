import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { requestGet } from '../services/requests';

const ID_BASE = 'seller_order_details__';

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const { id: idParams } = useParams();

  useEffect(() => {
    const requestOrder = async () => {
      const data = await requestGet(`/sales/${idParams}`);
      setOrder(data);
    };
    requestOrder();
  }, [idParams]);

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
              {new Date(order.saleDate).toLocaleDateString()}
              {/* fonte: https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript */}
            </p>
            <p
              data-testid={ `${ID_BASE}element-order-details-label-delivery-status` }
            >
              {order.status}
            </p>
            <button
              data-testid={ `${ID_BASE}button-preparing-check` }
              type="button"
            >
              Preparar pedido
            </button>
            <button
              data-testid={ `${ID_BASE}button-dispatch-check` }
              type="button"
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
              {order.produtos.map((elem, index) => (
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
                    {elem.quantity}
                  </td>
                  <td
                    data-testid={ `${ID_BASE}element-order-table-unit-price-${index}` }
                  >
                    {`R$ ${elem.price.toFixed(2).replace('.', ',')}`}
                  </td>
                  <td
                    data-testid={ `${ID_BASE}element-order-table-sub-total-${index}` }
                  >
                    {`R$ ${(elem.price * elem.quantity)
                      .toFixed(2)
                      .replace('.', ',')}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            data-testid={ `${ID_BASE}element-order-total-price` }
          >
            {`Total: R$ ${order.totalPrice.toFixed(2).replace('.', ',')}`}

          </p>
        </>
      )}
    </main>
  );
}
