import axios from 'axios';
// import setToken from './localStorage';

export default function postLogin(url, payload) {
  return axios.post(url, payload)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
    })
    .catch((e) => {
      console.log(e.response.data.message);
      return e.response.data.message;
    });
}
