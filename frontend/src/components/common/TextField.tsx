import React from 'react';
import './FormFields.css';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  recommended?: boolean;
  error?: string;
  type?: 'text' | 'url' | 'email';
  maxLength?: number;
  disabled?: boolean;
  className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  helpText,
  required,
  recommended,
  error,
  type = 'text',
  maxLength,
  disabled,
  className,
}) => {
  const inputClassName = `field-input ${required ? 'required-field' : ''} ${recommended && !required ? 'recommended-field' : ''}`;

  return (
    <div className={`form-field ${className || ''} ${error ? 'has-error' : ''}`}>
      <label className="field-label">
        {label}
        {required && <span className="required-indicator">*</span>}
        {recommended && !required && <span className="recommended-indicator">recommended</span>}
      </label>
      <input
        type={type}
        className={inputClassName}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
      />
      {helpText && !error && <span className="field-help">{helpText}</span>}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};
