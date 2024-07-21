import React, { useState, useRef, useEffect } from 'react';

interface CustomDateInputProps {
  id: string;
  label: string;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({ id, label }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowPicker(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDisplayValue(date ? new Date(date).toLocaleDateString() : '');
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
              ref={dateInputRef}
              onChange={handleDateChange}
              className="hidden-date-input"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDateInput;
