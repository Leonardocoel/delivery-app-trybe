import axios from 'axios';
// import setToken from './localStorage';

export default function postLogin(url, payload) {
  return axios.post(url, payload)
    .then(({ data }) => {
      localStorage.setItem(data);
      console.log(data);
    })
    .catch((e) => e.response.data.message);
}
