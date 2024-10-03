import { useState, useCallback } from 'react';
import { ApiClient } from '../api/apiClient';

export const useSuppliers = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [suppliers, setSuppliers] = useState<ApiClient.SupplierDTO[]>([]);

  const searchSuppliers = useCallback(
    async (name?: string, supplierIndex?: number, city?: string) => {
      const client = new ApiClient.Client(baseURL);
      try {
        const response = await client.suppliers(name, supplierIndex, city);
        setSuppliers(response);

        return response;
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
        return [];
      }
    },
    [],
  );

  return {
    suppliers,
    searchSuppliers,
  };
};
