import React, { useRef, useCallback, useState } from 'react';
import { LOGIN_URL } from '../utils/urls';
import postLogin from '../utils/postLogin';

export default function Login() {
  const emailInputRef = useRef(null);
  const passwordRef = useRef(null);
  const [errMessage, setErrMessage] = useState();
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const data = {
      email: emailInputRef.current.value,
      password: passwordRef.current.value,
    };
    const err = await postLogin(LOGIN_URL, data);
    setErrMessage(err);
  }, []);
  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="common_login__input-email"
          type="email"
          name="email"
          id="email"
          ref={ emailInputRef }
          placeholder="digite seu email"
        />
        <input
          data-testid="common_login__input-password"
          type="password"
          name="password"
          id="password"
          ref={ passwordRef }
        />
        <button
          data-testid="common_login__button-login"
          type="submit"
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
          && <p data-testid="common_login__element-invalid-email">{`${errMessage}`}</p>}
      </form>
    </div>
  );
}
