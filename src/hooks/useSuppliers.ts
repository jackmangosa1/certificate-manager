import { useState } from 'react';
import { Supplier } from '@/types/types';
import {
  addSupplier as addSupplierToDB,
  getSuppliers,
  searchSuppliers as searchSuppliersInDB,
  initializeDatabase,
} from '../utils/indexed-db/indexedDb';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const initializeAndFetchSuppliers = async () => {
    try {
      await initializeDatabase();
      const fetchedSuppliers = await getSuppliers();
      setSuppliers(fetchedSuppliers);
      return fetchedSuppliers;
    } catch (error) {
      console.error('Failed to initialize and fetch suppliers:', error);
      return [];
    }
  };

  const addSupplier = async (supplier: Omit<Supplier, 'id'>) => {
    try {
      const id = await addSupplierToDB(supplier);
      setSuppliers((prev) => [...prev, { id, ...supplier }]);
      return id;
    } catch (error) {
      console.error('Failed to add supplier:', error);
      throw error;
    }
  };

  const searchSuppliers = async (criteria: Partial<Supplier>) => {
    try {
      const results = await searchSuppliersInDB(criteria);
      return results;
    } catch (error) {
      console.error('Failed to search suppliers:', error);
      throw error;
    }
  };

  const refreshSuppliers = async () => {
    try {
      const fetchedSuppliers = await getSuppliers();
      setSuppliers(fetchedSuppliers);
      return fetchedSuppliers;
    } catch (error) {
      console.error('Failed to refresh suppliers:', error);
      return [];
    }
  };

  return {
    suppliers,
    addSupplier,
    searchSuppliers,
    refreshSuppliers,
    initializeAndFetchSuppliers,
  };
};
