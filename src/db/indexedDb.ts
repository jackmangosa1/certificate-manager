import { Certificate } from '../types/types';

const DB_NAME = 'CertificatesDB';
const DB_VERSION = 5;
const CERTIFICATES_STORE_NAME = 'certificates';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(CERTIFICATES_STORE_NAME)) {
        db.createObjectStore(CERTIFICATES_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const addCertificate = async (
  certificate: Omit<Certificate, 'id'>,
): Promise<number> => {
  const db = await openDB();
  const transaction = db.transaction(CERTIFICATES_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(CERTIFICATES_STORE_NAME);
  const request = store.add(certificate);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const getCertificates = async (): Promise<Certificate[]> => {
  const db = await openDB();
  const transaction = db.transaction(CERTIFICATES_STORE_NAME, 'readonly');
  const store = transaction.objectStore(CERTIFICATES_STORE_NAME);
  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const updateCertificate = async (
  id: number,
  updatedCertificate: Omit<Certificate, 'id'>,
): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(CERTIFICATES_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(CERTIFICATES_STORE_NAME);

  const certificateToUpdate: Certificate = {
    id,
    ...updatedCertificate,
  };

  const request = store.put(certificateToUpdate);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const deleteCertificate = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(CERTIFICATES_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(CERTIFICATES_STORE_NAME);

  const request = store.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const getCertificateById = async (
  id: number,
): Promise<Certificate | undefined> => {
  const db = await openDB();
  const transaction = db.transaction(CERTIFICATES_STORE_NAME, 'readonly');
  const store = transaction.objectStore(CERTIFICATES_STORE_NAME);

  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};