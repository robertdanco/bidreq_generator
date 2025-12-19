import React from 'react';
import { BannerEditor } from './BannerEditor';
import { VideoEditor } from './VideoEditor';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import './Sections.css';

const MAX_IMPRESSIONS = 10;

export const ImpressionSection: React.FC = () => {
  const { impressions, addImpression, setImpressionMediaType } = useBidRequestStore();

  return (
    <div className="section-form impressions-section">
      <div className="impressions-header">
        <p className="impressions-info">
          Configure banner or video ad impressions for this request. Each impression represents
          an ad slot on the page.
        </p>
        {impressions.length < MAX_IMPRESSIONS && (
          <button
            type="button"
            className="add-impression-button"
            onClick={addImpression}
          >
            + Add Impression
          </button>
        )}
      </div>

      <div className="impressions-list">
        {impressions.map((impression, index) => (
          <div key={impression.id} className="impression-container">
            <div className="media-type-toggle">
              <button
                type="button"
                className={impression.mediaType === 'banner' ? 'active' : ''}
                onClick={() => setImpressionMediaType(impression.id, 'banner')}
              >
                Banner
              </button>
              <button
                type="button"
                className={impression.mediaType === 'video' ? 'active' : ''}
                onClick={() => setImpressionMediaType(impression.id, 'video')}
              >
                Video
              </button>
            </div>
            {impression.mediaType === 'banner' ? (
              <BannerEditor
                impression={impression}
                index={index}
                canRemove={impressions.length > 1}
              />
            ) : (
              <VideoEditor
                impression={impression}
                index={index}
                canRemove={impressions.length > 1}
              />
            )}
          </div>
        ))}
      </div>

      {impressions.length >= MAX_IMPRESSIONS && (
        <p className="impressions-limit-warning">
          Maximum of {MAX_IMPRESSIONS} impressions reached.
        </p>
      )}
    </div>
  );
};
