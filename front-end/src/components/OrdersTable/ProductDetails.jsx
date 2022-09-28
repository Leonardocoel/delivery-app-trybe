import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestGet, setToken } from '../../services/requests';
import convertValue from '../../utils/convertValue';

export default function ProductDetails() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  useEffect(() => {
    const fetch = async () => {
      const dat = await requestGet(`/customer/orders/${id}`);
      console.log('data: ', dat);
      setData(dat);
    };
    fetch();
  }, [id]);

  return (
    <div>
      <h2>Detalhes do Pedido</h2>
      {
        data.length > 0 && (
          <section>
            <span
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`pedido 00${data.id}`}

            </span>
            <span
              data-testid={ `customer
              _order_details__element-order-details-label-seller-name` }
            >
              {`P.vend: ${data.seller.name}`}

            </span>
            <span
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {data.sale_date}

            </span>
            <span>{data.status}</span>
            <button type="button">Marcar como entregue</button>
          </section>
        )
      }
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
          {data.products && (
            data.products.map(({ name, SalesProduct: { quantity }, price }, index) => (
              <tr key={ name }>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{(quantity * Number(price)).toFixed(2)}</td>
              </tr>
            )))}

        </tbody>
      </table>
      <h2>{convertValue(data.totalPrice)}</h2>
    </div>
  );
}
