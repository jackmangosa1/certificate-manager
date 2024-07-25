import React, { useState, useEffect } from 'react';
import { useSuppliers } from '../../hooks/useSuppliers';
import { initializeDatabase } from '../../utils/indexed-db/indexedDb';
import './SearchSupplierModal.css';
import { Supplier } from '@/types/types';

type SupplierSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (supplier: Supplier) => void;
};

const SupplierSearchModal: React.FC<SupplierSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { searchSuppliers } = useSuppliers();
  const [searchResults, setSearchResults] = useState<Supplier[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    index: '',
    city: '',
  });
  const [initialResults, setInitialResults] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  useEffect(() => {
    if (isOpen) {
      const initializeAndFetch = async () => {
        await initializeDatabase();
        const results = await searchSuppliers({});
        setInitialResults(results);
        setSearchResults(results);
      };
      initializeAndFetch();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    const results = await searchSuppliers(searchCriteria);
    setSearchResults(results);
  };

  const handleReset = () => {
    setSearchCriteria({ name: '', index: '', city: '' });
    setSearchResults(initialResults);
  };

  const handleRadioChange = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleSelect = () => {
    if (selectedSupplier) {
      onSelect(selectedSupplier);
      onClose();
    }
  };

  const handleCloseModal = () => {
    handleReset();
    setSelectedSupplier(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Search for suppliers</h2>
          <button
            className="close-button"
            onClick={handleCloseModal}
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
                        <td>
                          <input
                            type="radio"
                            name="selectedSupplier"
                            value={supplier.id}
                            checked={selectedSupplier?.id === supplier.id}
                            onChange={() => handleRadioChange(supplier)}
                          />
                        </td>
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
            <button
              className="select-button"
              onClick={handleSelect}
              disabled={!selectedSupplier}
            >
              Select
            </button>
            <button
              className="cancel-button"
              onClick={handleCloseModal}
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
