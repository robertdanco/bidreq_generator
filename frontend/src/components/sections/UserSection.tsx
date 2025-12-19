import React from 'react';
import { TextField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import './Sections.css';

export const UserSection: React.FC = () => {
  const { user, updateUser } = useBidRequestStore();

  return (
    <div className="section-form">
      <div className="field-group">
        <h4 className="field-group-title">User Identification</h4>
        <div className="field-row">
          <TextField
            label="User ID"
            value={user.id}
            onChange={(value) => updateUser({ id: value })}
            placeholder="Exchange-specific user ID"
            helpText="Exchange-specific user ID"
          />
          <TextField
            label="Buyer UID"
            value={user.buyeruid}
            onChange={(value) => updateUser({ buyeruid: value })}
            placeholder="Buyer-specific user ID"
            helpText="Buyer-specific user ID from their cookie"
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">User Data</h4>
        <div className="field-row">
          <TextField
            label="Keywords"
            value={user.keywords}
            onChange={(value) => updateUser({ keywords: value })}
            placeholder="sports, tech, news..."
            helpText="Comma-separated list of keywords about the user"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Custom Data"
            value={user.customdata}
            onChange={(value) => updateUser({ customdata: value })}
            placeholder="Custom user data..."
            helpText="Optional feature to pass bidder data set in the exchange's cookie"
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Consent</h4>
        <div className="field-row">
          <TextField
            label="Consent String"
            value={user.consent}
            onChange={(value) => updateUser({ consent: value })}
            placeholder="TCF consent string or USP string..."
            helpText="GDPR consent string or CCPA consent indicator"
          />
        </div>
      </div>

      <div className="field-group info-note">
        <p>
          <strong>Note:</strong> Extended User IDs (EIDs) and User Data/Segments
          can be configured in future updates. These allow for:
        </p>
        <ul>
          <li>Third-party identity providers (LiveRamp, UID2, etc.)</li>
          <li>Data provider segments for audience targeting</li>
        </ul>
      </div>
    </div>
  );
};
