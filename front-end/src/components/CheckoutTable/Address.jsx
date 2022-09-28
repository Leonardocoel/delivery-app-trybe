import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../../context/CostumerContext';
import { requestGet, requestPost, setToken } from '../../services/requests';

export default function Address() {
  const navigate = useNavigate();
  const { cartState } = useContext(CustomerContext);
  const [total, items] = cartState;
  const [{ deliveryAddress, deliveryNumber }, setAddress] = useState(
    { deliveryAddress: '', deliveryNumber: '' },
  );
  const [sellers, setSeller] = useState([]);
  const [finalSeller, setFinalSeller] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  useEffect(() => {
    const req = async () => {
      const seller = await requestGet('/users/seller');
      setSeller(seller);
    };
    req();
  }, []);

  const handleAddress = ({ target: { value, name } }) => {
    setAddress((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleClick = async () => {
    const body = {
      sellerId: sellers.find((s) => s.name === finalSeller).id,
      totalPrice: total,
      deliveryAddress,
      deliveryNumber,
      productsArray: Object.entries(items),
    };
    const { saleId } = await requestPost('/customer/checkout', body);
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
            onChange={ ({ target: { value } }) => setFinalSeller(value) }
          >
            <option value="select">Selecione</option>
            {sellers.map(({ name }) => (
              <option key={ name }>{name}</option>
            ))}
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
