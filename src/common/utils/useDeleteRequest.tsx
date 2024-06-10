import { useState } from 'react';
import axios from 'axios';

const useDeleteRequest = () => {
  const [deleteInProgress, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const deleteData = async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.delete(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteInProgress, error, data, deleteData };
};

export default useDeleteRequest;
