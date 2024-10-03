import { useState, useEffect } from 'react';
import { ApiClient } from '../api/apiClient';

export const useUsers = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const client = new ApiClient.Client(baseURL);
  const [users, setUsers] = useState<ApiClient.UserDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await client.users();
      setUsers(response);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred while fetching users'),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};
