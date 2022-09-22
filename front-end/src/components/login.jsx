import React, { useRef, useCallback } from 'react';

export default function Login() {
  const emailInput = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(emailInput.current.value);
    console.log(passwordRef.current.value);
  }, []);

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="common_login__input-email"
          type="email"
          name="email"
          id="email"
          ref={ emailInput }
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
      </form>
    </div>
  );
}
