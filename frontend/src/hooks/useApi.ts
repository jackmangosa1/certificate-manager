import { useMemo } from 'react';
import { ApiClient } from '../api/apiClient';

export const useApi = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const client = useMemo(() => new ApiClient.Client(baseURL), [baseURL]);

  return client;
};
