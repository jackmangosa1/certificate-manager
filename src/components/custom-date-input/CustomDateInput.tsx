import { useState, useRef, useEffect } from 'react';
import './CustomDateInput.css';

type CustomDateInputProps = {
  id: string;
  label: string;
  name: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
};

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  error,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('');
  const [showPicker, setShowPicker] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayValue(value ? value.toLocaleDateString() : '');
  }, [value]);

  const handleClick = () => {
    setShowPicker(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onChange(date);
    setShowPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="row">
      <label htmlFor={id}>{label}</label>
      <div
        className="date-input-wrapper"
        ref={wrapperRef}
      >
        <input
          type="text"
          readOnly
          value={displayValue}
          placeholder="Click to select date"
          onClick={handleClick}
          className="date-display-input"
        />
        {showPicker && (
          <div className="date-picker-overlay">
            <input
              type="date"
              id={id}
              name={name}
              ref={dateInputRef}
              onChange={handleDateChange}
              className="hidden-date-input"
            />
          </div>
        )}
      </div>
      {error && <p className="date-error-message">{error}</p>}
    </div>
  );
};

export default CustomDateInput;
