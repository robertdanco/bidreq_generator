import React from 'react';
import { CollapsibleSection } from './common';
import {
  SiteSection,
  AppSection,
  DeviceSection,
  GeoSection,
  UserSection,
  RegsSection,
  SourceSection,
  ImpressionSection,
  AuctionSection
} from './sections';
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

const SmartphoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
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

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
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
    inventoryType,
    setInventoryType,
    toggleSection,
    expandAllSections,
    collapseAllSections,
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

      {/* Expand/Collapse All and Inventory Type Toggle */}
      <div className="form-controls-row">
        <div className="expand-collapse-buttons">
          <button
            type="button"
            className="expand-collapse-button"
            onClick={expandAllSections}
            title="Expand all sections"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
            Expand All
          </button>
          <button
            type="button"
            className="expand-collapse-button"
            onClick={collapseAllSections}
            title="Collapse all sections"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 11 12 6 7 11" />
              <polyline points="17 18 12 13 7 18" />
            </svg>
            Collapse All
          </button>
        </div>
        <button
          type="button"
          className="reset-all-button reset-all-top"
          onClick={resetAll}
          title="Reset all form fields to defaults"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Reset All
        </button>
      </div>

      {/* Inventory Type Toggle */}
      <div className="inventory-type-toggle">
        <span className="toggle-label">Inventory Type:</span>
        <div className="toggle-buttons">
          <button
            type="button"
            className={inventoryType === 'site' ? 'active' : ''}
            onClick={() => setInventoryType('site')}
          >
            <GlobeIcon />
            Site
          </button>
          <button
            type="button"
            className={inventoryType === 'app' ? 'active' : ''}
            onClick={() => setInventoryType('app')}
          >
            <SmartphoneIcon />
            App
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bid-request-form">
        {/* Site or App section based on inventoryType */}
        {inventoryType === 'site' ? (
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
        ) : (
          <CollapsibleSection
            id="app"
            title="App & Publisher"
            icon={<SmartphoneIcon />}
            isExpanded={isExpanded('app')}
            onToggle={() => toggleSection('app')}
            onReset={() => resetSection('app')}
          >
            <AppSection />
          </CollapsibleSection>
        )}

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
          id="user"
          title="User"
          icon={<UserIcon />}
          isExpanded={isExpanded('user')}
          onToggle={() => toggleSection('user')}
          onReset={() => resetSection('user')}
        >
          <UserSection />
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
          id="regs"
          title="Regulations (Privacy)"
          icon={<ShieldIcon />}
          isExpanded={isExpanded('regs')}
          onToggle={() => toggleSection('regs')}
          onReset={() => resetSection('regs')}
        >
          <RegsSection />
        </CollapsibleSection>

        <CollapsibleSection
          id="source"
          title="Source & Supply Chain"
          icon={<LinkIcon />}
          isExpanded={isExpanded('source')}
          onToggle={() => toggleSection('source')}
          onReset={() => resetSection('source')}
        >
          <SourceSection />
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
