import React from 'react';
import { NumberField, SelectField, MultiSelectField, ToggleField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { ImpressionHeader } from './ImpressionHeader';
import { ImpressionCommonFields } from './ImpressionCommonFields';
import {
  API_FRAMEWORKS,
  AUDIO_MIMES,
  AUDIO_PROTOCOLS,
  AUDIO_FEED_TYPES,
  AUDIO_VOLUME_NORMALIZATION,
  AUDIO_START_DELAY,
  AUDIO_DELIVERY,
  COMPANION_TYPES,
} from '../../constants/openrtb-enums';
import type { ImpressionFormState } from '../../types/formState';
import './Sections.css';

interface AudioEditorProps {
  impression: ImpressionFormState;
  index: number;
  canRemove: boolean;
}

export const AudioEditor: React.FC<AudioEditorProps> = ({
  impression,
  index,
  canRemove,
}) => {
  const { updateImpression, updateAudio, removeImpression } = useBidRequestStore();

  return (
    <div className="audio-editor">
      <ImpressionHeader
        index={index}
        impressionId={impression.id}
        canRemove={canRemove}
        onRemove={() => removeImpression(impression.id)}
      />

      <div className="field-group">
        <h5 className="field-group-subtitle">
          MIME Types <span style={{ color: 'red' }}>*</span>
        </h5>
        <MultiSelectField
          label="Supported MIME Types (REQUIRED)"
          values={impression.audio.mimes}
          options={AUDIO_MIMES}
          onChange={(values) =>
            updateAudio(impression.id, { mimes: values as string[] })
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
            value={impression.audio.minduration}
            onChange={(value) =>
              updateAudio(impression.id, { minduration: value ?? 0 })
            }
            min={0}
            suffix="sec"
            helpText="Minimum audio duration"
          />
          <NumberField
            label="Max Duration"
            value={impression.audio.maxduration}
            onChange={(value) =>
              updateAudio(impression.id, { maxduration: value ?? 0 })
            }
            min={0}
            suffix="sec"
            helpText="Maximum audio duration"
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Audio Protocols</h5>
        <MultiSelectField
          label="Supported Protocols (Recommended)"
          values={impression.audio.protocols}
          options={AUDIO_PROTOCOLS}
          onChange={(values) =>
            updateAudio(impression.id, { protocols: values as number[] })
          }
          columns={2}
          helpText="VAST/DAAST protocol versions supported"
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Audio Placement</h5>
        <div className="field-row">
          <SelectField
            label="Start Delay"
            value={impression.audio.startdelay}
            options={AUDIO_START_DELAY}
            onChange={(value) => updateAudio(impression.id, { startdelay: value as number })}
          />
          <SelectField
            label="Feed Type"
            value={impression.audio.feed}
            options={AUDIO_FEED_TYPES}
            onChange={(value) => updateAudio(impression.id, { feed: value as number })}
          />
        </div>
        <div className="field-row">
          <SelectField
            label="Volume Normalization"
            value={impression.audio.nvol}
            options={AUDIO_VOLUME_NORMALIZATION}
            onChange={(value) => updateAudio(impression.id, { nvol: value as number })}
          />
          <ToggleField
            label="Stitched Content"
            value={impression.audio.stitched}
            onChange={(value) => updateAudio(impression.id, { stitched: value })}
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Delivery Methods</h5>
        <MultiSelectField
          label="Supported Delivery Methods"
          values={impression.audio.delivery}
          options={AUDIO_DELIVERY}
          onChange={(values) =>
            updateAudio(impression.id, { delivery: values as number[] })
          }
          columns={3}
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">API Frameworks</h5>
        <MultiSelectField
          label="Supported API Frameworks"
          values={impression.audio.api}
          options={API_FRAMEWORKS}
          onChange={(values) =>
            updateAudio(impression.id, { api: values as number[] })
          }
          columns={2}
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Companion Types</h5>
        <MultiSelectField
          label="Supported Companion Types"
          values={impression.audio.companiontype}
          options={COMPANION_TYPES}
          onChange={(values) =>
            updateAudio(impression.id, { companiontype: values as number[] })
          }
          columns={3}
          helpText="Types of companion ads supported"
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Bitrate (Optional)</h5>
        <div className="field-row">
          <NumberField
            label="Min Bitrate"
            value={impression.audio.minbitrate ?? 0}
            onChange={(value) =>
              updateAudio(impression.id, { minbitrate: value === 0 ? null : value })
            }
            min={0}
            suffix="kbps"
            helpText="Minimum bitrate in kbps"
          />
          <NumberField
            label="Max Bitrate"
            value={impression.audio.maxbitrate ?? 0}
            onChange={(value) =>
              updateAudio(impression.id, { maxbitrate: value === 0 ? null : value })
            }
            min={0}
            suffix="kbps"
            helpText="Maximum bitrate in kbps"
          />
        </div>
      </div>

      <ImpressionCommonFields
        impression={impression}
        updateImpression={updateImpression}
        battrValues={impression.audio.battr}
        onBattrChange={(values) => updateAudio(impression.id, { battr: values })}
        tagIdPlaceholder="audio-player-1, pre-roll..."
      />
    </div>
  );
};
