import React, { useEffect, useState } from 'react';
import { requestGet } from '../services/requests';
import { PRODUCTS_URL } from '../utils/urls';

export default function Products() {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const productss = async () => {
      const { data } = await requestGet(PRODUCTS_URL);
      console.log(data);
      setProducts(data.products);
    };
    productss();
  }, []);
  console.log(product);
  return (
    <div>
      { product && product.map(({ id, name, price, urlImage }) => (
        <div key={ name }>
          <p data-testid={ `customer_products__element-card-title-<${id}` }>
            {name}

          </p>
          <p data-testid={ `customer_products__element-card-price-<${id}` }>
            {`${price}`}

          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            src={ urlImage }
            alt={ name }
          />
          <div>
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${id}` }
            >
              -

            </button>
            <input
              name="quantity"
              placeholder="quantity"
              data-testid={ `customer_products__input-card-quantity-${id}` }
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
            >
              +

            </button>
          </div>
        </div>))}

    </div>
  );
}
