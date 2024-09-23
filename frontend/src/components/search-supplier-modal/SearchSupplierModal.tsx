import React, { useState } from 'react';
import { useSuppliers } from '../../hooks/useSuppliers';
import { initializeDatabase } from '../../db/indexedDb';
import './SearchSupplierModal.css';
import { Supplier } from '@/types/types';
import Table, { ColumnConfig } from '../../components/table/Table';
import { useLanguage } from '../../hooks/useLanguage';

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
  const { translations } = useLanguage();
  const { searchSuppliers } = useSuppliers();
  const [searchResults, setSearchResults] = useState<Supplier[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    index: '',
    city: '',
  });
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    await initializeDatabase();
    const results = await searchSuppliers(searchCriteria);
    setSearchResults(results);
  };

  const handleReset = () => {
    setSearchCriteria({ name: '', index: '', city: '' });
    setSearchResults([]);
    setSelectedSupplier(null);
  };

  const handleRadioChange = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleSelect = () => {
    if (selectedSupplier) {
      onSelect(selectedSupplier);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    handleReset();
    onClose();
  };

  const columns: ColumnConfig<Supplier>[] = [
    {
      header: translations.supplierName,
      accessor: (supplier) => supplier.name,
    },
    {
      header: translations.supplierIndex,
      accessor: (supplier) => supplier.index,
    },
    { header: translations.city, accessor: (supplier) => supplier.city },
  ];

  const actionColumn = {
    header: translations.select,
    render: (supplier: Supplier) => (
      <input
        type="radio"
        name="selectedSupplier"
        value={supplier.id}
        checked={selectedSupplier?.id === supplier.id}
        onChange={() => handleRadioChange(supplier)}
      />
    ),
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{translations.searchForSuppliers}</h2>
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
              <span className="dropdown-arrow">▼</span>{' '}
              {translations.searchCriteria}
            </div>
            <div className="search-criteria">
              <div className="search-fields">
                <div className="search-field">
                  <label>{translations.supplierName}</label>
                  <input
                    type="text"
                    name="name"
                    value={searchCriteria.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-field">
                  <label>{translations.supplierIndex}</label>
                  <input
                    type="text"
                    name="index"
                    value={searchCriteria.index}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-field">
                  <label>{translations.city}</label>
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
                  {translations.search}
                </button>
                <button
                  className="reset-button"
                  onClick={handleReset}
                >
                  {translations.reset}
                </button>
              </div>
            </div>
          </div>

          <div className="supplier-list-container">
            <div className="supplier-list-header">
              <span className="dropdown-arrow">▼</span>
              {translations.supplierList}
            </div>
            <div className="supplier-list">
              <Table
                columns={columns}
                data={searchResults}
                actionColumn={actionColumn}
                onRowClick={(supplier) => handleRadioChange(supplier)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className={`select-button ${!selectedSupplier ? 'disabled' : ''}`}
              onClick={handleSelect}
              disabled={!selectedSupplier}
            >
              {translations.select}
            </button>
            <button
              className="cancel-button"
              onClick={handleCloseModal}
            >
              {translations.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierSearchModal;
