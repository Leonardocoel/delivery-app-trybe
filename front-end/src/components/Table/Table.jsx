import React from 'react';
import PropTypes from 'prop-types';

export default function Table({ cart }) {
  const [total, items] = cart;
  console.log(Object.entries(items));

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
        {Object.entries(items).map((item, index) => (
          <tr data-testid={ `element-order-table-name-${index}` } key={ item[0] }>
            <td>{index + 1}</td>
            <td>{item[0]}</td>
            <td>{item[1].quantity}</td>
            <td>{item[1].price}</td>
            <td>{parseFloat(item[1].price * item[1].quantity).toFixed(2)}</td>
            <td>
              <button
                type="button"
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

Table.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.number,
    PropTypes.objectOf(
      PropTypes.objectOf(PropTypes.string),
    ),
  ).isRequired,
};
