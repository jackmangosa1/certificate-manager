import SearchIcon from '../../icons/SearchIcon';
import CrossIcon from '../../icons/CrossIcon';
import './SupplierLookup.css';

type SupplierLookupProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};

const SupplierLookup: React.FC<SupplierLookupProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="row">
      <label htmlFor="supplier">Supplier</label>
      <div className="input-wrapper">
        <input
          type="text"
          id="supplier"
          name="supplier"
          value={value}
          onChange={onChange}
          className="supplier-input"
        />

        <button className="search-button">
          <SearchIcon />
        </button>

        <button className="clear-button">
          <CrossIcon />
        </button>
      </div>
      {error && <p className="supplier-error-message">{error}</p>}
    </div>
  );
};

export default SupplierLookup;
