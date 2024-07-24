import React, { useState, useEffect } from 'react';
import { useSuppliers } from '../../hooks/useSuppliers';
import './SearchSupplierModal.css';
import { Supplier } from '@/types/types';

type SupplierSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (supplier: string) => void;
};

const SupplierSearchModal: React.FC<SupplierSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { searchSuppliers, initializeAndFetchSuppliers } = useSuppliers();
  const [searchResults, setSearchResults] = useState<Supplier[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    index: '',
    city: '',
  });

  useEffect(() => {
    if (isOpen) {
      const fetchInitialData = async () => {
        const initialSuppliers = await initializeAndFetchSuppliers();
        setSearchResults(initialSuppliers);
      };
      fetchInitialData();
    }
  }, [isOpen, initializeAndFetchSuppliers]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    if (Object.values(searchCriteria).some((value) => value !== '')) {
      const results = await searchSuppliers(searchCriteria);
      setSearchResults(results);
    } else {
      const allSuppliers = await initializeAndFetchSuppliers();
      setSearchResults(allSuppliers);
    }
  };

  const handleReset = async () => {
    setSearchCriteria({ name: '', index: '', city: '' });
    const allSuppliers = await initializeAndFetchSuppliers();
    setSearchResults(allSuppliers);
  };

  const handleSelect = (supplier: Supplier) => {
    onSelect(supplier.name);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Search for suppliers</h2>
          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="search-criteria-container">
            <div className="search-criteria-header">
              <span className="dropdown-arrow">▼</span> Search criteria
            </div>
            <div className="search-criteria">
              <div className="search-fields">
                <div className="search-field">
                  <label>Supplier name</label>
                  <input
                    type="text"
                    name="name"
                    value={searchCriteria.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-field">
                  <label>Supplier index</label>
                  <input
                    type="text"
                    name="index"
                    value={searchCriteria.index}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-field">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={searchCriteria.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="search-buttons">
                <button
                  className="supplier-search-button"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="reset-button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="supplier-list-container">
            <div className="supplier-list-header">
              <span className="dropdown-arrow">▼</span>
              Supplier list
            </div>
            <div className="supplier-list">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Supplier name</th>
                    <th>Supplier index</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>
                        <svg
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                          className="gear-icon-supplier"
                          onClick={() => handleSelect(supplier)}
                        >
                          <path d="m487.4 315.7-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3l-42.6 24.6c-17.9-15.4-38.5-27.3-60.8-35.1v-49.1c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7v49.2c-22.2 7.9-42.8 19.8-60.8 35.1l-42.5-24.6c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14l42.6 24.6c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zm-231.4 20.3c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" />
                        </svg>
                      </td>
                      <td>{supplier.name}</td>
                      <td>{supplier.index}</td>
                      <td>{supplier.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button className="select-button">Select</button>
            <button
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierSearchModal;
