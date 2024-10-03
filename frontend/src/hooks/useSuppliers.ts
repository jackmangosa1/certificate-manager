import { useState, useCallback } from 'react';
import axios from 'axios';
import { Supplier } from '../types/types';
import { suppliersEndpoint } from '../endpoints/endpoints';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const fetchSuppliers = useCallback(async () => {
    try {
      const response = await axios.get<Supplier[]>(suppliersEndpoint);
      setSuppliers(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
      return [];
    }
  }, []);

  const searchSuppliers = async (criteria: Partial<Supplier>) => {
    try {
      const queryString = new URLSearchParams(criteria as any).toString();
      const response = await axios.get<Supplier[]>(
        `${suppliersEndpoint}?${queryString}`,
      );
      return response.data;
    } catch (error) {
      console.error('Failed to search suppliers:', error);
      throw error;
    }
  };

  const refreshSuppliers = async () => {
    try {
      const suppliersList = await fetchSuppliers();
      return suppliersList;
    } catch (error) {
      console.error('Failed to refresh suppliers:', error);
      return [];
    }
  };

  return {
    suppliers,
    searchSuppliers,
    refreshSuppliers,
    fetchSuppliers,
  };
};
