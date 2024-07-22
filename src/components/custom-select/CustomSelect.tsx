import React from 'react';
import './CustomSelect.css';

type CustomSelectProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <div className="row">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="select-input"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="select-error-message">{error}</p>}
    </div>
  );
};

export default CustomSelect;
