import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { ApiClient } from '../api/apiClient';

export const useUsers = () => {
  const client = useApi();
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
  }, [client]); 

  return { users, loading, error, refetch: fetchUsers };
};
