import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { setToken } from '../services/requests';
import NavBar from '../components/navBar';
import Products from '../components/products';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && !user?.token) return navigate('/login');
    setUsername(user.name);
    setToken(user.token);
  }, [navigate]);

  return (
    <div>
      <NavBar username={ username } />
      <Products />
    </div>
  );
}
