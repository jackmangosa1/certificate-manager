import { useState, useEffect, useCallback } from 'react';
import { ApiClient } from '../api/apiClient';

export const useCertificates = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const client = new ApiClient.Client(baseURL);

  const [certificates, setCertificates] = useState<
    ApiClient.CertificateSummaryDTO[]
  >([]);

  const fetchCertificates = useCallback(async () => {
    try {
      const response = await client.certificatesAll();
      setCertificates(response);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const getCertificateById = async (
    id: number,
  ): Promise<ApiClient.GetCertificateDTO | null> => {
    try {
      const response = await client.getCertificate(id);
      return response;
    } catch (error) {
      console.error(`Error fetching certificate with id ${id}:`, error);
      return null;
    }
  };

  const addCertificate = async (
    certificate: ApiClient.CreateCertificateDTO,
  ) => {
    try {
      const response = await client.certificates(certificate);
      return response;
    } catch (error) {
      console.error('Error adding certificate:', error);
      throw error;
    }
  };

  const updateCertificate = async (
    id: number,
    updatedCertificate: ApiClient.UpdateCertficateDTO,
  ) => {
    try {
      await client.updateCertificate(id, updatedCertificate);
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
    }
  };

  const deleteCertificate = async (id: number) => {
    try {
      await client.deleteCertificate(id);
      setCertificates((prev) =>
        prev.filter((cert) => cert.certificateId !== id),
      );
    } catch (error) {
      console.error('Error deleting certificate:', error);
      throw error;
    }
  };

  return {
    certificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    getCertificateById,
  };
};
