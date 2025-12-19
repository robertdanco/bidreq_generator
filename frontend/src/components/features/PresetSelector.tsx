import React, { useState } from 'react';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { PRESETS } from '../../constants/presets';
import './Features.css';

export const PresetSelector: React.FC = () => {
  const { loadPreset, ui } = useBidRequestStore();
  const [isOpen, setIsOpen] = useState(false);

  const categories = ['desktop', 'mobile', 'tablet', 'ctv'] as const;
  const categoryLabels = {
    desktop: 'Desktop',
    mobile: 'Mobile',
    tablet: 'Tablet',
    ctv: 'Connected TV',
  };

  const handleSelectPreset = (presetId: string) => {
    loadPreset(presetId);
    setIsOpen(false);
  };

  const activePreset = PRESETS.find((p) => p.id === ui.activePreset);

  return (
    <div className="preset-selector">
      <button
        type="button"
        className="preset-selector-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="preset-selector-icon">📋</span>
        <span className="preset-selector-text">
          {activePreset ? activePreset.name : 'Load Preset'}
        </span>
        <span className={`preset-selector-chevron ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="preset-selector-backdrop" onClick={() => setIsOpen(false)} />
          <div className="preset-selector-dropdown">
            <div className="preset-dropdown-header">
              <h4>Quick Start Presets</h4>
              <p>Load a pre-configured bid request template</p>
            </div>
            {categories.map((category) => {
              const categoryPresets = PRESETS.filter((p) => p.category === category);
              if (categoryPresets.length === 0) return null;
              return (
                <div key={category} className="preset-category-group">
                  <h5 className="preset-category-title">{categoryLabels[category]}</h5>
                  <div className="preset-category-list">
                    {categoryPresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        className={`preset-option ${
                          ui.activePreset === preset.id ? 'active' : ''
                        }`}
                        onClick={() => handleSelectPreset(preset.id)}
                      >
                        <span className="preset-option-icon">{preset.icon}</span>
                        <div className="preset-option-content">
                          <span className="preset-option-name">{preset.name}</span>
                          <span className="preset-option-description">
                            {preset.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
