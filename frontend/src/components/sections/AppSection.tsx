import React, { useMemo } from 'react';
import { TextField, ToggleField, ArrayField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import { getIabCategorySuggestions, getIabCategoryDisplay } from '../../constants/iab-categories';
import './Sections.css';

export const AppSection: React.FC = () => {
  const { app, updateApp, updateAppPublisher } = useBidRequestStore();

  // Memoize IAB category suggestions to avoid recomputing on each render
  const iabSuggestions = useMemo(() => getIabCategorySuggestions(), []);

  return (
    <div className="section-form">
      <div className="field-group">
        <h4 className="field-group-title">App Information</h4>
        <div className="field-row">
          <TextField
            label="Bundle ID"
            value={app.bundle}
            onChange={(value) => updateApp({ bundle: value })}
            placeholder="com.example.app"
            required
            helpText="App bundle or package name (required)"
          />
          <TextField
            label="App Name"
            value={app.name}
            onChange={(value) => updateApp({ name: value })}
            placeholder="My App"
            helpText="Application name"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Store URL"
            value={app.storeurl}
            onChange={(value) => updateApp({ storeurl: value })}
            placeholder="https://apps.apple.com/..."
            type="url"
            helpText="App store URL"
          />
          <TextField
            label="Version"
            value={app.ver}
            onChange={(value) => updateApp({ ver: value })}
            placeholder="1.0.0"
            helpText="App version"
          />
        </div>
        <div className="field-row">
          <TextField
            label="App ID"
            value={app.id}
            onChange={(value) => updateApp({ id: value })}
            placeholder="Auto-generated if empty"
            helpText="Leave empty to auto-generate"
          />
          <TextField
            label="Domain"
            value={app.domain}
            onChange={(value) => updateApp({ domain: value })}
            placeholder="example.com"
            helpText="Domain of the app"
          />
        </div>
        <div className="field-row toggles-row">
          <ToggleField
            label="Has Privacy Policy"
            value={app.privacypolicy}
            onChange={(value) => updateApp({ privacypolicy: value })}
          />
          <ToggleField
            label="Paid App"
            value={app.paid}
            onChange={(value) => updateApp({ paid: value })}
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">App Categories (IAB)</h4>
        <ArrayField
          label="App Categories"
          values={app.cat}
          onChange={(values) => updateApp({ cat: values })}
          placeholder="Search IAB categories..."
          helpText="IAB content categories for the app"
          searchableData={iabSuggestions}
          displayFormatter={getIabCategoryDisplay}
        />
        <div className="field-row">
          <ArrayField
            label="Section Categories"
            values={app.sectioncat}
            onChange={(values) => updateApp({ sectioncat: values })}
            placeholder="Search IAB categories..."
            helpText="Categories for the current section"
            searchableData={iabSuggestions}
            displayFormatter={getIabCategoryDisplay}
          />
          <ArrayField
            label="Page Categories"
            values={app.pagecat}
            onChange={(values) => updateApp({ pagecat: values })}
            placeholder="Search IAB categories..."
            helpText="Categories for the current page/view"
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
            value={app.publisher.name}
            onChange={(value) => updateAppPublisher({ name: value })}
            placeholder="Publisher Inc."
            helpText="App publisher name"
          />
          <TextField
            label="Publisher Domain"
            value={app.publisher.domain}
            onChange={(value) => updateAppPublisher({ domain: value })}
            placeholder="publisher.com"
            helpText="Publisher domain"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Publisher ID"
            value={app.publisher.id}
            onChange={(value) => updateAppPublisher({ id: value })}
            placeholder="Auto-generated if empty"
            helpText="Leave empty to auto-generate"
          />
        </div>
        <ArrayField
          label="Publisher Categories"
          values={app.publisher.cat}
          onChange={(values) => updateAppPublisher({ cat: values })}
          placeholder="Search IAB categories..."
          helpText="IAB content categories for the publisher"
          searchableData={iabSuggestions}
          displayFormatter={getIabCategoryDisplay}
        />
      </div>
    </div>
  );
};
