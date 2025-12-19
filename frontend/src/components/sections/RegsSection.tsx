import React from 'react';
import { TextField, ToggleField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import './Sections.css';

export const RegsSection: React.FC = () => {
  const { regs, updateRegs } = useBidRequestStore();

  return (
    <div className="section-form">
      <div className="field-group">
        <h4 className="field-group-title">Privacy Regulations</h4>
        <div className="field-row toggles-row">
          <ToggleField
            label="COPPA (Children's Privacy)"
            value={regs.coppa}
            onChange={(value) => updateRegs({ coppa: value })}
          />
          <ToggleField
            label="GDPR Applies"
            value={regs.gdpr}
            onChange={(value) => updateRegs({ gdpr: value })}
          />
        </div>
        <p className="field-help-text">
          COPPA: Set to true if the impression is subject to the Children's Online Privacy Protection Act.
          <br />
          GDPR: Set to true if the impression is subject to GDPR regulations.
        </p>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">US Privacy (CCPA)</h4>
        <TextField
          label="US Privacy String"
          value={regs.us_privacy}
          onChange={(value) => updateRegs({ us_privacy: value })}
          placeholder="1YNN"
          helpText="CCPA consent string (e.g., 1YNN, 1YYN, etc.)"
        />
        <div className="info-note">
          <p><strong>US Privacy String Format:</strong></p>
          <ul>
            <li>Position 1: Version (always '1')</li>
            <li>Position 2: Opt-Out Sale (Y=Yes opted out, N=No, -=Not applicable)</li>
            <li>Position 3: LSPA Covered Transaction (Y=Yes, N=No, -=Not applicable)</li>
            <li>Position 4: Limited Service Provider (Y=Yes, N=No, -=Not applicable)</li>
          </ul>
          <p>Example: "1YNN" = CCPA applies, user opted out of sale, not covered by LSPA</p>
        </div>
      </div>
    </div>
  );
};
