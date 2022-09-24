import axios from 'axios';
import { HOME_URL } from '../utils/urls';

const api = axios.create({
  baseURL: HOME_URL,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestGet = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export default api;
