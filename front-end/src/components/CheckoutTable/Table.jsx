import React, { useContext } from 'react';
import CostumerContext from '../../context/CostumerContext';

export default function Table() {
  const { cartState, cartDispatch } = useContext(CostumerContext);

  const [total, items] = cartState;

  return (
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
          <tr data-testid={ `element-order-table-name-${i}` } key={ name }>
            <td>{i + 1}</td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{parseFloat(price * quantity).toFixed(2)}</td>
            <td>
              <button
                type="button"
                value={ name }
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
        <h2>{`Total: R$ ${total.toFixed(2)}`}</h2>
      </tbody>
    </table>

  );
}
