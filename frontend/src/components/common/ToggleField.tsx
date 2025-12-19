import React from 'react';
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
  return (
    <div className={`form-field toggle-field ${className || ''}`}>
      <label className="toggle-container">
        <span className="toggle-label">{label}</span>
        <div className="toggle-wrapper">
          <input
            type="checkbox"
            className="toggle-input"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />
          <span className="toggle-slider"></span>
        </div>
      </label>
      {helpText && <span className="field-help toggle-help">{helpText}</span>}
    </div>
  );
};
