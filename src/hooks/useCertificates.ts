import { useState, useEffect, useCallback } from 'react';
import { Certificate } from '../types/types';
import {
  addCertificate as addCertificateDB,
  getCertificates as getCertificatesDB,
  updateCertificate as updateCertificateDB,
  deleteCertificate as deleteCertificateDB,
  getCertificateById,
} from '../db/indexedDb';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const fetchCertificates = useCallback(async () => {
    try {
      const fetchedCertificates = await getCertificatesDB();
      setCertificates(fetchedCertificates);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const addCertificate = async (certificate: Omit<Certificate, 'id'>) => {
    try {
      const id = await addCertificateDB(certificate);
      const newCertificate = await getCertificateById(id);
      if (newCertificate) {
        setCertificates((prev) => [...prev, newCertificate]);
      }
    } catch (error) {
      console.error('Error adding certificate:', error);
      throw error;
    }
  };

  const updateCertificate = async (
    id: number,
    updatedCertificate: Omit<Certificate, 'id'>,
  ) => {
    try {
      await updateCertificateDB(id, updatedCertificate);
      fetchCertificates();
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
    }
  };

  const deleteCertificate = async (id: number) => {
    try {
      await deleteCertificateDB(id);
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  return { certificates, addCertificate, updateCertificate, deleteCertificate };
};
