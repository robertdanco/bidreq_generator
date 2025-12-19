import React from 'react';
import './FormFields.css';

interface Option {
  value: string | number;
  label: string;
  description?: string;
}

interface MultiSelectFieldProps {
  label: string;
  values: (string | number)[];
  options: readonly Option[] | Option[];
  onChange: (values: (string | number)[]) => void;
  helpText?: string;
  required?: boolean;
  recommended?: boolean;
  disabled?: boolean;
  className?: string;
  columns?: number;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  values,
  options,
  onChange,
  helpText,
  required,
  recommended,
  disabled,
  className,
  columns = 2,
}) => {
  const handleToggle = (optValue: string | number) => {
    if (values.includes(optValue)) {
      onChange(values.filter((v) => v !== optValue));
    } else {
      onChange([...values, optValue]);
    }
  };

  const handleSelectAll = () => {
    if (values.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((o) => o.value));
    }
  };

  return (
    <div className={`form-field multi-select-field ${className || ''}`}>
      <div className="field-label-row">
        <label className="field-label">
          {label}
          {required && <span className="required-indicator">*</span>}
          {recommended && !required && <span className="recommended-indicator">recommended</span>}
        </label>
        <button
          type="button"
          className="select-all-button"
          onClick={handleSelectAll}
          disabled={disabled}
        >
          {values.length === options.length ? 'Clear All' : 'Select All'}
        </button>
      </div>
      <div
        className="checkbox-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`checkbox-item ${values.includes(opt.value) ? 'checked' : ''}`}
          >
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
              disabled={disabled}
            />
            <span className="checkbox-label">
              {opt.label}
              {opt.description && (
                <span className="checkbox-description">{opt.description}</span>
              )}
            </span>
          </label>
        ))}
      </div>
      {helpText && <span className="field-help">{helpText}</span>}
    </div>
  );
};
