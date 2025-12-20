import React, { useId } from 'react';
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
  const uniqueId = useId();
  const inputId = `number-${uniqueId}`;
  const helpId = helpText && !error ? `number-help-${uniqueId}` : undefined;
  const errorId = error ? `number-error-${uniqueId}` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

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
      <label className="field-label" htmlFor={inputId}>
        {label}
        {required && <span className="required-indicator" aria-hidden="true">*</span>}
        {recommended && !required && <span className="recommended-indicator">recommended</span>}
      </label>
      <div className="field-input-wrapper">
        <input
          id={inputId}
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
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        {suffix && <span className="field-suffix" aria-hidden="true">{suffix}</span>}
      </div>
      {helpText && !error && (
        <span id={helpId} className="field-help">
          {helpText}
        </span>
      )}
      {error && (
        <span id={errorId} className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
