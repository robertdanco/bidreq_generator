import React, { useMemo } from 'react';
import { NumberField, SelectField, ToggleField, ArrayField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { AUCTION_TYPES, CURRENCIES } from '../../constants/openrtb-enums';
import { getIabCategorySuggestions, getIabCategoryDisplay } from '../../constants/iab-categories';
import './Sections.css';

export const AuctionSection: React.FC = () => {
  const { auction, updateAuction } = useBidRequestStore();

  // Memoize IAB category suggestions to avoid recomputing on each render
  const iabSuggestions = useMemo(() => getIabCategorySuggestions(), []);

  const handleCurrencyChange = (values: string[]) => {
    updateAuction({ cur: values });
  };

  return (
    <div className="section-form">
      <div className="field-group">
        <h4 className="field-group-title">Auction Settings</h4>
        <div className="field-row">
          <SelectField
            label="Auction Type"
            value={auction.at}
            options={AUCTION_TYPES}
            onChange={(value) => updateAuction({ at: value as number })}
            helpText="First price: winner pays their bid. Second price: winner pays second-highest bid + $0.01"
          />
          <NumberField
            label="Timeout (tmax)"
            value={auction.tmax}
            onChange={(value) => updateAuction({ tmax: value ?? 200 })}
            min={1}
            max={5000}
            suffix="ms"
            helpText="Maximum time for bid response"
          />
        </div>
        <div className="field-row toggles-row">
          <ToggleField
            label="Test Mode"
            value={auction.test}
            onChange={(value) => updateAuction({ test: value })}
            helpText="Mark as test request (bids will not be charged)"
          />
          <ToggleField
            label="All Impressions"
            value={auction.allimps}
            onChange={(value) => updateAuction({ allimps: value })}
            helpText="Hint that impressions offered represent all available on page"
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Currencies</h4>
        <div className="currency-chips">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.value}
              type="button"
              className={`currency-chip ${
                auction.cur.includes(curr.value) ? 'active' : ''
              }`}
              onClick={() => {
                if (auction.cur.includes(curr.value)) {
                  handleCurrencyChange(auction.cur.filter((c) => c !== curr.value));
                } else {
                  handleCurrencyChange([...auction.cur, curr.value]);
                }
              }}
            >
              {curr.value}
            </button>
          ))}
        </div>
        <span className="field-help">
          Selected: {auction.cur.join(', ') || 'None (defaults to USD)'}
        </span>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Block Lists</h4>
        <ArrayField
          label="Blocked Categories (bcat)"
          values={auction.bcat}
          onChange={(values) => updateAuction({ bcat: values })}
          placeholder="Search categories to block..."
          helpText="IAB categories to block"
          searchableData={iabSuggestions}
          displayFormatter={getIabCategoryDisplay}
        />
        <ArrayField
          label="Blocked Advertisers (badv)"
          values={auction.badv}
          onChange={(values) => updateAuction({ badv: values })}
          placeholder="e.g., competitor.com"
          helpText="Advertiser domains to block"
        />
        <ArrayField
          label="Blocked Apps (bapp)"
          values={auction.bapp}
          onChange={(values) => updateAuction({ bapp: values })}
          placeholder="e.g., com.example.app"
          helpText="App bundle IDs to block"
        />
      </div>
    </div>
  );
};
