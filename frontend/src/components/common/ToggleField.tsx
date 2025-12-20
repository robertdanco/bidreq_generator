import React, { useId } from 'react';
import './FormFields.css';

interface ToggleFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  helpText?: string;
  disabled?: boolean;
  className?: string;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({
  label,
  value,
  onChange,
  helpText,
  disabled,
  className,
}) => {
  const uniqueId = useId();
  const inputId = `toggle-${uniqueId}`;
  const helpId = helpText ? `toggle-help-${uniqueId}` : undefined;

  return (
    <div className={`form-field toggle-field ${className || ''}`}>
      <label className="toggle-container" htmlFor={inputId}>
        <span className="toggle-label">{label}</span>
        <div className="toggle-wrapper">
          <input
            id={inputId}
            type="checkbox"
            className="toggle-input"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            role="switch"
            aria-checked={value}
            aria-describedby={helpId}
          />
          <span className="toggle-slider" aria-hidden="true"></span>
        </div>
      </label>
      {helpText && (
        <span id={helpId} className="field-help toggle-help">
          {helpText}
        </span>
      )}
    </div>
  );
};
