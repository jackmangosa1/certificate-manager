<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react';
import { Certificate } from '../types/types';
import {
  addCertificate as addCertificateDB,
  getCertificates as getCertificatesDB,
  updateCertificate as updateCertificateDB,
  deleteCertificate as deleteCertificateDB,
  getCertificateById,
} from '../db/indexedDb';
=======
import { useState, useEffect } from 'react';
import { Certificate } from '@/types/types';
import {
  addCertificate as addCertToDB,
  getCertificates,
  updateCertificate as updateCertInDB,
  deleteCertificate as deleteCertFromDB,
} from '../utils/indexed-db/indexedDb';
>>>>>>> 8b7de54 (task6-KAN-63 Integreated indexed DB)

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certs = await getCertificates();
        setCertificates(certs);
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      }
    };

    fetchCertificates();
  }, []);

  const addCertificate = async (certificate: Omit<Certificate, 'id'>) => {
    try {
      const id = await addCertToDB(certificate);
      setCertificates((prev) => [...prev, { id, ...certificate }]);
    } catch (error) {
      console.error('Failed to add certificate:', error);
>>>>>>> 8b7de54 (task6-KAN-63 Integreated indexed DB)
    }
  };

  const updateCertificate = async (
    id: number,
    updatedCertificate: Omit<Certificate, 'id'>,
  ) => {
    try {
<<<<<<< HEAD
      await updateCertificateDB(id, updatedCertificate);
      fetchCertificates();
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
=======
      await updateCertInDB(id, updatedCertificate);
      setCertificates((prev) =>
        prev.map((cert) =>
          cert.id === id ? { id, ...updatedCertificate } : cert,
        ),
      );
    } catch (error) {
      console.error('Failed to update certificate:', error);
>>>>>>> 8b7de54 (task6-KAN-63 Integreated indexed DB)
    }
  };

  const deleteCertificate = async (id: number) => {
    try {
<<<<<<< HEAD
      await deleteCertificateDB(id);
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));
    } catch (error) {
      console.error('Error deleting certificate:', error);
=======
      await deleteCertFromDB(id);
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));
    } catch (error) {
      console.error('Failed to delete certificate:', error);
>>>>>>> 8b7de54 (task6-KAN-63 Integreated indexed DB)
    }
  };

  return { certificates, addCertificate, updateCertificate, deleteCertificate };
};
