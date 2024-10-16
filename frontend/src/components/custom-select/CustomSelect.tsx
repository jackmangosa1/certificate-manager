import './CustomSelect.css';
import { useLanguage } from '../../hooks/useLanguage';

type CustomSelectProps = {
  id: string;
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  error?: string;
  className?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  options,
  className = '',
  error,
}) => {
  const { translations } = useLanguage();
  return (
    <div className={`${className} row-select`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option
          value=""
          disabled
        >
          {translations.selectYourOption}
        </option>
        {options.map((option, index) => (
          <option
            key={`${option.value}-${index}`}
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
