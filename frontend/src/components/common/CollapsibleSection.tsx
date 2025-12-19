import React, { useState, useRef, useEffect } from 'react';
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
  id: _id,
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

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, children]);

  return (
    <div className={`collapsible-section ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="section-header" onClick={onToggle}>
        <div className="section-title">
          {icon && <div className="section-icon">{icon}</div>}
          <h3>{title}</h3>
          {badge !== undefined && <span className="section-badge">{badge}</span>}
        </div>
        <div className="section-actions">
          {onReset && isExpanded && (
            <button
              type="button"
              className="reset-button"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              title="Reset to defaults"
            >
              Reset
            </button>
          )}
          <span className={`chevron ${isExpanded ? 'up' : 'down'}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.427 5.427a.75.75 0 011.146 0L8 7.854l2.427-2.427a.75.75 0 111.146.965l-3 3a.75.75 0 01-1.146 0l-3-3a.75.75 0 010-.965z" />
            </svg>
          </span>
        </div>
      </div>
      <div
        className="section-content"
        ref={contentRef}
        style={{ maxHeight: isExpanded ? contentHeight : 0 }}
      >
        <div className="section-content-inner">{children}</div>
      </div>
    </div>
  );
};
