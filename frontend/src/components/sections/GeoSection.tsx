import React from 'react';
import { TextField, NumberField, SelectField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { GEO_TYPES } from '../../constants/openrtb-enums';
import { LOCATION_PRESETS, getLocationById } from '../../constants/locations';
import './Sections.css';

export const GeoSection: React.FC = () => {
  const { geo, updateGeo } = useBidRequestStore();

  const handlePresetChange = (locationId: string) => {
    const location = getLocationById(locationId);
    if (location) {
      updateGeo({
        country: location.country,
        region: location.region,
        city: location.city,
        zip: location.zip,
        metro: location.metro,
        lat: location.lat,
        lon: location.lon,
        utcoffset: location.utcoffset,
      });
    }
  };

  const locationOptions = LOCATION_PRESETS.map((loc) => ({
    value: loc.id,
    label: loc.name,
  }));

  // Find current matching preset
  const currentPreset = LOCATION_PRESETS.find(
    (loc) => loc.city === geo.city && loc.country === geo.country
  );

  return (
    <div className="section-form">
      <div className="field-group">
        <h4 className="field-group-title">Quick Presets</h4>
        <div className="preset-buttons">
          {LOCATION_PRESETS.slice(0, 8).map((loc) => (
            <button
              key={loc.id}
              type="button"
              className={`preset-button ${
                geo.city === loc.city && geo.country === loc.country ? 'active' : ''
              }`}
              onClick={() => handlePresetChange(loc.id)}
            >
              <span className="preset-category">{loc.country}</span>
              <span className="preset-name">{loc.city}</span>
            </button>
          ))}
        </div>
        <SelectField
          label="Load from Preset"
          value={currentPreset?.id || ''}
          options={locationOptions}
          onChange={(value) => handlePresetChange(value as string)}
          placeholder="Select a location..."
          allowEmpty
        />
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Location Details</h4>
        <div className="field-row">
          <TextField
            label="Country"
            value={geo.country}
            onChange={(value) => updateGeo({ country: value })}
            placeholder="USA, GBR, DEU..."
            helpText="ISO-3166-1 Alpha-3"
          />
          <TextField
            label="Region"
            value={geo.region}
            onChange={(value) => updateGeo({ region: value })}
            placeholder="CA, NY, TX..."
            helpText="State/province code"
          />
        </div>
        <div className="field-row">
          <TextField
            label="City"
            value={geo.city}
            onChange={(value) => updateGeo({ city: value })}
            placeholder="San Francisco"
          />
          <TextField
            label="ZIP/Postal Code"
            value={geo.zip}
            onChange={(value) => updateGeo({ zip: value })}
            placeholder="94102"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Metro Code"
            value={geo.metro}
            onChange={(value) => updateGeo({ metro: value })}
            placeholder="807"
            helpText="Nielsen DMA code (US only)"
          />
          <SelectField
            label="Location Type"
            value={geo.type}
            options={GEO_TYPES}
            onChange={(value) => updateGeo({ type: value as number })}
            helpText="How location was determined"
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Coordinates</h4>
        <div className="field-row">
          <NumberField
            label="Latitude"
            value={geo.lat}
            onChange={(value) => updateGeo({ lat: value })}
            min={-90}
            max={90}
            step={0.0001}
            placeholder="37.7749"
          />
          <NumberField
            label="Longitude"
            value={geo.lon}
            onChange={(value) => updateGeo({ lon: value })}
            min={-180}
            max={180}
            step={0.0001}
            placeholder="-122.4194"
          />
        </div>
        <div className="field-row">
          <NumberField
            label="Accuracy"
            value={geo.accuracy}
            onChange={(value) => updateGeo({ accuracy: value })}
            min={0}
            suffix="m"
            helpText="Estimated location accuracy in meters"
          />
          <NumberField
            label="UTC Offset"
            value={geo.utcoffset}
            onChange={(value) => updateGeo({ utcoffset: value ?? 0 })}
            min={-720}
            max={840}
            step={60}
            helpText="Offset from UTC in minutes (e.g., -480 for PST)"
          />
        </div>
      </div>

      <div className="field-group">
        <div className="coordinates-preview">
          {geo.lat !== null && geo.lon !== null && (
            <a
              href={`https://www.google.com/maps?q=${geo.lat},${geo.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              View on Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
