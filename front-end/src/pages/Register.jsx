import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPost, setToken } from '../services/requests';
import validationsRegister from '../utils/validationsRegister';

export default function Login() {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [errMessage, setErrMessage] = useState();
  const [{ email, password, name }, setCredentials] = useState(
    { email: '', password: '', name: '' },
  );

  useEffect(() => {
    const isValid = validationsRegister(email, password, name);
    setIsDisabled(!isValid);
  }, [email, password, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await requestPost('/register', { email, password, name });

      setToken(user.token);

      localStorage.setItem('user', JSON.stringify(user));

      navigate('/customer/products');
    } catch ({ response: { data: { message }, status } }) {
      setErrMessage(`Error ${status}: ${message} `);
    }
  };

  const handleChange = ({ target: { value, name: type } }) => {
    setCredentials((prevCredentials) => ({ ...prevCredentials, [type]: value }));
  };

  return (
    <div>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <input
          data-testid="common_register__input-email"
          type="email"
          name="email"
          id="email"
          value={ email }
          placeholder="digite seu email"
          onChange={ (e) => handleChange(e) }
        />
        <input
          data-testid="common_register__input-password"
          type="password"
          name="password"
          id="password"
          value={ password }
          placeholder="digite uma senha"
          onChange={ (e) => handleChange(e) }
        />
        <input
          data-testid="common_register__input-name"
          type="name"
          name="name"
          id="name"
          value={ name }
          placeholder="digite seu nome"
          onChange={ (e) => handleChange(e) }
        />

        <button
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          type="submit"
        >
          Registrar

        </button>
        {errMessage
          && <p data-testid="common_register__element-invalid_register">{errMessage}</p>}
      </form>
    </div>
  );
}
