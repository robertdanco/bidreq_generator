import React from 'react';
import './FormFields.css';

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  options: readonly Option[] | Option[];
  onChange: (value: string | number) => void;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  recommended?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  allowEmpty?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select...',
  helpText,
  required,
  recommended,
  error,
  disabled,
  className,
  allowEmpty = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    // Try to parse as number if original value was a number
    const numVal = parseFloat(val);
    if (!isNaN(numVal) && typeof options[0]?.value === 'number') {
      onChange(numVal);
    } else {
      onChange(val);
    }
  };

  const selectClassName = `field-select ${required ? 'required-field' : ''} ${recommended && !required ? 'recommended-field' : ''}`;

  return (
    <div className={`form-field ${className || ''} ${error ? 'has-error' : ''}`}>
      <label className="field-label">
        {label}
        {required && <span className="required-indicator">*</span>}
        {recommended && !required && <span className="recommended-indicator">recommended</span>}
      </label>
      <select
        className={selectClassName}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      >
        {allowEmpty && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helpText && !error && <span className="field-help">{helpText}</span>}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};
