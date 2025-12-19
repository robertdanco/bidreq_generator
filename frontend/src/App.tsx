import { useState, useEffect } from 'react';
import BidRequestForm from './components/BidRequestForm';
import JsonDisplay from './components/JsonDisplay';
import { useBidRequestStore } from './stores/useBidRequestStore';
import './App.css';

// Generate unique ID for bid request
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Transform API payload to OpenRTB bid request format
function transformToOpenRTB(payload: any): any {
  const bidRequest: any = {
    id: generateId(),
    imp: payload.impressions || [],
    at: payload.at || 1,
    tmax: payload.tmax || 200,
  };

  if (payload.test) bidRequest.test = payload.test;
  if (payload.cur && payload.cur.length > 0) bidRequest.cur = payload.cur;
  if (payload.allimps) bidRequest.allimps = payload.allimps;
  if (payload.bcat && payload.bcat.length > 0) bidRequest.bcat = payload.bcat;
  if (payload.badv && payload.badv.length > 0) bidRequest.badv = payload.badv;
  if (payload.bapp && payload.bapp.length > 0) bidRequest.bapp = payload.bapp;

  // Add site if provided
  if (payload.site) {
    bidRequest.site = {
      ...payload.site,
      domain: payload.domain || payload.site.domain,
      page: payload.page || payload.site.page,
    };
  }

  // Add device with geo
  if (payload.device) {
    bidRequest.device = { ...payload.device };
    if (payload.geo) {
      bidRequest.device.geo = payload.geo;
    }
  }

  return bidRequest;
}

// Client-side validation
function validateBidRequest(bidRequest: any): string[] {
  const warnings: string[] = [];

  if (!bidRequest.site?.domain) {
    warnings.push('Site domain is missing');
  }

  if (!bidRequest.site?.page) {
    warnings.push('Site page URL is missing');
  }

  if (!bidRequest.imp || bidRequest.imp.length === 0) {
    warnings.push('No impressions defined');
  } else {
    bidRequest.imp.forEach((imp: any, index: number) => {
      if (imp.banner) {
        if (!imp.banner.w || !imp.banner.h) {
          warnings.push(`Impression ${index + 1}: Banner dimensions missing`);
        }
      }
    });
  }

  return warnings;
}

function App() {
  const storeState = useBidRequestStore();
  const { site, device, geo, impressions, auction, toApiPayload } = storeState;

  // Live bid request - computed from current form state
  const [liveBidRequest, setLiveBidRequest] = useState<any>(null);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Update preview whenever store changes
  useEffect(() => {
    try {
      const payload = toApiPayload();
      const bidRequest = transformToOpenRTB(payload);
      setLiveBidRequest(bidRequest);

      // Run client-side validation
      const warnings = validateBidRequest(bidRequest);
      setValidationWarnings(warnings);
      setError(null);
    } catch (e) {
      console.error('Error generating live preview:', e);
      setError(e instanceof Error ? e.message : 'Failed to generate preview');
    }
  }, [site, device, geo, impressions, auction, toApiPayload]);

  const handleSave = () => {
    // Validate before saving
    if (validationWarnings.length > 0) {
      alert(`Cannot save: ${validationWarnings.join(', ')}`);
      return;
    }

    // Copy to clipboard
    try {
      const jsonString = JSON.stringify(liveBidRequest, null, 2);
      navigator.clipboard.writeText(jsonString);
      alert('Bid request saved to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to save to clipboard');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="header-title">
            <h1>BidReq Generator</h1>
            <p className="subtitle">OpenRTB 2.6 Protocol</p>
          </div>
        </div>
        <span className="header-badge">v2.6</span>
      </header>

      <main className="app-main">
        <div className="content-grid">
          <div className="form-column">
            <BidRequestForm onSave={handleSave} />
          </div>

          <div className="result-column">
            <div className="live-preview-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Live Preview</span>
            </div>

            {error && (
              <div className="error-message">
                <h2>Error</h2>
                <p>{error}</p>
              </div>
            )}

            {!error && liveBidRequest && (
              <JsonDisplay data={liveBidRequest} warnings={validationWarnings} />
            )}

            <div className="preview-help">
              <p>Preview updates automatically as you edit the form</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          OpenRTB 2.6 Specification |{' '}
          <a
            href="https://www.iab.com/wp-content/uploads/2016/03/OpenRTB-API-Specification-Version-2-6-final.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Spec
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
