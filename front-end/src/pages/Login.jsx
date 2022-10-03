import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validations from '../utils/validations';
import { requestPost, setToken } from '../services/requests';
import { Form } from '../styles/LoginForm';
import '../CSS/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [{ email, password }, setCredentials] = useState({ email: '', password: '' });
  const [errMessage, setErrMessage] = useState();

  useEffect(() => {
    const isValid = validations(email, password);
    setIsDisabled(!isValid);
  }, [email, password]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.role === 'seller') return navigate('/seller/orders');
    if (user?.role === 'admin') return navigate('/admin/manage');
    if (user?.role === 'customer') return navigate('/customer/products');
  }, [navigate]);

  const handleChange = ({ target: { value, name } }) => {
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await requestPost('/login', { email, password });

      setToken(user.token);

      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'seller') return navigate('/seller/orders');
      if (user.role === 'admin') return navigate('/admin/manage');

      navigate('/customer/products');
    } catch ({ response: { data: { message }, status } }) {
      setErrMessage(`Error ${status}: ${message} `);
    }
  };

  return (
    <Form onSubmit={ (e) => handleSubmit(e) }>
      <input
        data-testid="common_login__input-email"
        type="email"
        name="email"
        id="email"
        value={ email }
        placeholder="digite seu email"
        onChange={ (e) => handleChange(e) }
      />
      <input
        data-testid="common_login__input-password"
        type="password"
        name="password"
        id="password"
        value={ password }
        onChange={ (e) => handleChange(e) }
      />
      <button
        data-testid="common_login__button-login"
        type="submit"
        disabled={ isDisabled }
      >
        Login

      </button>
      <button
        data-testid="common_login__button-register"
        type="button"
        onClick={ () => navigate('/register') }
      >
        Registrar

      </button>
      {errMessage
            && <p data-testid="common_login__element-invalid-email">{errMessage}</p>}
    </Form>
  );
}
