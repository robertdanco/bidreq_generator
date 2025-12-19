import React from 'react';
import { NumberField, SelectField, MultiSelectField, ToggleField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { ImpressionHeader } from './ImpressionHeader';
import { ImpressionCommonFields } from './ImpressionCommonFields';
import { PmpEditor } from './PmpEditor';
import {
  VIDEO_SIZES,
  AD_POSITIONS,
  API_FRAMEWORKS,
  VIDEO_MIMES,
  VIDEO_PROTOCOLS,
  VIDEO_PLCMT_TYPES,
  VIDEO_LINEARITY,
  VIDEO_START_DELAY,
  VIDEO_PLAYBACK_METHODS,
  VIDEO_DELIVERY,
  VIDEO_PLAYBACK_END,
} from '../../constants/openrtb-enums';
import type { ImpressionFormState } from '../../types/formState';
import './Sections.css';

interface VideoEditorProps {
  impression: ImpressionFormState;
  index: number;
  canRemove: boolean;
}

export const VideoEditor: React.FC<VideoEditorProps> = ({
  impression,
  index,
  canRemove,
}) => {
  const { updateImpression, updateVideo, removeImpression } = useBidRequestStore();

  const handleSizePreset = (w: number, h: number) => {
    updateVideo(impression.id, { w, h });
  };

  return (
    <div className="video-editor">
      <ImpressionHeader
        index={index}
        impressionId={impression.id}
        canRemove={canRemove}
        onRemove={() => removeImpression(impression.id)}
      />

      <div className="field-group">
        <h5 className="field-group-subtitle">Video Size</h5>
        <div className="size-presets">
          {VIDEO_SIZES.map((size) => (
            <button
              key={`${size.w}x${size.h}`}
              type="button"
              className={`size-preset-button ${
                impression.video.w === size.w && impression.video.h === size.h
                  ? 'active'
                  : ''
              }`}
              onClick={() => handleSizePreset(size.w, size.h)}
            >
              <span className="size-preset-name">{size.name}</span>
              <span className="size-preset-dims">
                {size.w}x{size.h}
              </span>
            </button>
          ))}
        </div>
        <div className="field-row">
          <NumberField
            label="Width"
            value={impression.video.w}
            onChange={(value) => updateVideo(impression.id, { w: value ?? 0 })}
            min={1}
            suffix="px"
            required
          />
          <NumberField
            label="Height"
            value={impression.video.h}
            onChange={(value) => updateVideo(impression.id, { h: value ?? 0 })}
            min={1}
            suffix="px"
            required
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">
          MIME Types <span style={{ color: 'red' }}>*</span>
        </h5>
        <MultiSelectField
          label="Supported MIME Types (REQUIRED)"
          values={impression.video.mimes}
          options={VIDEO_MIMES}
          onChange={(values) =>
            updateVideo(impression.id, { mimes: values as string[] })
          }
          columns={3}
          helpText="At least one MIME type must be specified"
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Duration</h5>
        <div className="field-row">
          <NumberField
            label="Min Duration"
            value={impression.video.minduration}
            onChange={(value) =>
              updateVideo(impression.id, { minduration: value ?? 0 })
            }
            min={0}
            suffix="sec"
            helpText="Minimum video duration"
          />
          <NumberField
            label="Max Duration"
            value={impression.video.maxduration}
            onChange={(value) =>
              updateVideo(impression.id, { maxduration: value ?? 0 })
            }
            min={0}
            suffix="sec"
            helpText="Maximum video duration"
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Video Protocols</h5>
        <MultiSelectField
          label="Supported Protocols (Recommended)"
          values={impression.video.protocols}
          options={VIDEO_PROTOCOLS}
          onChange={(values) =>
            updateVideo(impression.id, { protocols: values as number[] })
          }
          columns={2}
          helpText="VAST protocol versions supported"
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Placement & Delivery</h5>
        <div className="field-row">
          <SelectField
            label="Placement Type"
            value={impression.video.plcmt}
            options={VIDEO_PLCMT_TYPES}
            onChange={(value) => updateVideo(impression.id, { plcmt: value as number })}
          />
          <SelectField
            label="Linearity"
            value={impression.video.linearity}
            options={VIDEO_LINEARITY}
            onChange={(value) => updateVideo(impression.id, { linearity: value as number })}
          />
        </div>
        <div className="field-row">
          <SelectField
            label="Start Delay"
            value={impression.video.startdelay}
            options={VIDEO_START_DELAY}
            onChange={(value) => updateVideo(impression.id, { startdelay: value as number })}
          />
          <SelectField
            label="Position"
            value={impression.video.pos}
            options={AD_POSITIONS}
            onChange={(value) => updateVideo(impression.id, { pos: value as number })}
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Skip Controls</h5>
        <ToggleField
          label="Skippable"
          value={impression.video.skip}
          onChange={(value) => updateVideo(impression.id, { skip: value })}
        />
        {impression.video.skip && (
          <div className="field-row">
            <NumberField
              label="Skip Min"
              value={impression.video.skipmin}
              onChange={(value) =>
                updateVideo(impression.id, { skipmin: value ?? 0 })
              }
              min={0}
              suffix="sec"
              helpText="Minimum time before skip available"
            />
            <NumberField
              label="Skip After"
              value={impression.video.skipafter}
              onChange={(value) =>
                updateVideo(impression.id, { skipafter: value ?? 0 })
              }
              min={0}
              suffix="sec"
              helpText="Number of seconds after which skip is available"
            />
          </div>
        )}
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Playback Methods</h5>
        <MultiSelectField
          label="Supported Playback Methods"
          values={impression.video.playbackmethod}
          options={VIDEO_PLAYBACK_METHODS}
          onChange={(values) =>
            updateVideo(impression.id, { playbackmethod: values as number[] })
          }
          columns={2}
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Delivery Methods</h5>
        <MultiSelectField
          label="Supported Delivery Methods"
          values={impression.video.delivery}
          options={VIDEO_DELIVERY}
          onChange={(values) =>
            updateVideo(impression.id, { delivery: values as number[] })
          }
          columns={3}
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">API Frameworks</h5>
        <MultiSelectField
          label="Supported API Frameworks"
          values={impression.video.api}
          options={API_FRAMEWORKS}
          onChange={(values) =>
            updateVideo(impression.id, { api: values as number[] })
          }
          columns={2}
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Bitrate (Optional)</h5>
        <div className="field-row">
          <NumberField
            label="Min Bitrate"
            value={impression.video.minbitrate ?? 0}
            onChange={(value) =>
              updateVideo(impression.id, { minbitrate: value === 0 ? null : value })
            }
            min={0}
            suffix="kbps"
            helpText="Minimum bitrate in kbps"
          />
          <NumberField
            label="Max Bitrate"
            value={impression.video.maxbitrate ?? 0}
            onChange={(value) =>
              updateVideo(impression.id, { maxbitrate: value === 0 ? null : value })
            }
            min={0}
            suffix="kbps"
            helpText="Maximum bitrate in kbps"
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Additional Video Settings</h5>
        <div className="field-row">
          <SelectField
            label="Playback End"
            value={impression.video.playbackend}
            options={VIDEO_PLAYBACK_END}
            onChange={(value) => updateVideo(impression.id, { playbackend: value as number })}
          />
        </div>
        <div className="field-row toggles-row">
          <ToggleField
            label="Boxing Allowed"
            value={impression.video.boxingallowed}
            onChange={(value) => updateVideo(impression.id, { boxingallowed: value })}
          />
        </div>
      </div>

      <ImpressionCommonFields
        impression={impression}
        updateImpression={updateImpression}
        battrValues={impression.video.battr}
        onBattrChange={(values) => updateVideo(impression.id, { battr: values })}
        tagIdPlaceholder="video-player-1, pre-roll..."
      />

      <PmpEditor impression={impression} />
    </div>
  );
};
