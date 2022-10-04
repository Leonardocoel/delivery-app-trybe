import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../../context/CustomerContext';
import { requestGet, requestPost, setToken } from '../../services/requests';

export default function Address() {
  const navigate = useNavigate();
  const { cartState } = useContext(CustomerContext);
  const [totalPrice, items] = cartState;
  const [{ deliveryAddress, deliveryNumber }, setAddress] = useState(
    { deliveryAddress: '', deliveryNumber: '' },
  );
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(2);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  useEffect(() => {
    const getSellers = async () => {
      const response = await requestGet('/users/seller');
      setSellers(response);
    };
    getSellers();
  }, []);

  const handleAddress = ({ target: { value, name } }) => {
    setAddress((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleClick = async () => {
    const userName = JSON.parse(localStorage.getItem('user')).name;
    const body = {
      userName,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      productsArray: Object.values(items)
        .map(({ id, quantity }) => ({ productId: id, quantity })),
    };

    const { saleId } = await requestPost('/sales', body);
    navigate(`/customer/orders/${saleId}`);
  };

  return (
    <div>
      <h1>Detalhes e Endereço da Entrega</h1>
      <div>
        <label htmlFor="vendedor">
          P. Vendedora Responsável
          <select
            data-testid="customer_checkout__select-seller"
            name="vendedor"
            id="vendedor"
            onChange={ ({ target: { value } }) => setSellerId(value) }
          >
            { sellers.map(({ name, id }) => (
              <option value={ id } key={ name }>{ name }</option>
            )) }

          </select>
        </label>
        <label htmlFor="endereco">
          Endereço
          <input
            data-testid="customer_checkout__input-address"
            placeholder="Endereço"
            type="text"
            name="deliveryAddress"
            id="endereco"
            value={ deliveryAddress }
            onChange={ (e) => handleAddress(e) }
          />
        </label>
        <label htmlFor="numero">
          Número
          <input
            data-testid="customer_checkout__input-address-number"
            placeholder="Número"
            type="text"
            name="deliveryNumber"
            id="numero"
            value={ deliveryNumber }
            onChange={ (e) => handleAddress(e) }
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ () => handleClick() }
        >
          FINALIZAR PEDIDO

        </button>
      </div>
    </div>
  );
}
