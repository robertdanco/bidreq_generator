import React from 'react';
import { NumberField, SelectField, MultiSelectField, ToggleField, TextField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import {
  IAB_BANNER_SIZES_GROUPED,
  AD_POSITIONS,
  API_FRAMEWORKS,
  BANNER_MIMES,
  CURRENCIES,
  BLOCKED_ATTRIBUTES,
} from '../../constants/openrtb-enums';
import type { ImpressionFormState } from '../../types/formState';
import './Sections.css';

interface BannerEditorProps {
  impression: ImpressionFormState;
  index: number;
  canRemove: boolean;
}

export const BannerEditor: React.FC<BannerEditorProps> = ({
  impression,
  index,
  canRemove,
}) => {
  const { updateImpression, updateBanner, removeImpression, addFormat, removeFormat } =
    useBidRequestStore();

  const handleSizePreset = (w: number, h: number) => {
    updateBanner(impression.id, { w, h });
    // Also update format array if it only has one entry
    if (impression.banner.format.length <= 1) {
      updateBanner(impression.id, { format: [{ w, h }] });
    }
  };

  const handleAddFormat = () => {
    addFormat(impression.id, { w: 300, h: 250 });
  };

  return (
    <div className="banner-editor">
      <div className="banner-header">
        <h4 className="banner-title">
          Impression #{index + 1}
          <span className="banner-id">ID: {impression.id}</span>
        </h4>
        {canRemove && (
          <button
            type="button"
            className="remove-impression-button"
            onClick={() => removeImpression(impression.id)}
          >
            Remove
          </button>
        )}
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Banner Size</h5>
        <div className="size-matrix">
          {Object.entries(IAB_BANNER_SIZES_GROUPED).map(([key, group]) => (
            <div key={key} className="size-category">
              <span className="size-category-label">{group.label}</span>
              <div className="size-chips">
                {group.sizes.map((size) => (
                  <button
                    key={`${size.w}x${size.h}`}
                    type="button"
                    className={`size-chip ${
                      impression.banner.w === size.w && impression.banner.h === size.h
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => handleSizePreset(size.w, size.h)}
                    title={size.name}
                  >
                    <span className="size-chip-dims">{size.w}×{size.h}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="field-row">
          <NumberField
            label="Width"
            value={impression.banner.w}
            onChange={(value) => updateBanner(impression.id, { w: value ?? 0 })}
            min={1}
            suffix="px"
            recommended
            helpText="Banner width (recommended)"
          />
          <NumberField
            label="Height"
            value={impression.banner.h}
            onChange={(value) => updateBanner(impression.id, { h: value ?? 0 })}
            min={1}
            suffix="px"
            recommended
            helpText="Banner height (recommended)"
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Additional Formats</h5>
        <div className="formats-list">
          {impression.banner.format.map((fmt, idx) => (
            <div key={idx} className="format-item">
              <span className="format-dims">
                {fmt.w}x{fmt.h}
              </span>
              {impression.banner.format.length > 1 && (
                <button
                  type="button"
                  className="format-remove"
                  onClick={() => removeFormat(impression.id, idx)}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-format-button"
            onClick={handleAddFormat}
          >
            + Add Format
          </button>
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Position & Type</h5>
        <div className="field-row">
          <SelectField
            label="Position"
            value={impression.banner.pos}
            options={AD_POSITIONS}
            onChange={(value) => updateBanner(impression.id, { pos: value as number })}
          />
          <TextField
            label="Tag ID"
            value={impression.tagid}
            onChange={(value) => updateImpression(impression.id, { tagid: value })}
            placeholder="header-ad, sidebar-1..."
            helpText="Identifier for the ad placement"
          />
        </div>
        <div className="field-row toggles-row">
          <ToggleField
            label="Secure (HTTPS)"
            value={impression.secure}
            onChange={(value) => updateImpression(impression.id, { secure: value })}
          />
          <ToggleField
            label="Interstitial"
            value={impression.instl}
            onChange={(value) => updateImpression(impression.id, { instl: value })}
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Bid Floor</h5>
        <div className="field-row">
          <NumberField
            label="Bid Floor"
            value={impression.bidfloor}
            onChange={(value) =>
              updateImpression(impression.id, { bidfloor: value ?? 0 })
            }
            min={0}
            step={0.01}
            helpText="Minimum CPM bid"
          />
          <SelectField
            label="Currency"
            value={impression.bidfloorcur}
            options={CURRENCIES}
            onChange={(value) =>
              updateImpression(impression.id, { bidfloorcur: value as string })
            }
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">API Frameworks</h5>
        <MultiSelectField
          label="Supported API Frameworks"
          values={impression.banner.api}
          options={API_FRAMEWORKS}
          onChange={(values) =>
            updateBanner(impression.id, { api: values as number[] })
          }
          columns={2}
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">MIME Types</h5>
        <MultiSelectField
          label="Supported MIME Types"
          values={impression.banner.mimes}
          options={BANNER_MIMES}
          onChange={(values) =>
            updateBanner(impression.id, { mimes: values as string[] })
          }
          columns={3}
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Blocked Creative Attributes</h5>
        <MultiSelectField
          label="Block these creative attributes"
          values={impression.banner.battr}
          options={BLOCKED_ATTRIBUTES}
          onChange={(values) =>
            updateBanner(impression.id, { battr: values as number[] })
          }
          columns={2}
          helpText="Creative attributes that should be blocked"
        />
      </div>
    </div>
  );
};
