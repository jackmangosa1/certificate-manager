import React from 'react';
import './SearchSupplierModal.css';

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
  if (!isOpen) return null;

  const handleSelect = () => {
    onSelect('ANDEMIS GmbH');
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
          <div className="search-criteria-header">
            <span className="dropdown-arrow">▼</span> Search criteria
          </div>
          <div className="search-criteria">
            <div className="search-fields">
              <div className="search-field">
                <label>Supplier name</label>
                <input
                  type="text"
                  defaultValue="ANDEMIS"
                />
              </div>
              <div className="search-field">
                <label>Supplier index</label>
                <input type="text" />
              </div>
              <div className="search-field">
                <label>City</label>
                <input type="text" />
              </div>
            </div>
            <div className="search-buttons">
              <button className="supplier-search-button">Search</button>
              <button className="reset-button">Reset</button>
            </div>
          </div>
          <div className="supplier-list-header">
            <span className="dropdown-arrow">▼</span>
            Supplier list
          </div>
          <div className="supplier-list">
            <table>
              <thead>
                <tr>
                  <th>Supplier name</th>
                  <th>Supplier index</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="supplier"
                      value="ANDEMIS GmbH"
                    />
                    ANDEMIS GmbH
                  </td>
                  <td>1</td>
                  <td>Stuttgart</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="select-button"
            onClick={handleSelect}
          >
            Select
          </button>
          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierSearchModal;
