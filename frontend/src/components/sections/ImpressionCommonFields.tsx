import React from 'react';
import { NumberField, SelectField, MultiSelectField, ToggleField, TextField } from '../common';
import { CURRENCIES, BLOCKED_ATTRIBUTES } from '../../constants/openrtb-enums';
import type { ImpressionFormState } from '../../types/formState';
import './Sections.css';

interface ImpressionCommonFieldsProps {
  impression: ImpressionFormState;
  updateImpression: (id: string, updates: Partial<ImpressionFormState>) => void;
  battrValues: number[];
  onBattrChange: (values: number[]) => void;
  /** Optional: include Tag ID field (some editors place it elsewhere) */
  showTagId?: boolean;
  /** Placeholder text for Tag ID field */
  tagIdPlaceholder?: string;
}

/**
 * Shared impression-level fields used across all media type editors:
 * - Impression Settings (Tag ID, Secure toggle, Interstitial toggle)
 * - Bid Floor fields (bidfloor, bidfloorcur)
 * - Blocked Creative Attributes (battr multiselect)
 */
export const ImpressionCommonFields: React.FC<ImpressionCommonFieldsProps> = ({
  impression,
  updateImpression,
  battrValues,
  onBattrChange,
  showTagId = true,
  tagIdPlaceholder = 'ad-placement-1...',
}) => {
  return (
    <>
      <div className="field-group">
        <h5 className="field-group-subtitle">Impression Settings</h5>
        {showTagId && (
          <div className="field-row">
            <TextField
              label="Tag ID"
              value={impression.tagid}
              onChange={(value) => updateImpression(impression.id, { tagid: value })}
              placeholder={tagIdPlaceholder}
              helpText="Identifier for the ad placement"
            />
          </div>
        )}
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
        <h5 className="field-group-subtitle">Blocked Creative Attributes</h5>
        <MultiSelectField
          label="Block these creative attributes"
          values={battrValues}
          options={BLOCKED_ATTRIBUTES}
          onChange={(values) => onBattrChange(values as number[])}
          columns={2}
          helpText="Creative attributes that should be blocked"
        />
      </div>
    </>
  );
};
