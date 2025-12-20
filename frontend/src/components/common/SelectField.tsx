import React, { useId } from 'react';
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
  /** Threshold above which to show "more options" indicator */
  showMoreThreshold?: number;
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
  showMoreThreshold = 6,
}) => {
  const uniqueId = useId();
  const selectId = `select-${uniqueId}`;
  const helpId = helpText && !error ? `select-help-${uniqueId}` : undefined;
  const errorId = error ? `select-error-${uniqueId}` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

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
  const hasMoreOptions = options.length > showMoreThreshold;

  return (
    <div className={`form-field ${className || ''} ${error ? 'has-error' : ''}`}>
      <label className="field-label" htmlFor={selectId}>
        {label}
        {required && <span className="required-indicator" aria-hidden="true">*</span>}
        {recommended && !required && <span className="recommended-indicator">recommended</span>}
      </label>
      <div className="select-wrapper">
        <select
          id={selectId}
          className={selectClassName}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        >
          {allowEmpty && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {hasMoreOptions && (
          <span
            className="options-count-badge"
            aria-label={`${options.length} options available`}
          >
            <span className="options-count-number" aria-hidden="true">{options.length}</span>
            <span className="options-count-label" aria-hidden="true">options</span>
            <span className="options-count-indicator" aria-hidden="true">↕</span>
          </span>
        )}
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
