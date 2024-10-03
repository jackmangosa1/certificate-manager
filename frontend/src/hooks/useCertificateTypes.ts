import { useState, useEffect } from 'react';
import { ApiClient } from '../api/apiClient';


export const useCertificateTypes = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [certificateTypes, setCertificateTypes] = useState<ApiClient.CertificateTypeDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCertificateTypes = async () => {
    const client = new ApiClient.Client(baseURL);
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
