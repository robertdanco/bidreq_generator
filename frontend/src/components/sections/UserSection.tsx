import React from 'react';
import { TextField, SelectField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { EID_SOURCES, EID_AGENT_TYPES } from '../../constants/openrtb-enums';
import './Sections.css';

export const UserSection: React.FC = () => {
  const {
    user,
    updateUser,
    addUserEid,
    removeUserEid,
    updateUserEid,
    addUserEidUid,
    removeUserEidUid,
    addUserData,
    removeUserData,
    updateUserData,
    addUserDataSegment,
    removeUserDataSegment,
  } = useBidRequestStore();

  const handleAddEid = () => {
    addUserEid({
      source: 'liveramp.com',
      uids: [{ id: '', atype: 1 }],
    });
  };

  const handleAddData = () => {
    addUserData({
      id: '',
      name: '',
      segment: [{ id: '', name: '', value: '' }],
    });
  };

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

      {/* Extended Identifiers (EIDs) Section */}
      <div className="field-group">
        <div className="deals-header">
          <h4 className="field-group-title" style={{ margin: 0, border: 'none', paddingBottom: 0 }}>
            Extended Identifiers (EIDs)
          </h4>
          <button
            type="button"
            className="add-button"
            onClick={handleAddEid}
          >
            + Add EID
          </button>
        </div>
        <p className="field-help-text" style={{ marginBottom: '12px' }}>
          Third-party identity providers like LiveRamp, UID2, ID5, etc.
        </p>

        {user.eids.length === 0 ? (
          <p className="empty-state">
            No extended identifiers configured. Add an EID to include third-party identity signals.
          </p>
        ) : (
          <div className="eid-list">
            {user.eids.map((eid, eidIndex) => (
              <div key={eidIndex} className="eid-item">
                <div className="eid-header">
                  <span className="eid-number">EID #{eidIndex + 1}</span>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeUserEid(eidIndex)}
                    title="Remove EID"
                  >
                    &times;
                  </button>
                </div>

                <div className="field-row">
                  <SelectField
                    label="Source"
                    value={eid.source}
                    options={[
                      ...EID_SOURCES.map(s => ({ value: s.value, label: s.label })),
                      { value: 'custom', label: 'Custom...' },
                    ]}
                    onChange={(value) => {
                      if (value === 'custom') {
                        updateUserEid(eidIndex, { source: '' });
                      } else {
                        updateUserEid(eidIndex, { source: value as string });
                      }
                    }}
                  />
                  {!EID_SOURCES.some(s => s.value === eid.source) && (
                    <TextField
                      label="Custom Source"
                      value={eid.source}
                      onChange={(value) => updateUserEid(eidIndex, { source: value })}
                      placeholder="custom-provider.com"
                      helpText="Enter custom EID source domain"
                    />
                  )}
                </div>

                <div className="uid-list">
                  <h5 className="field-group-subtitle">User IDs</h5>
                  {eid.uids.map((uid, uidIndex) => (
                    <div key={uidIndex} className="uid-item">
                      <TextField
                        label="ID"
                        value={uid.id}
                        onChange={(value) => {
                          const newUids = [...eid.uids];
                          newUids[uidIndex] = { ...newUids[uidIndex], id: value };
                          updateUserEid(eidIndex, { uids: newUids });
                        }}
                        placeholder="User identifier value"
                      />
                      <SelectField
                        label="Agent Type"
                        value={uid.atype}
                        options={EID_AGENT_TYPES}
                        onChange={(value) => {
                          const newUids = [...eid.uids];
                          newUids[uidIndex] = { ...newUids[uidIndex], atype: value as number };
                          updateUserEid(eidIndex, { uids: newUids });
                        }}
                      />
                      {eid.uids.length > 1 && (
                        <button
                          type="button"
                          className="uid-remove"
                          onClick={() => removeUserEidUid(eidIndex, uidIndex)}
                          title="Remove UID"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-button add-uid-button"
                    onClick={() => addUserEidUid(eidIndex, { id: '', atype: 1 })}
                  >
                    + Add UID
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Data Segments Section */}
      <div className="field-group">
        <div className="deals-header">
          <h4 className="field-group-title" style={{ margin: 0, border: 'none', paddingBottom: 0 }}>
            Data Segments
          </h4>
          <button
            type="button"
            className="add-button"
            onClick={handleAddData}
          >
            + Add Data Provider
          </button>
        </div>
        <p className="field-help-text" style={{ marginBottom: '12px' }}>
          User segments from data providers for audience targeting.
        </p>

        {user.data.length === 0 ? (
          <p className="empty-state">
            No data segments configured. Add a data provider to include audience segments.
          </p>
        ) : (
          <div className="data-list">
            {user.data.map((data, dataIndex) => (
              <div key={dataIndex} className="data-item">
                <div className="data-header">
                  <span className="data-number">Data Provider #{dataIndex + 1}</span>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeUserData(dataIndex)}
                    title="Remove data provider"
                  >
                    &times;
                  </button>
                </div>

                <div className="field-row">
                  <TextField
                    label="Provider ID"
                    value={data.id}
                    onChange={(value) => updateUserData(dataIndex, { id: value })}
                    placeholder="Data provider ID"
                    helpText="Exchange-specific data provider ID"
                  />
                  <TextField
                    label="Provider Name"
                    value={data.name}
                    onChange={(value) => updateUserData(dataIndex, { name: value })}
                    placeholder="Oracle Data Cloud"
                    helpText="Data provider name"
                  />
                </div>

                <div className="segment-list">
                  <h5 className="field-group-subtitle">Segments</h5>
                  {data.segment.map((seg, segIndex) => (
                    <div key={segIndex} className="segment-item">
                      <TextField
                        label="Segment ID"
                        value={seg.id}
                        onChange={(value) => {
                          const newSegments = [...data.segment];
                          newSegments[segIndex] = { ...newSegments[segIndex], id: value };
                          updateUserData(dataIndex, { segment: newSegments });
                        }}
                        placeholder="12345"
                      />
                      <TextField
                        label="Name"
                        value={seg.name}
                        onChange={(value) => {
                          const newSegments = [...data.segment];
                          newSegments[segIndex] = { ...newSegments[segIndex], name: value };
                          updateUserData(dataIndex, { segment: newSegments });
                        }}
                        placeholder="Auto Intenders"
                      />
                      <TextField
                        label="Value"
                        value={seg.value}
                        onChange={(value) => {
                          const newSegments = [...data.segment];
                          newSegments[segIndex] = { ...newSegments[segIndex], value: value };
                          updateUserData(dataIndex, { segment: newSegments });
                        }}
                        placeholder="high"
                      />
                      {data.segment.length > 1 && (
                        <button
                          type="button"
                          className="segment-remove"
                          onClick={() => removeUserDataSegment(dataIndex, segIndex)}
                          title="Remove segment"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-button add-segment-button"
                    onClick={() => addUserDataSegment(dataIndex, { id: '', name: '', value: '' })}
                  >
                    + Add Segment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
