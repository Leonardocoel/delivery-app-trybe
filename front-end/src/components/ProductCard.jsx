import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestGet, setToken } from '../services/requests';
import CustomerContext from '../context/CustomerContext';
import convertValue from '../utils/convertValue';
import '../CSS/Products.css';

export default function ProductCard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { cartState, cartDispatch } = useContext(CustomerContext);
  const [, items] = cartState;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await requestGet('/products');

      setProducts(response);
    };
    getProducts();
  }, []);

  return (
    products.map(({ id, name, price, urlImage }) => (
      <main className="card" key={ name }>
        <p data-testid={ `customer_products__element-card-title-${id}` }>
          {name}

        </p>
        <p data-testid={ `customer_products__element-card-price-${id}` }>
          { convertValue(price) }

        </p>
        <img
          className="card_image"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
        />
        <div className="quantity_input_and_buttons">
          <button
            className="subtract_quantity_button"
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ () => cartDispatch(
              { type: 'decrement', payload: { name, price, id } },
            ) }
          >
            -

          </button>
          <input
            className="quantity_input"
            name="quantity"
            value={ items[name]?.quantity || '0' }
            data-testid={ `customer_products__input-card-quantity-${id}` }
            onChange={ ({ target: { value } }) => cartDispatch(
              { type: 'input',
                payload: { name, price, id, quantity: parseFloat(value) } },
            ) }
          />
          <button
            className="add_quantity_button"
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ () => cartDispatch(
              { type: 'increment', payload: { name, price, id } },
            ) }
          >
            +

          </button>
        </div>
      </main>))

  );
}
