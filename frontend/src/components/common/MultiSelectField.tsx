import React, { useRef, useState, useEffect, useCallback } from 'react';
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
  /** Maximum height before scrolling kicks in (in px). Set to 0 for no limit. */
  maxHeight?: number;
  /** Number of options above which to enable scrolling */
  scrollThreshold?: number;
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
  maxHeight = 280,
  scrollThreshold = 8,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<'top' | 'middle' | 'bottom' | 'none'>('none');

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isScrollable = scrollHeight > clientHeight;

    if (!isScrollable) {
      setScrollState('none');
    } else if (scrollTop <= 2) {
      setScrollState('top');
    } else if (scrollTop + clientHeight >= scrollHeight - 2) {
      setScrollState('bottom');
    } else {
      setScrollState('middle');
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });

    // Also update on resize
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  // Update scroll state when options change (separate effect to avoid listener churn)
  useEffect(() => {
    updateScrollState();
  }, [options.length, updateScrollState]);

  const handleToggle = (optValue: string | number) => {
    if (values.includes(optValue)) {
      onChange(values.filter((v) => v !== optValue));
    } else {
      onChange([...values, optValue]);
    }
  };

  // Ensure focused checkbox items scroll into view for keyboard navigation
  const handleCheckboxFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    e.target.closest('.checkbox-item')?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  };

  const handleSelectAll = () => {
    if (values.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((o) => o.value));
    }
  };

  const shouldScroll = options.length > scrollThreshold && maxHeight > 0;
  const showTopFade = scrollState === 'middle' || scrollState === 'bottom';
  const showBottomFade = scrollState === 'middle' || scrollState === 'top';

  return (
    <div className={`form-field multi-select-field ${className || ''}`}>
      <div className="field-label-row">
        <label className="field-label">
          {label}
          {required && <span className="required-indicator">*</span>}
          {recommended && !required && <span className="recommended-indicator">recommended</span>}
        </label>
        <div className="multi-select-actions">
          {shouldScroll && (
            <span className="options-count-inline">
              <span className="options-count-selected">{values.length}</span>
              <span className="options-count-divider">/</span>
              <span className="options-count-total">{options.length}</span>
            </span>
          )}
          <button
            type="button"
            className="select-all-button"
            onClick={handleSelectAll}
            disabled={disabled}
          >
            {values.length === options.length ? 'Clear All' : 'Select All'}
          </button>
        </div>
      </div>
      <div className={`checkbox-scroll-container ${shouldScroll ? 'scrollable' : ''}`}>
        {shouldScroll && showTopFade && (
          <div className="scroll-fade scroll-fade-top" aria-hidden="true">
            <span className="scroll-hint-icon">▲</span>
          </div>
        )}
        <div
          ref={scrollContainerRef}
          className="checkbox-grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            ...(shouldScroll ? { maxHeight: `${maxHeight}px`, overflowY: 'auto' } : {})
          }}
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
                onFocus={handleCheckboxFocus}
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
        {shouldScroll && showBottomFade && (
          <div className="scroll-fade scroll-fade-bottom" aria-hidden="true">
            <span className="scroll-hint-icon">▼</span>
            <span className="scroll-hint-text">scroll for more</span>
          </div>
        )}
      </div>
      {helpText && <span className="field-help">{helpText}</span>}
    </div>
  );
};
