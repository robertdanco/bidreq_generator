import React from 'react';
import './FormFields.css';

interface NumberFieldProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  recommended?: boolean;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  suffix?: string;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  helpText,
  required,
  recommended,
  error,
  min,
  max,
  step = 1,
  disabled,
  className,
  suffix,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange(null);
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  const inputClassName = `field-input ${suffix ? 'has-suffix' : ''} ${required ? 'required-field' : ''} ${recommended && !required ? 'recommended-field' : ''}`;

  return (
    <div className={`form-field ${className || ''} ${error ? 'has-error' : ''}`}>
      <label className="field-label">
        {label}
        {required && <span className="required-indicator">*</span>}
        {recommended && !required && <span className="recommended-indicator">recommended</span>}
      </label>
      <div className="field-input-wrapper">
        <input
          type="number"
          className={inputClassName}
          value={value ?? ''}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          required={required}
        />
        {suffix && <span className="field-suffix">{suffix}</span>}
      </div>
      {helpText && !error && <span className="field-help">{helpText}</span>}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};
