import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useGet(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [url]);

  return data;
}
