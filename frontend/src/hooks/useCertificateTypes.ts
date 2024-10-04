import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { ApiClient } from '../api/apiClient';

export const useCertificateTypes = () => {
  const client = useApi();
  const [certificateTypes, setCertificateTypes] = useState<
    ApiClient.CertificateTypeDTO[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCertificateTypes = async () => {
    try {
      setLoading(true);
      const types = await client.types();
      setCertificateTypes(types);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred while fetching certificate types'),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificateTypes();
  }, []);

  return { certificateTypes, loading, error, refetch: fetchCertificateTypes };
};
