import React from 'react';
import './Sections.css';

interface ImpressionHeaderProps {
  index: number;
  impressionId: string;
  canRemove: boolean;
  onRemove: () => void;
}

/**
 * Shared header component for all media type editors (Banner, Video, Audio)
 * Displays impression number, ID badge, and remove button
 */
export const ImpressionHeader: React.FC<ImpressionHeaderProps> = ({
  index,
  impressionId,
  canRemove,
  onRemove,
}) => {
  return (
    <div className="impression-header">
      <h4 className="impression-title">
        Impression #{index + 1}
        <span className="impression-id">ID: {impressionId}</span>
      </h4>
      {canRemove && (
        <button
          type="button"
          className="remove-impression-button"
          onClick={onRemove}
        >
          Remove
        </button>
      )}
    </div>
  );
};
