import React from 'react';
import { TextField, NumberField, ToggleField } from '../common';
import { useBidRequestStore } from '../../stores/useBidRequestStore';
import type { SupplyChainNodeFormState } from '../../types/formState';
import './Sections.css';

export const SourceSection: React.FC = () => {
  const { source, updateSource } = useBidRequestStore();

  const handleAddNode = () => {
    const newNode: SupplyChainNodeFormState = {
      asi: '',
      sid: '',
      rid: '',
      name: '',
      domain: '',
      hp: true,
    };

    if (source.schain) {
      updateSource({
        schain: {
          ...source.schain,
          nodes: [...source.schain.nodes, newNode],
        },
      });
    } else {
      updateSource({
        schain: {
          complete: true,
          ver: '1.0',
          nodes: [newNode],
        },
      });
    }
  };

  const handleRemoveNode = (index: number) => {
    if (source.schain) {
      const newNodes = source.schain.nodes.filter((_, i) => i !== index);
      if (newNodes.length === 0) {
        updateSource({ schain: null });
      } else {
        updateSource({
          schain: {
            ...source.schain,
            nodes: newNodes,
          },
        });
      }
    }
  };

  const handleUpdateNode = (index: number, updates: Partial<SupplyChainNodeFormState>) => {
    if (source.schain) {
      const newNodes = [...source.schain.nodes];
      newNodes[index] = { ...newNodes[index], ...updates };
      updateSource({
        schain: {
          ...source.schain,
          nodes: newNodes,
        },
      });
    }
  };

  return (
    <div className="section-form">
      <div className="field-group">
        <h4 className="field-group-title">Source Information</h4>
        <div className="field-row">
          <TextField
            label="Transaction ID"
            value={source.tid}
            onChange={(value) => updateSource({ tid: value })}
            placeholder="transaction-id-123"
            helpText="Transaction ID that must be common across all participants"
          />
          <NumberField
            label="Final Decision"
            value={source.fd}
            onChange={(value) => updateSource({ fd: value ?? 0 })}
            min={0}
            max={1}
            helpText="1 = upstream has final decision, 0 = exchange has final decision"
          />
        </div>
        <div className="field-row">
          <TextField
            label="Payment ID Chain"
            value={source.pchain}
            onChange={(value) => updateSource({ pchain: value })}
            placeholder="TAG Payment ID chain string"
            helpText="TAG Payment ID chain string"
          />
        </div>
      </div>

      <div className="field-group">
        <h4 className="field-group-title">Supply Chain (schain)</h4>
        {source.schain && (
          <div className="schain-header">
            <div className="field-row">
              <TextField
                label="Version"
                value={source.schain.ver}
                onChange={(value) =>
                  updateSource({
                    schain: { ...source.schain!, ver: value },
                  })
                }
                placeholder="1.0"
                helpText="Supply chain version"
              />
              <ToggleField
                label="Complete Chain"
                value={source.schain.complete}
                onChange={(value) =>
                  updateSource({
                    schain: { ...source.schain!, complete: value },
                  })
                }
              />
            </div>
          </div>
        )}

        <div className="schain-nodes">
          {source.schain?.nodes.map((node, index) => (
            <div key={index} className="schain-node">
              <div className="node-header">
                <span className="node-title">Node #{index + 1}</span>
                <button
                  type="button"
                  className="remove-node-button"
                  onClick={() => handleRemoveNode(index)}
                >
                  Remove
                </button>
              </div>
              <div className="field-row">
                <TextField
                  label="ASI (Canonical Domain)"
                  value={node.asi}
                  onChange={(value) => handleUpdateNode(index, { asi: value })}
                  placeholder="ssp.example.com"
                  required
                  helpText="Canonical domain of the SSP"
                />
                <TextField
                  label="SID (Seller ID)"
                  value={node.sid}
                  onChange={(value) => handleUpdateNode(index, { sid: value })}
                  placeholder="pub-12345"
                  required
                  helpText="Seller ID in ads.txt/app-ads.txt"
                />
              </div>
              <div className="field-row">
                <TextField
                  label="RID (Request ID)"
                  value={node.rid}
                  onChange={(value) => handleUpdateNode(index, { rid: value })}
                  placeholder="request-id-456"
                  helpText="Request ID from this seller"
                />
                <TextField
                  label="Name"
                  value={node.name}
                  onChange={(value) => handleUpdateNode(index, { name: value })}
                  placeholder="SSP Name"
                  helpText="Optional name of the SSP"
                />
              </div>
              <div className="field-row">
                <TextField
                  label="Domain"
                  value={node.domain}
                  onChange={(value) => handleUpdateNode(index, { domain: value })}
                  placeholder="ssp.example.com"
                  helpText="Business domain of the entity"
                />
                <ToggleField
                  label="HP (Paid Seller)"
                  value={node.hp}
                  onChange={(value) => handleUpdateNode(index, { hp: value })}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="add-node-button"
          onClick={handleAddNode}
        >
          + Add Supply Chain Node
        </button>

        {!source.schain && (
          <div className="info-note">
            <p>
              <strong>Supply Chain (schain)</strong> provides transparency into the
              programmatic supply path. Click "Add Supply Chain Node" to start
              building your supply chain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
