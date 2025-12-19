import React from 'react';
import { NumberField, SelectField, MultiSelectField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { ImpressionHeader } from './ImpressionHeader';
import { ImpressionCommonFields } from './ImpressionCommonFields';
import { PmpEditor } from './PmpEditor';
import {
  IAB_BANNER_SIZES_GROUPED,
  AD_POSITIONS,
  API_FRAMEWORKS,
  BANNER_MIMES,
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
      <ImpressionHeader
        index={index}
        impressionId={impression.id}
        canRemove={canRemove}
        onRemove={() => removeImpression(impression.id)}
      />

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
        <h5 className="field-group-subtitle">Position</h5>
        <div className="field-row">
          <SelectField
            label="Position"
            value={impression.banner.pos}
            options={AD_POSITIONS}
            onChange={(value) => updateBanner(impression.id, { pos: value as number })}
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

      <ImpressionCommonFields
        impression={impression}
        updateImpression={updateImpression}
        battrValues={impression.banner.battr}
        onBattrChange={(values) => updateBanner(impression.id, { battr: values })}
        tagIdPlaceholder="header-ad, sidebar-1..."
      />

      <PmpEditor impression={impression} />
    </div>
  );
};
