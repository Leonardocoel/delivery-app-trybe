import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestGet, setToken } from '../services/requests';
import CustomerContext from '../context/CostumerContext';
import convertValue from '../utils/convertValue';

export default function Products() {
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
      const productsArr = await requestGet('/customer/products');

      setProducts(productsArr);
    };
    getProducts();
  }, []);

  return (
    <div>
      { products.map(({ id, name, price, urlImage }) => (
        <div key={ name }>
          <p data-testid={ `customer_products__element-card-title-${id}` }>
            {name}

          </p>
          <p data-testid={ `customer_products__element-card-price-${id}` }>
            { convertValue(price) }

          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            src={ urlImage }
            alt={ name }
          />
          <div>
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ () => cartDispatch(
                { type: 'decrement', payload: { name, price, id } },
              ) }
            >
              -

            </button>
            <input
              name="quantity"
              value={ items[name]?.quantity || '0' }
              data-testid={ `customer_products__input-card-quantity-${id}` }
              onChange={ ({ target: { value } }) => cartDispatch(
                { type: 'input',
                  payload: { name, price, id, quantity: parseFloat(value) } },
              ) }
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${id}` }
              onClick={ () => cartDispatch(
                { type: 'increment', payload: { name, price, id } },
              ) }
            >
              +

            </button>
          </div>
        </div>))}

    </div>
  );
}
