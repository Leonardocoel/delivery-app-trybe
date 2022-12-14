import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from './CustomerContext';

const SaveCart = (cart) => {
  let total = 0;

  const keys = Object.keys(cart);

  keys.forEach((key) => {
    if (cart[key].quantity <= 0) return delete cart[key];
    total += cart[key].quantity * cart[key].price;
  });

  return [total, cart];
};

const itemHandler = ([, state], { type, payload: { name, quantity, ...info } }) => {
  const prevQty = state[name]?.quantity;

  const cases = {
    increment: (prevQty || 0) + 1,
    decrement: prevQty - 1 || 0,
    input: (quantity > 0) ? quantity : 0,
  };

  const cart = { ...state, [name]: { ...info, quantity: cases[type] } };

  return SaveCart(cart);
};

function CustomerProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(itemHandler, [0, {}]);

  const contextValue = useMemo(() => ({
    cartState,
    cartDispatch,
  }), [cartState]);

  return (
    <CustomerContext.Provider value={ contextValue }>
      {children}
    </CustomerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CustomerProvider;
