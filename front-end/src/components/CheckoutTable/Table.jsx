import React, { useContext } from 'react';
import CostumerContext from '../../context/CostumerContext';
import convertValue from '../../utils/convertValue';

export default function Table() {
  const { cartState, cartDispatch } = useContext(CostumerContext);
  const [total, items] = cartState;

  return (
    <>
      <table>
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
      </table>
      <h2 data-testid="customer_checkout__element-order-total-price">
        {`Total: ${convertValue(total)}`}
      </h2>
    </>
  );
}
