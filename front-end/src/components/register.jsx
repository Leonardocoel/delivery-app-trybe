import React, { useEffect, useState } from 'react';
import { LOGIN_URL } from '../utils/urls';
import postLogin from '../utils/postLogin';
import validations from '../utils/validations';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errMessage, setErrMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    const err = await postLogin(LOGIN_URL, payload);
    setErrMessage(err);
  };

  const handleChange = ({ target: { value, type } }) => {
    if (type === 'email') setEmail(value);
    if (type === 'password') setPassword(value);
    else setName(value);
  };

  useEffect(() => {
    const val = validations(email, password);
    if (val) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <div>
      <form onSubmit={ (e) => handleSubmit(e) }>
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
