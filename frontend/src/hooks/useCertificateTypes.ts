import { useState, useEffect } from 'react';
import axios from 'axios';
import { CertificateType } from '../types/types';
import { certificateTypesEndpoint } from '../endpoints/endpoints';

export const useCertificateTypes = () => {
  const [certificateTypes, setCertificateTypes] = useState<CertificateType[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCertificateTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get<CertificateType[]>(
        certificateTypesEndpoint,
      );
      setCertificateTypes(response.data);
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
