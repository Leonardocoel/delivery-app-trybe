import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { setToken } from '../services/requests';

export default function CustomerProducts() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user && !user?.token) return navigate('/login');

    setToken(user.token);
  }, [navigate]);

  return (
    <div>
      Produtos
    </div>
  );
}
