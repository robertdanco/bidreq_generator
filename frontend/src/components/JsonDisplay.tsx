import { useState, useEffect, useCallback } from 'react';
import JsonView from '@uiw/react-json-view';
import { useScrollToChange } from '../hooks/useScrollToChange';

// Custom high-contrast dark theme for better accessibility
const accessibleDarkTheme = {
  '--w-rjv-font-family': "'Geist Mono', 'SF Mono', 'Consolas', monospace",
  '--w-rjv-color': '#e8edf4',                    // Primary text - high contrast
  '--w-rjv-key-string': '#00d9ff',               // Keys - cyan accent
  '--w-rjv-background-color': '#0a0e14',         // Dark background
  '--w-rjv-line-color': 'rgba(255, 255, 255, 0.1)',
  '--w-rjv-arrow-color': '#8494a4',              // Tertiary text
  '--w-rjv-edit-color': '#00d9ff',
  '--w-rjv-info-color': '#8494a4',               // Tertiary text
  '--w-rjv-update-color': '#00d9ff',
  '--w-rjv-copied-color': '#00ff88',             // Success green
  '--w-rjv-copied-success-color': '#00ff88',
  '--w-rjv-curlybraces-color': '#a3b1bf',        // Secondary text
  '--w-rjv-colon-color': '#a3b1bf',
  '--w-rjv-brackets-color': '#a3b1bf',
  '--w-rjv-ellipsis-color': '#8494a4',
  '--w-rjv-type-string-color': '#00ff88',        // Strings - green
  '--w-rjv-type-int-color': '#ff9f43',           // Numbers - amber
  '--w-rjv-type-float-color': '#ff9f43',
  '--w-rjv-type-bigint-color': '#ff9f43',
  '--w-rjv-type-boolean-color': '#a855f7',       // Booleans - purple
  '--w-rjv-type-date-color': '#00d9ff',
  '--w-rjv-type-url-color': '#00d9ff',
  '--w-rjv-type-null-color': '#ff4757',          // Null - red
  '--w-rjv-type-nan-color': '#ff4757',
  '--w-rjv-type-undefined-color': '#ff4757',
};

interface JsonDisplayProps {
  data: any;
  warnings?: string[];
  scrollRef?: React.RefObject<HTMLDivElement>;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data, warnings, scrollRef }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'raw'>('visual');

  // Auto-scroll to changed fields
  const { scrollContainerRef, scrollToChange } = useScrollToChange(data);

  // Trigger scroll when data changes
  useEffect(() => {
    if (viewMode === 'visual') {
      // Small delay to ensure DOM has updated
      const timer = setTimeout(scrollToChange, 50);
      return () => clearTimeout(timer);
    }
  }, [data, scrollToChange, viewMode]);

  const handleCopy = async () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bid_request_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to download:', err);
      alert('Failed to download JSON');
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="json-display-container">
      <div className="json-header">
        <h2>Live Bid Request</h2>
        <div className="json-actions">
          <div className="view-mode-toggle">
            <button
              type="button"
              className={`view-mode-button ${viewMode === 'visual' ? 'active' : ''}`}
              onClick={() => setViewMode('visual')}
            >
              Visual
            </button>
            <button
              type="button"
              className={`view-mode-button ${viewMode === 'raw' ? 'active' : ''}`}
              onClick={() => setViewMode('raw')}
            >
              Raw
            </button>
          </div>
          <button
            className={`action-button ${copySuccess ? 'success' : ''}`}
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
          <button
            className={`action-button ${downloadSuccess ? 'success' : ''}`}
            onClick={handleDownload}
            title="Download as JSON file"
          >
            {downloadSuccess ? 'Downloaded!' : 'Download'}
          </button>
        </div>
      </div>

      {warnings && warnings.length > 0 && (
        <div className="warnings">
          <h3>Warnings</h3>
          <ul>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="json-viewer" ref={useCallback((node: HTMLDivElement | null) => {
        // Assign to both refs
        if (scrollContainerRef) {
          (scrollContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
        if (scrollRef) {
          (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }, [scrollContainerRef, scrollRef])}>
        {viewMode === 'visual' ? (
          <JsonView
            value={data}
            style={{
              ...accessibleDarkTheme,
              padding: '16px',
              fontSize: '0.8125rem',
              lineHeight: '1.6',
            }}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
          />
        ) : (
          <pre className="raw-json">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>

      <div className="json-stats">
        <span className="stat">
          <strong>ID:</strong> {data.id}
        </span>
        <span className="stat">
          <strong>Impressions:</strong> {data.imp?.length || 0}
        </span>
        <span className="stat">
          <strong>Size:</strong> {JSON.stringify(data).length} bytes
        </span>
      </div>
    </div>
  );
};

export default JsonDisplay;
