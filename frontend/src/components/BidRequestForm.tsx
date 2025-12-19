import React from 'react';
import { CollapsibleSection } from './common';
import { SiteSection, DeviceSection, GeoSection, ImpressionSection, AuctionSection } from './sections';
import { PresetSelector } from './features';
import { useBidRequestStore } from '../stores/useBidRequestStore';

// SVG Icons as components for cleaner JSX
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

interface BidRequestFormProps {
  onSave: () => void;
}

const BidRequestForm: React.FC<BidRequestFormProps> = ({ onSave }) => {
  const {
    ui,
    impressions,
    toggleSection,
    resetSection,
    resetAll,
  } = useBidRequestStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  const isExpanded = (sectionId: string) => ui.expandedSections.includes(sectionId);

  return (
    <div className="form-container">
      <PresetSelector />

      <form onSubmit={handleSubmit} className="bid-request-form">
        <CollapsibleSection
          id="site"
          title="Site & Publisher"
          icon={<GlobeIcon />}
          isExpanded={isExpanded('site')}
          onToggle={() => toggleSection('site')}
          onReset={() => resetSection('site')}
        >
          <SiteSection />
        </CollapsibleSection>

        <CollapsibleSection
          id="device"
          title="Device"
          icon={<MonitorIcon />}
          isExpanded={isExpanded('device')}
          onToggle={() => toggleSection('device')}
          onReset={() => resetSection('device')}
        >
          <DeviceSection />
        </CollapsibleSection>

        <CollapsibleSection
          id="geo"
          title="Geographic Location"
          icon={<MapPinIcon />}
          isExpanded={isExpanded('geo')}
          onToggle={() => toggleSection('geo')}
          onReset={() => resetSection('geo')}
        >
          <GeoSection />
        </CollapsibleSection>

        <CollapsibleSection
          id="impressions"
          title="Impressions"
          icon={<LayersIcon />}
          isExpanded={isExpanded('impressions')}
          onToggle={() => toggleSection('impressions')}
          onReset={() => resetSection('impressions')}
          badge={impressions.length}
        >
          <ImpressionSection />
        </CollapsibleSection>

        <CollapsibleSection
          id="auction"
          title="Auction Settings"
          icon={<SettingsIcon />}
          isExpanded={isExpanded('auction')}
          onToggle={() => toggleSection('auction')}
          onReset={() => resetSection('auction')}
        >
          <AuctionSection />
        </CollapsibleSection>

        <div className="form-actions">
          <button
            type="button"
            className="reset-all-button"
            onClick={resetAll}
          >
            Reset All
          </button>
          <button type="submit" className="save-button">
            Save Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default BidRequestForm;
