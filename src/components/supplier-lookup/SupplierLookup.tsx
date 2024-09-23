import React from 'react';
import SearchIcon from '../../icons/SearchIcon';
import CrossIcon from '../../icons/CrossIcon';
import './SupplierLookup.css';
import { useLanguage } from '../../hooks/useLanguage';

type SupplierLookupProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  onSearch: () => void;
  onClear: () => void;
};

const SupplierLookup: React.FC<SupplierLookupProps> = ({
  value,
  onChange,
  onSearch,
  error,
  onClear,
}) => {
  const { translations } = useLanguage();
  return (
    <div className="row">
      <label htmlFor="supplier">{translations.supplier}</label>
      <div className="input-wrapper">
        <input
          type="text"
          id="supplier"
          name="supplier"
          value={value}
          onChange={onChange}
          className="supplier-input"
          readOnly
        />
        <button
          className="search-button"
          onClick={onSearch}
        >
          <SearchIcon />
        </button>
        <button
          className="clear-button"
          onClick={onClear}
        >
          <CrossIcon />
        </button>
      </div>
      {error && <p className="supplier-error-message">{error}</p>}
    </div>
  );
};

export default SupplierLookup;
