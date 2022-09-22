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
          type="email"
          name="email"
          id="email"
          ref={ emailInput }
          placeholder="digite seu email"
        />
        <input type="password" name="password" id="password" ref={ passwordRef } />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
