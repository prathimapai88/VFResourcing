import { useState } from 'react';
import axios from 'axios';

const usePostRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (url, postData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, postData);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, postData };
};

export default usePostRequest;
