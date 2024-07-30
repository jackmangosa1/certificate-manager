import { Certificate, Supplier } from '../types/types';

const DB_NAME = 'CertificatesDB';
const DB_VERSION = 5;
const CERTIFICATES_STORE_NAME = 'certificates';
const SUPPLIERS_STORE_NAME = 'suppliers';

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
      if (!db.objectStoreNames.contains(SUPPLIERS_STORE_NAME)) {
        db.createObjectStore(SUPPLIERS_STORE_NAME, {
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

export const addSupplier = async (
  supplier: Omit<Supplier, 'id'>,
): Promise<number> => {
  const db = await openDB();
  const transaction = db.transaction(SUPPLIERS_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(SUPPLIERS_STORE_NAME);
  const request = store.add(supplier);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const getSuppliers = async (): Promise<Supplier[]> => {
  const db = await openDB();
  const transaction = db.transaction(SUPPLIERS_STORE_NAME, 'readonly');
  const store = transaction.objectStore(SUPPLIERS_STORE_NAME);
  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const searchSuppliers = async (
  criteria: Partial<Supplier>,
): Promise<Supplier[]> => {
  const suppliers = await getSuppliers();
  return suppliers.filter(
    (supplier) =>
      (!criteria.name ||
        supplier.name.toLowerCase().includes(criteria.name.toLowerCase())) &&
      (!criteria.index || supplier.index.includes(criteria.index)) &&
      (!criteria.city ||
        supplier.city.toLowerCase().includes(criteria.city.toLowerCase())),
  );
};

const initializeSuppliers = async () => {
  const sampleSuppliers: Supplier[] = [
    { id: 1, name: 'ANDEMIS GmbH', index: '1', city: 'Stuttgart' },
    { id: 2, name: 'Acme Corp', index: '2', city: 'Berlin' },
    { id: 3, name: 'TechnoSoft', index: '3', city: 'Munich' },
  ];

  for (const supplier of sampleSuppliers) {
    await addSupplier(supplier);
  }
};

export const initializeDatabase = async () => {
  await openDB();
  const suppliers = await getSuppliers();
  if (suppliers.length === 0) {
    await initializeSuppliers();
  }
};
