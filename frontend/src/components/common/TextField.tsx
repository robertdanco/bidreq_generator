import React, { useId } from 'react';
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
  const uniqueId = useId();
  const inputId = `text-${uniqueId}`;
  const helpId = helpText && !error ? `text-help-${uniqueId}` : undefined;
  const errorId = error ? `text-error-${uniqueId}` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

  const inputClassName = `field-input ${required ? 'required-field' : ''} ${recommended && !required ? 'recommended-field' : ''}`;

  return (
    <div className={`form-field ${className || ''} ${error ? 'has-error' : ''}`}>
      <label className="field-label" htmlFor={inputId}>
        {label}
        {required && <span className="required-indicator" aria-hidden="true">*</span>}
        {recommended && !required && <span className="recommended-indicator">recommended</span>}
      </label>
      <input
        id={inputId}
        type={type}
        className={inputClassName}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
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
