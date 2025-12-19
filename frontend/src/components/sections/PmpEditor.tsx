import React from 'react';
import { TextField, NumberField, SelectField, ToggleField, ArrayField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { CURRENCIES, DEAL_AUCTION_TYPES } from '../../constants/openrtb-enums';
import type { ImpressionFormState } from '../../types/formState';
import './Sections.css';

interface PmpEditorProps {
  impression: ImpressionFormState;
}

export const PmpEditor: React.FC<PmpEditorProps> = ({ impression }) => {
  const { updatePmp, addDeal, removeDeal, updateDeal } = useBidRequestStore();

  return (
    <div className="pmp-editor">
      <div className="field-group">
        <h5 className="field-group-subtitle">Private Marketplace (PMP)</h5>
        <p className="field-help-text" style={{ marginBottom: '12px' }}>
          Configure private marketplace deals for programmatic guaranteed or preferred deals.
        </p>

        <div className="field-row toggles-row">
          <ToggleField
            label="Enable PMP"
            value={impression.pmp.enabled}
            onChange={(value) => updatePmp(impression.id, { enabled: value })}
          />
          {impression.pmp.enabled && (
            <ToggleField
              label="Private Auction"
              value={impression.pmp.private_auction}
              onChange={(value) => updatePmp(impression.id, { private_auction: value })}
            />
          )}
        </div>
        {impression.pmp.enabled && impression.pmp.private_auction && (
          <p className="info-note" style={{ marginTop: '8px', fontSize: '12px' }}>
            Private auction enabled: Only bids from specified deals will be accepted.
          </p>
        )}
      </div>

      {impression.pmp.enabled && (
        <div className="field-group">
          <div className="deals-header">
            <h5 className="field-group-subtitle">Deals</h5>
            <button
              type="button"
              className="add-button"
              onClick={() => addDeal(impression.id)}
            >
              + Add Deal
            </button>
          </div>

          {impression.pmp.deals.length === 0 ? (
            <p className="empty-state">No deals configured. Add a deal to enable programmatic guaranteed or preferred deal targeting.</p>
          ) : (
            <div className="deals-list">
              {impression.pmp.deals.map((deal, index) => (
                <div key={index} className="deal-item">
                  <div className="deal-header">
                    <span className="deal-number">Deal #{index + 1}</span>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeDeal(impression.id, index)}
                      title="Remove deal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="field-row">
                    <TextField
                      label="Deal ID"
                      value={deal.id}
                      onChange={(value) => updateDeal(impression.id, index, { id: value })}
                      placeholder="deal-12345"
                      required
                      helpText="Unique identifier for the deal (required)"
                    />
                    <SelectField
                      label="Auction Type"
                      value={deal.at}
                      options={DEAL_AUCTION_TYPES}
                      onChange={(value) => updateDeal(impression.id, index, { at: value as number })}
                    />
                  </div>

                  <div className="field-row">
                    <NumberField
                      label="Bid Floor"
                      value={deal.bidfloor}
                      onChange={(value) => updateDeal(impression.id, index, { bidfloor: value ?? 0 })}
                      min={0}
                      step={0.01}
                      helpText="Minimum bid CPM for this deal"
                    />
                    <SelectField
                      label="Currency"
                      value={deal.bidfloorcur}
                      options={CURRENCIES.map(c => ({ value: c.value, label: c.label }))}
                      onChange={(value) => updateDeal(impression.id, index, { bidfloorcur: value as string })}
                    />
                  </div>

                  <div className="field-row">
                    <ArrayField
                      label="Allowed Seats"
                      values={deal.wseat}
                      onChange={(values) => updateDeal(impression.id, index, { wseat: values })}
                      placeholder="Add buyer seat ID..."
                      helpText="Whitelist of buyer seats allowed in this deal"
                    />
                  </div>

                  <div className="field-row">
                    <ArrayField
                      label="Allowed Domains"
                      values={deal.wadomain}
                      onChange={(values) => updateDeal(impression.id, index, { wadomain: values })}
                      placeholder="Add advertiser domain..."
                      helpText="Whitelist of advertiser domains (e.g., ford.com)"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
