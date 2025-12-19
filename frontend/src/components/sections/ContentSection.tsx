import React, { useMemo } from 'react';
import { TextField, NumberField, SelectField, ToggleField, ArrayField } from '../common';
import { getIabCategorySuggestions, getIabCategoryDisplay } from '../../constants/iab-categories';
import {
  CONTENT_CONTEXTS,
  PRODUCTION_QUALITY,
  QAG_MEDIA_RATINGS,
} from '../../constants/openrtb-enums';
import type { ContentFormState } from '../../types/formState';
import './Sections.css';

interface ContentSectionProps {
  content: ContentFormState;
  updateContent: (updates: Partial<ContentFormState>) => void;
  updateProducer: (updates: Partial<ContentFormState['producer']>) => void;
  updateNetwork: (updates: Partial<ContentFormState['network']>) => void;
  updateChannel: (updates: Partial<ContentFormState['channel']>) => void;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  content,
  updateContent,
  updateProducer,
  updateNetwork,
  updateChannel,
}) => {
  const iabSuggestions = useMemo(() => getIabCategorySuggestions(), []);

  return (
    <div className="content-section">
      <div className="field-group">
        <h4 className="field-group-title">Content Information</h4>
        <p className="field-help-text" style={{ marginBottom: '12px' }}>
          Metadata about the content (video, audio, article) being displayed.
        </p>

        <div className="field-row">
          <TextField
            label="Content ID"
            value={content.id}
            onChange={(value) => updateContent({ id: value })}
            placeholder="content-12345"
            helpText="ID uniquely identifying the content"
          />
          <TextField
            label="Title"
            value={content.title}
            onChange={(value) => updateContent({ title: value })}
            placeholder="Game of Thrones S1E1"
            helpText="Content title"
          />
        </div>

        <div className="field-row">
          <TextField
            label="Series"
            value={content.series}
            onChange={(value) => updateContent({ series: value })}
            placeholder="Game of Thrones"
            helpText="Content series (e.g., show name)"
          />
          <TextField
            label="Season"
            value={content.season}
            onChange={(value) => updateContent({ season: value })}
            placeholder="Season 1"
            helpText="Content season"
          />
          <NumberField
            label="Episode"
            value={content.episode ?? 0}
            onChange={(value) => updateContent({ episode: value === 0 ? null : value })}
            min={0}
            helpText="Episode number"
          />
        </div>

        <div className="field-row">
          <TextField
            label="URL"
            value={content.url}
            onChange={(value) => updateContent({ url: value })}
            placeholder="https://example.com/content/12345"
            type="url"
            helpText="URL of the content"
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Audio/Music Metadata</h5>
        <div className="field-row">
          <TextField
            label="Artist"
            value={content.artist}
            onChange={(value) => updateContent({ artist: value })}
            placeholder="Taylor Swift"
            helpText="Artist name (audio content)"
          />
          <TextField
            label="Album"
            value={content.album}
            onChange={(value) => updateContent({ album: value })}
            placeholder="Midnights"
            helpText="Album name"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Genre"
            value={content.genre}
            onChange={(value) => updateContent({ genre: value })}
            placeholder="Pop"
            helpText="Genre of the content"
          />
          <TextField
            label="ISRC"
            value={content.isrc}
            onChange={(value) => updateContent({ isrc: value })}
            placeholder="USRC12345678"
            helpText="International Standard Recording Code"
          />
        </div>
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Content Classification</h5>
        <div className="field-row">
          <SelectField
            label="Content Context"
            value={content.context}
            options={[{ value: 0, label: 'Not Specified' }, ...CONTENT_CONTEXTS]}
            onChange={(value) => updateContent({ context: value as number })}
          />
          <SelectField
            label="Production Quality"
            value={content.prodq}
            options={PRODUCTION_QUALITY}
            onChange={(value) => updateContent({ prodq: value as number })}
          />
        </div>
        <div className="field-row">
          <SelectField
            label="QAG Media Rating"
            value={content.qagmediarating}
            options={[{ value: 0, label: 'Not Specified' }, ...QAG_MEDIA_RATINGS]}
            onChange={(value) => updateContent({ qagmediarating: value as number })}
          />
          <TextField
            label="Content Rating"
            value={content.contentrating}
            onChange={(value) => updateContent({ contentrating: value })}
            placeholder="TV-MA, PG-13, etc."
            helpText="Content rating (e.g., MPAA)"
          />
        </div>
        <div className="field-row">
          <TextField
            label="User Rating"
            value={content.userrating}
            onChange={(value) => updateContent({ userrating: value })}
            placeholder="4.5 stars"
            helpText="User rating of content"
          />
          <TextField
            label="Keywords"
            value={content.keywords}
            onChange={(value) => updateContent({ keywords: value })}
            placeholder="drama, fantasy, action..."
            helpText="Comma-separated keywords"
          />
        </div>

        <ArrayField
          label="Content Categories"
          values={content.cat}
          onChange={(values) => updateContent({ cat: values })}
          placeholder="Search IAB categories..."
          helpText="IAB content categories"
          searchableData={iabSuggestions}
          displayFormatter={getIabCategoryDisplay}
        />
      </div>

      <div className="field-group">
        <h5 className="field-group-subtitle">Playback Details</h5>
        <div className="field-row">
          <NumberField
            label="Length"
            value={content.len ?? 0}
            onChange={(value) => updateContent({ len: value === 0 ? null : value })}
            min={0}
            suffix="sec"
            helpText="Content length in seconds"
          />
          <TextField
            label="Language"
            value={content.language}
            onChange={(value) => updateContent({ language: value })}
            placeholder="en"
            helpText="ISO 639-1 language code"
          />
        </div>
        <div className="field-row toggles-row">
          <ToggleField
            label="Live Stream"
            value={content.livestream}
            onChange={(value) => updateContent({ livestream: value })}
          />
          <ToggleField
            label="Embeddable"
            value={content.embeddable}
            onChange={(value) => updateContent({ embeddable: value })}
          />
        </div>
      </div>

      {/* Producer */}
      <div className="field-group">
        <h5 className="field-group-subtitle">Producer</h5>
        <p className="field-help-text" style={{ marginBottom: '8px' }}>
          The original content creator (e.g., production studio).
        </p>
        <div className="field-row">
          <TextField
            label="Producer ID"
            value={content.producer.id}
            onChange={(value) => updateProducer({ id: value })}
            placeholder="producer-123"
            helpText="Content producer ID"
          />
          <TextField
            label="Producer Name"
            value={content.producer.name}
            onChange={(value) => updateProducer({ name: value })}
            placeholder="HBO"
            helpText="Producer name"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Producer Domain"
            value={content.producer.domain}
            onChange={(value) => updateProducer({ domain: value })}
            placeholder="hbo.com"
            helpText="Producer domain"
          />
        </div>
        <ArrayField
          label="Producer Categories"
          values={content.producer.cat}
          onChange={(values) => updateProducer({ cat: values })}
          placeholder="Search IAB categories..."
          helpText="IAB categories for producer"
          searchableData={iabSuggestions}
          displayFormatter={getIabCategoryDisplay}
        />
      </div>

      {/* Network */}
      <div className="field-group">
        <h5 className="field-group-subtitle">Network</h5>
        <p className="field-help-text" style={{ marginBottom: '8px' }}>
          The distribution network or channel owner (e.g., Viacom, NBCUniversal).
        </p>
        <div className="field-row">
          <TextField
            label="Network ID"
            value={content.network.id}
            onChange={(value) => updateNetwork({ id: value })}
            placeholder="network-456"
            helpText="Network ID"
          />
          <TextField
            label="Network Name"
            value={content.network.name}
            onChange={(value) => updateNetwork({ name: value })}
            placeholder="Viacom"
            helpText="Network name"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Network Domain"
            value={content.network.domain}
            onChange={(value) => updateNetwork({ domain: value })}
            placeholder="viacom.com"
            helpText="Network domain"
          />
        </div>
      </div>

      {/* Channel */}
      <div className="field-group">
        <h5 className="field-group-subtitle">Channel</h5>
        <p className="field-help-text" style={{ marginBottom: '8px' }}>
          The specific channel where content appears (e.g., MTV, Comedy Central).
        </p>
        <div className="field-row">
          <TextField
            label="Channel ID"
            value={content.channel.id}
            onChange={(value) => updateChannel({ id: value })}
            placeholder="channel-789"
            helpText="Channel ID"
          />
          <TextField
            label="Channel Name"
            value={content.channel.name}
            onChange={(value) => updateChannel({ name: value })}
            placeholder="MTV"
            helpText="Channel name"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Channel Domain"
            value={content.channel.domain}
            onChange={(value) => updateChannel({ domain: value })}
            placeholder="mtv.com"
            helpText="Channel domain"
          />
        </div>
      </div>
    </div>
  );
};
