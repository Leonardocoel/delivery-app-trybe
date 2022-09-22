import React, { useEffect, useState } from 'react';
import { LOGIN_URL } from '../utils/urls';
import postLogin from '../utils/postLogin';
import validations from '../utils/validations';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleChange = ({ target: { value, name } }) => (
    name === 'email' ? setEmail(value) : setPassword(value)
  );

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
          type="submit"
        >
          Registrar

        </button>
        {errMessage
          && <p data-testid="common_login__element-invalid-email">{errMessage}</p>}
      </form>
    </div>
  );
}
