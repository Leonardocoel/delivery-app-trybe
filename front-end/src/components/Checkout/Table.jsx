import React, { useContext } from 'react';
import CustomerContext from '../../context/CustomerContext';
import convertValue from '../../utils/convertValue';
import TableS from '../../styles/Checkout';

export default function Table() {
  const { cartState, cartDispatch } = useContext(CustomerContext);
  const [total, items] = cartState;

  return (
    <TableS>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(items).map(([name, { price, quantity }], i) => (
          <tr key={ name }>
            <td
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              {i + 1}
            </td>
            <td data-testid={ `customer_checkout__element-order-table-name-${i}` }>
              {name}
            </td>
            <td data-testid={ `customer_checkout__element-order-table-quantity-${i}` }>
              {quantity}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
            >
              {convertValue(price)}
            </td>
            <td data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }>
              {convertValue(Number(price * quantity))}
            </td>
            <td>
              <button
                type="button"
                value={ name }
                data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                onClick={ () => cartDispatch(
                  {
                    type: 'input',
                    payload: { name, price, quantity: 0 } },
                ) }
              >
                {' '}
                remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <p data-testid="customer_checkout__element-order-total-price">
        {`Total: ${convertValue(total)}`}
      </p>
    </TableS>
  );
}
