import { Certificate } from '../../types/types';
import { Supplier } from '../../types/types';
import { Participant } from '../../types/types';

const DB_NAME = 'CertificatesDB';
const DB_VERSION = 5;
const CERTIFICATES_STORE_NAME = 'certificates';
const SUPPLIERS_STORE_NAME = 'suppliers';
const PARTICIPANTS_STORE_NAME = 'participants';

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
      if (!db.objectStoreNames.contains(PARTICIPANTS_STORE_NAME)) {
        db.createObjectStore(PARTICIPANTS_STORE_NAME, {
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

const initializeParticipants = async () => {
  const sampleParticipants: Participant[] = [
    {
      id: 1,
      firstName: 'Jane',
      name: 'Smith',
      userId: 'jane.smith',
      department: 'Marketing',
      plant: '094',
      email: 'janesmuth@gmail.com',
    },
    {
      id: 2,
      firstName: 'Alice',
      name: 'Johnson',
      userId: 'alice.johnson',
      department: 'Sales',
      plant: '098',
      email: 'alicejohnson@gmail.com',
    },
  ];

  for (const participant of sampleParticipants) {
    await addParticipant(participant);
  }
};

export const initializeDatabase = async () => {
  await openDB();
  const suppliers = await getSuppliers();
  if (suppliers.length === 0) {
    await initializeSuppliers();
  }
  const participants = await getParticipants();
  if (participants.length === 0) {
    await initializeParticipants();
  }
};

export const addParticipant = async (
  participant: Omit<Participant, 'id'>,
): Promise<number> => {
  const db = await openDB();
  const transaction = db.transaction(PARTICIPANTS_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(PARTICIPANTS_STORE_NAME);
  const request = store.add(participant);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const getParticipants = async (): Promise<Participant[]> => {
  const db = await openDB();
  const transaction = db.transaction(PARTICIPANTS_STORE_NAME, 'readonly');
  const store = transaction.objectStore(PARTICIPANTS_STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const updateParticipant = async (
  id: number,
  updatedParticipant: Omit<Participant, 'id'>,
): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(PARTICIPANTS_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(PARTICIPANTS_STORE_NAME);

  const participantToUpdate: Participant = {
    id,
    ...updatedParticipant,
  };

  const request = store.put(participantToUpdate);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const deleteParticipant = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(PARTICIPANTS_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(PARTICIPANTS_STORE_NAME);

  const request = store.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const searchParticipants = async (
  criteria: Partial<Participant>,
): Promise<Participant[]> => {
  const participants = await getParticipants();
  return participants.filter(
    (participant) =>
      (!criteria.name ||
        participant.name.toLowerCase().includes(criteria.name.toLowerCase())) &&
      (!criteria.firstName ||
        participant.firstName
          .toLowerCase()
          .includes(criteria.firstName.toLowerCase())) &&
      (!criteria.userId ||
        participant.userId
          .toLowerCase()
          .includes(criteria.userId.toLowerCase())) &&
      (!criteria.department ||
        participant.department
          .toLowerCase()
          .includes(criteria.department.toLowerCase())) &&
      (!criteria.plant ||
        participant.plant.toLowerCase().includes(criteria.plant.toLowerCase())),
  );
};
