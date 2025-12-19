import React, { useState, useMemo } from 'react';
import './FormFields.css';

/** Searchable suggestion with display text separate from stored value */
export interface SearchableSuggestion {
  value: string;      // The actual value to store (e.g., "IAB1-1")
  searchText: string; // Lowercase searchable text for filtering
  displayText: string; // What to show in dropdown (e.g., "IAB1-1 - Arts & Entertainment > Books & Literature")
}

interface ArrayFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  className?: string;
  suggestions?: string[];
  /** Searchable suggestions with separate display text (takes precedence over suggestions) */
  searchableData?: SearchableSuggestion[];
  /** Format a stored value for display in tags */
  displayFormatter?: (value: string) => string;
  maxItems?: number;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  label,
  values,
  onChange,
  placeholder = 'Add item...',
  helpText,
  disabled,
  className,
  suggestions = [],
  searchableData,
  displayFormatter,
  maxItems,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Compute filtered suggestions based on input
  const filteredSuggestions = useMemo(() => {
    const searchTerm = inputValue.toLowerCase();

    if (searchableData) {
      // Use searchable data with rich display
      return searchableData
        .filter((s) => s.searchText.includes(searchTerm) && !values.includes(s.value))
        .slice(0, 10)
        .map((s) => ({ value: s.value, display: s.displayText }));
    }

    // Fall back to simple string suggestions
    return suggestions
      .filter((s) => s.toLowerCase().includes(searchTerm) && !values.includes(s))
      .slice(0, 5)
      .map((s) => ({ value: s, display: s }));
  }, [inputValue, searchableData, suggestions, values]);

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !values.includes(trimmed)) {
      if (!maxItems || values.length < maxItems) {
        onChange([...values, trimmed]);
        setInputValue('');
      }
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleSuggestionClick = (value: string) => {
    if (!values.includes(value)) {
      if (!maxItems || values.length < maxItems) {
        onChange([...values, value]);
      }
    }
    setShowSuggestions(false);
  };

  return (
    <div className={`form-field array-field ${className || ''}`}>
      <label className="field-label">{label}</label>

      {values.length > 0 && (
        <div className="tag-list">
          {values.map((val, idx) => (
            <span key={idx} className="tag">
              <span className="tag-code">{val}</span>
              {displayFormatter && (
                <span className="tag-name">{displayFormatter(val)}</span>
              )}
              <button
                type="button"
                className="tag-remove"
                onClick={() => handleRemove(idx)}
                disabled={disabled}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="array-input-wrapper">
        <input
          type="text"
          className="field-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          disabled={disabled || (maxItems !== undefined && values.length >= maxItems)}
        />
        <button
          type="button"
          className="array-add-button"
          onClick={handleAdd}
          disabled={disabled || !inputValue.trim() || (maxItems !== undefined && values.length >= maxItems)}
        >
          Add
        </button>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion.value}
                className="suggestion-item"
                onMouseDown={() => handleSuggestionClick(suggestion.value)}
              >
                <span className="suggestion-code">{suggestion.value}</span>
                {suggestion.display !== suggestion.value && (
                  <span className="suggestion-name">{suggestion.display.replace(suggestion.value, '').replace(/^\s*-\s*/, '')}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {helpText && <span className="field-help">{helpText}</span>}
      {maxItems && (
        <span className="field-help">
          {values.length}/{maxItems} items
        </span>
      )}
    </div>
  );
};
