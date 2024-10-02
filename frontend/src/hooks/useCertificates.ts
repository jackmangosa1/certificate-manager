import { useState, useEffect, useCallback } from 'react';
import { Certificate, CertificateSummary } from '../types/types';
import axios from 'axios';
import { certificatesEndpoint } from '../endpoints/endpoints';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<CertificateSummary[]>([]);

  const fetchCertificates = useCallback(async () => {
    try {
      const response = await axios.get(certificatesEndpoint);
      setCertificates(response.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const getCertificateById = async (
    id: number,
  ): Promise<Certificate | null> => {
    try {
      const response = await axios.get<Certificate>(
        `${certificatesEndpoint}/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching certificate with id ${id}:`, error);
      return null;
    }
  };

  const addCertificate = async (
    certificate: Omit<Certificate, 'certificateId'>,
  ) => {
    try {
      await axios.post<Certificate>(certificatesEndpoint, certificate);
    } catch (error) {
      console.error('Error adding certificate:', error);
      throw error;
    }
  };

  const updateCertificate = async (
    id: number,
    updatedCertificate: Omit<Certificate, 'certificateId'>,
  ) => {
    try {
      await axios.put<Certificate>(
        `${certificatesEndpoint}/${id}`,
        updatedCertificate,
      );
      setCertificates((prev) =>
        prev.map((cert) =>
          cert.certificateId === id ? { ...cert, ...updatedCertificate } : cert,
        ),
      );
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
    }
  };

  const deleteCertificate = async (id: number) => {
    try {
      await axios.delete(`${certificatesEndpoint}/${id}`);
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
