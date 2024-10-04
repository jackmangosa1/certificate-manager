import { useState, useCallback } from 'react';
import { useApi } from './useApi'; 
import { ApiClient } from '../api/apiClient'; 

export const useSuppliers = () => {
  const client = useApi(); 
  const [suppliers, setSuppliers] = useState<ApiClient.SupplierDTO[]>([]);

  const searchSuppliers = useCallback(
    async (name?: string, supplierIndex?: number, city?: string) => {
      try {
        const response = await client.suppliers(name, supplierIndex, city);
        setSuppliers(response);
        return response;
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
        return [];
      }
    },
    [client], 
  );

  return {
    suppliers,
    searchSuppliers,
  };
};
