import axios from 'axios';
import { useState, useEffect } from 'react';

export default function usePost(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.post(url).then((res) => {
      setData(res.data);
    });
  }, [url]);

  return data;
}
