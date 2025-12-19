import React from 'react';
import { TextField, NumberField, SelectField, ToggleField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { DEVICE_TYPES, CONNECTION_TYPES, LANGUAGES } from '../../constants/openrtb-enums';
import { USER_AGENT_PRESETS, getUserAgentById } from '../../constants/userAgents';
import './Sections.css';

export const DeviceSection: React.FC = () => {
  const { device, updateDevice } = useBidRequestStore();

  const handlePresetChange = (presetId: string) => {
    const preset = getUserAgentById(presetId);
    if (preset) {
      updateDevice({
        ua: preset.ua,
        devicetype: preset.device.devicetype,
        make: preset.device.make,
        model: preset.device.model,
        os: preset.device.os,
        osv: preset.device.osv,
        w: preset.device.w,
        h: preset.device.h,
        pxratio: preset.device.pxratio,
      });
    }
  };

  const generateRandomIP = () => {
    // Generate realistic-looking public IP
    const ranges = [
      [1, 126],    // Class A
      [128, 191],  // Class B
      [192, 223],  // Class C
    ];
    const range = ranges[Math.floor(Math.random() * ranges.length)];
    const first = range[0] + Math.floor(Math.random() * (range[1] - range[0]));
    const rest = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256));
    updateDevice({ ip: [first, ...rest].join('.') });
  };

  const presetOptions = USER_AGENT_PRESETS.map((p) => ({
    value: p.id,
    label: `${p.name}`,
  }));

  return (
    <div className="section-form">
      <div className="field-group">
        <h4 className="field-group-title">Quick Presets</h4>
        <div className="preset-buttons">
          {USER_AGENT_PRESETS.slice(0, 8).map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`preset-button ${device.ua === preset.ua ? 'active' : ''}`}
              onClick={() => handlePresetChange(preset.id)}
            >
              <span className="preset-category">{preset.category}</span>
              <span className="preset-name">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">User Agent</h4>
        <TextField
          label="User Agent String"
          value={device.ua}
          onChange={(value) => updateDevice({ ua: value })}
          placeholder="Mozilla/5.0..."
        />
        <SelectField
          label="Load from Preset"
          value=""
          options={presetOptions}
          onChange={(value) => handlePresetChange(value as string)}
          placeholder="Select a preset..."
          allowEmpty
        />
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Device Info</h4>
        <div className="field-row">
          <SelectField
            label="Device Type"
            value={device.devicetype}
            options={DEVICE_TYPES}
            onChange={(value) => updateDevice({ devicetype: value as number })}
          />
          <TextField
            label="Make"
            value={device.make}
            onChange={(value) => updateDevice({ make: value })}
            placeholder="Apple, Samsung, Google..."
          />
        </div>
        <div className="field-row">
          <TextField
            label="Model"
            value={device.model}
            onChange={(value) => updateDevice({ model: value })}
            placeholder="iPhone, Pixel, Galaxy..."
          />
          <TextField
            label="Hardware Version"
            value={device.hwv}
            onChange={(value) => updateDevice({ hwv: value })}
            placeholder="e.g., 15,2"
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Operating System</h4>
        <div className="field-row">
          <TextField
            label="OS"
            value={device.os}
            onChange={(value) => updateDevice({ os: value })}
            placeholder="iOS, Android, Windows, macOS..."
          />
          <TextField
            label="OS Version"
            value={device.osv}
            onChange={(value) => updateDevice({ osv: value })}
            placeholder="17.0, 14, 10..."
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Network</h4>
        <div className="field-row">
          <div className="ip-field-wrapper">
            <TextField
              label="IP Address"
              value={device.ip}
              onChange={(value) => updateDevice({ ip: value })}
              placeholder="192.0.2.1"
            />
            <button
              type="button"
              className="generate-ip-button"
              onClick={generateRandomIP}
              title="Generate random IP"
            >
              Generate
            </button>
          </div>
          <TextField
            label="IPv6 Address"
            value={device.ipv6}
            onChange={(value) => updateDevice({ ipv6: value })}
            placeholder="2001:db8::1"
          />
        </div>
        <div className="field-row">
          <SelectField
            label="Connection Type"
            value={device.connectiontype}
            options={CONNECTION_TYPES}
            onChange={(value) => updateDevice({ connectiontype: value as number })}
          />
          <TextField
            label="Carrier"
            value={device.carrier}
            onChange={(value) => updateDevice({ carrier: value })}
            placeholder="AT&T, Verizon, T-Mobile..."
          />
        </div>
        <div className="field-row">
          <TextField
            label="MCC-MNC"
            value={device.mccmnc}
            onChange={(value) => updateDevice({ mccmnc: value })}
            placeholder="310-410"
            helpText="Mobile Country Code - Mobile Network Code"
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Screen</h4>
        <div className="field-row">
          <NumberField
            label="Width"
            value={device.w}
            onChange={(value) => updateDevice({ w: value ?? 0 })}
            min={1}
            suffix="px"
          />
          <NumberField
            label="Height"
            value={device.h}
            onChange={(value) => updateDevice({ h: value ?? 0 })}
            min={1}
            suffix="px"
          />
        </div>
        <div className="field-row">
          <NumberField
            label="PPI"
            value={device.ppi}
            onChange={(value) => updateDevice({ ppi: value ?? 0 })}
            min={1}
            helpText="Pixels per inch"
          />
          <NumberField
            label="Pixel Ratio"
            value={device.pxratio}
            onChange={(value) => updateDevice({ pxratio: value ?? 1 })}
            min={0.5}
            max={4}
            step={0.5}
            helpText="Device pixel ratio"
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Settings</h4>
        <div className="field-row">
          <SelectField
            label="Language"
            value={device.language}
            options={LANGUAGES}
            onChange={(value) => updateDevice({ language: value as string })}
          />
          <TextField
            label="IFA"
            value={device.ifa}
            onChange={(value) => updateDevice({ ifa: value })}
            placeholder="Advertising ID"
            helpText="ID for advertisers (IDFA/GAID)"
          />
        </div>
        <div className="field-row toggles-row">
          <ToggleField
            label="JavaScript Enabled"
            value={device.js}
            onChange={(value) => updateDevice({ js: value })}
          />
          <ToggleField
            label="Do Not Track"
            value={device.dnt}
            onChange={(value) => updateDevice({ dnt: value })}
            helpText="DNT header set"
          />
          <ToggleField
            label="Limit Ad Tracking"
            value={device.lmt}
            onChange={(value) => updateDevice({ lmt: value })}
            helpText="LAT enabled on device"
          />
        </div>
      </div>
    </div>
  );
};
