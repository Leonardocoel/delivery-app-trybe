import axios from 'axios';

export default function postLogin(url, data) {
  axios.post(url, data)
    .then()
    .catch(({ response }) => {
      console.log(response.data.message);
      return response.data.message;
    });

  return data;
}
