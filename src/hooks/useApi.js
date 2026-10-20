// src/hooks/useApi.js
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function useApi(apiCall, options = {}) {
  const { immediate = true, onSuccess, onError } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(...args);
      if (response.data.success) {
        setData(response.data.data);
        if (onSuccess) onSuccess(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Request failed');
      }
    } catch (err) {
      setError(err.message);
      if (onError) onError(err.message);
      toast.error(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { data, loading, error, execute };
}