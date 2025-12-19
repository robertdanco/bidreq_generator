import React, { useMemo } from 'react';
import { TextField, ToggleField, ArrayField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { getIabCategorySuggestions, getIabCategoryDisplay } from '../../constants/iab-categories';
import { ContentSection } from './ContentSection';
import './Sections.css';

export const SiteSection: React.FC = () => {
  const {
    site,
    updateSite,
    updatePublisher,
    updateSiteContent,
    updateSiteProducer,
    updateSiteNetwork,
    updateSiteChannel,
  } = useBidRequestStore();

  // Memoize IAB category suggestions to avoid recomputing on each render
  const iabSuggestions = useMemo(() => getIabCategorySuggestions(), []);

  return (
    <div className="section-form">
      <div className="field-group">
        <h4 className="field-group-title">Site Information</h4>
        <div className="field-row">
          <TextField
            label="Domain"
            value={site.domain}
            onChange={(value) => updateSite({ domain: value })}
            placeholder="example.com"
            required
            helpText="Site domain (required)"
          />
          <TextField
            label="Site Name"
            value={site.name}
            onChange={(value) => updateSite({ name: value })}
            placeholder="My Website"
            helpText="Defaults to domain if empty"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Page URL"
            value={site.page}
            onChange={(value) => updateSite({ page: value })}
            placeholder="https://example.com/page.html"
            type="url"
            required
            helpText="Current page URL (required)"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Site ID"
            value={site.id}
            onChange={(value) => updateSite({ id: value })}
            placeholder="Auto-generated if empty"
            helpText="Leave empty to auto-generate"
          />
          <TextField
            label="Referrer URL"
            value={site.ref}
            onChange={(value) => updateSite({ ref: value })}
            placeholder="https://google.com"
            type="url"
          />
        </div>
        <div className="field-row toggles-row">
          <ToggleField
            label="Has Privacy Policy"
            value={site.privacypolicy}
            onChange={(value) => updateSite({ privacypolicy: value })}
          />
          <ToggleField
            label="Mobile Optimized Site"
            value={site.mobile}
            onChange={(value) => updateSite({ mobile: value })}
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Site Categories (IAB)</h4>
        <ArrayField
          label="Site Categories"
          values={site.cat}
          onChange={(values) => updateSite({ cat: values })}
          placeholder="Search IAB categories..."
          helpText="IAB content categories for the site"
          searchableData={iabSuggestions}
          displayFormatter={getIabCategoryDisplay}
        />
        <div className="field-row">
          <ArrayField
            label="Section Categories"
            values={site.sectioncat}
            onChange={(values) => updateSite({ sectioncat: values })}
            placeholder="Search IAB categories..."
            helpText="Categories for the current section"
            searchableData={iabSuggestions}
            displayFormatter={getIabCategoryDisplay}
          />
          <ArrayField
            label="Page Categories"
            values={site.pagecat}
            onChange={(values) => updateSite({ pagecat: values })}
            placeholder="Search IAB categories..."
            helpText="Categories for the current page"
            searchableData={iabSuggestions}
            displayFormatter={getIabCategoryDisplay}
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Publisher Information</h4>
        <div className="field-row">
          <TextField
            label="Publisher Name"
            value={site.publisher.name}
            onChange={(value) => updatePublisher({ name: value })}
            placeholder="Publisher Inc."
            helpText="Defaults to domain if empty"
          />
          <TextField
            label="Publisher Domain"
            value={site.publisher.domain}
            onChange={(value) => updatePublisher({ domain: value })}
            placeholder="publisher.com"
            helpText="Defaults to site domain if empty"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Publisher ID"
            value={site.publisher.id}
            onChange={(value) => updatePublisher({ id: value })}
            placeholder="Auto-generated if empty"
            helpText="Leave empty to auto-generate"
          />
        </div>
        <ArrayField
          label="Publisher Categories"
          values={site.publisher.cat}
          onChange={(values) => updatePublisher({ cat: values })}
          placeholder="Search IAB categories..."
          helpText="IAB content categories for the publisher"
          searchableData={iabSuggestions}
          displayFormatter={getIabCategoryDisplay}
        />
      </div>

      <ContentSection
        content={site.content}
        updateContent={updateSiteContent}
        updateProducer={updateSiteProducer}
        updateNetwork={updateSiteNetwork}
        updateChannel={updateSiteChannel}
      />
    </div>
  );
};
