import React, { useEffect, useState } from 'react';
import { requestPost } from '../services/requests';
import validationsRegister from '../utils/validationsRegister';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [{ email, password, name }, setCredentials] = useState(
    { email: '', password: '', name: '' },
  );

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  const [errMessage, setErrMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await requestPost('/register', { email, password });

      setToken(user.token);

      localStorage.setItem('user', JSON.stringify(user));

      navigate('/customer/products');
    } catch ({ response: { data: { message }, status } }) {
      setErrMessage(`Error ${status}: ${message} `);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     email,
  //     password,
  //   };
  //   const err = await requestPost('/register', payload);
  //   setErrMessage(err);
  // };

  // const handleChange = ({ target: { value, type } }) => {
  //   if (type === 'email') setEmail(value);
  //   if (type === 'password') setPassword(value);
  //   else setName(value);
  // };

  const handleChange = ({ target: { value, name: type } }) => {
    setCredentials((prevCredentials) => ({ ...prevCredentials, [type]: value }));
  };

  useEffect(() => {
    const isValid = validationsRegister(email, password, name);
    setIsDisabled(!isValid);
  }, [email, password, name]);

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
// - 6: common_register__input-name
// - 7: common_register__input-email
// - 8: common_register__input-password
// - 9: common_register__button-register
// - 10: common_register__element-invalid_register [Elemento oculto (Mensagens de erro)]
