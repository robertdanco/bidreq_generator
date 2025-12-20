import React, { useState, useRef, useEffect, useId } from 'react';
import './CollapsibleSection.css';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  onReset?: () => void;
  children: React.ReactNode;
  badge?: string | number;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  icon,
  isExpanded,
  onToggle,
  onReset,
  children,
  badge,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  const uniqueId = useId();
  const contentId = `${id}-content-${uniqueId}`;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, children]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className={`collapsible-section ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="section-header">
        <button
          type="button"
          className="section-toggle-button"
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isExpanded}
          aria-controls={contentId}
        >
          <div className="section-title">
            {icon && <div className="section-icon" aria-hidden="true">{icon}</div>}
            <h3>{title}</h3>
            {badge !== undefined && (
              <span className="section-badge" aria-label={`${badge} items`}>
                {badge}
              </span>
            )}
          </div>
          <span className={`chevron ${isExpanded ? 'up' : 'down'}`} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.427 5.427a.75.75 0 011.146 0L8 7.854l2.427-2.427a.75.75 0 111.146.965l-3 3a.75.75 0 01-1.146 0l-3-3a.75.75 0 010-.965z" />
            </svg>
          </span>
        </button>
        {onReset && isExpanded && (
          <button
            type="button"
            className="reset-button"
            onClick={onReset}
            aria-label={`Reset ${title} to defaults`}
          >
            Reset
          </button>
        )}
      </div>
      <div
        id={contentId}
        className="section-content"
        ref={contentRef}
        style={{ maxHeight: isExpanded ? contentHeight : 0 }}
        role="region"
        aria-labelledby={`${id}-heading-${uniqueId}`}
        hidden={!isExpanded}
      >
        <div className="section-content-inner">{children}</div>
      </div>
    </div>
  );
};
