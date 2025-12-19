import React, { useState } from 'react';

export default function OpenRTBDecisionTree() {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedObjects, setExpandedObjects] = useState({});

  const toggleObject = (obj) => {
    setExpandedObjects(prev => ({ ...prev, [obj]: !prev[obj] }));
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      required: 'bg-red-100 text-red-800 border-red-300',
      recommended: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      optional: 'bg-gray-100 text-gray-600 border-gray-300'
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded border ${colors[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const ObjectCard = ({ name, description, fields, color = 'blue' }) => {
    const isExpanded = expandedObjects[name];
    const borderColors = {
      blue: 'border-blue-400 hover:border-blue-600',
      green: 'border-green-400 hover:border-green-600',
      purple: 'border-purple-400 hover:border-purple-600',
      orange: 'border-orange-400 hover:border-orange-600'
    };

    return (
      <div className={`border-2 rounded-lg mb-3 overflow-hidden ${borderColors[color]} transition-all`}>
        <div 
          className="p-3 cursor-pointer bg-white hover:bg-gray-50 flex justify-between items-center"
          onClick={() => toggleObject(name)}
        >
          <div>
            <span className="font-bold text-lg">{name}</span>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <span className="text-xl">{isExpanded ? '−' : '+'}</span>
        </div>
        {isExpanded && (
          <div className="border-t bg-gray-50 p-3 max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left p-2">Field</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((f, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-2 font-mono text-blue-700">{f.name}</td>
                    <td className="p-2 text-gray-600">{f.type}</td>
                    <td className="p-2"><StatusBadge status={f.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const DecisionNode = ({ question, children }) => (
    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 my-4">
      <div className="font-bold text-yellow-800 mb-3 flex items-center">
        <span className="text-2xl mr-2">❓</span>
        {question}
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );

  const DecisionPath = ({ condition, result, required }) => (
    <div className={`flex items-center mb-2 p-2 rounded ${required ? 'bg-red-50' : 'bg-green-50'}`}>
      <span className="font-bold mr-2 text-blue-600">IF</span>
      <span className="mr-2">{condition}</span>
      <span className="font-bold mr-2">→</span>
      <span className={required ? 'text-red-700' : 'text-green-700'}>{result}</span>
    </div>
  );

  const Constraint = ({ text, type = 'error' }) => (
    <div className={`p-3 rounded-lg my-2 flex items-center ${type === 'error' ? 'bg-red-100 border border-red-300' : 'bg-blue-100 border border-blue-300'}`}>
      <span className="text-xl mr-2">{type === 'error' ? '⛔' : 'ℹ️'}</span>
      <span className={type === 'error' ? 'text-red-800' : 'text-blue-800'}>{text}</span>
    </div>
  );

  // Object definitions
  const objects = {
    bidRequest: {
      name: 'BidRequest',
      description: 'Top-level object containing auction ID and all context',
      color: 'blue',
      fields: [
        { name: 'id', type: 'string', status: 'required' },
        { name: 'imp', type: 'object[]', status: 'required' },
        { name: 'site', type: 'object', status: 'recommended' },
        { name: 'app', type: 'object', status: 'recommended' },
        { name: 'device', type: 'object', status: 'recommended' },
        { name: 'user', type: 'object', status: 'recommended' },
        { name: 'test', type: 'integer', status: 'optional' },
        { name: 'at', type: 'integer', status: 'optional' },
        { name: 'tmax', type: 'integer', status: 'optional' },
        { name: 'wseat', type: 'string[]', status: 'optional' },
        { name: 'bseat', type: 'string[]', status: 'optional' },
        { name: 'cur', type: 'string[]', status: 'optional' },
        { name: 'bcat', type: 'string[]', status: 'optional' },
        { name: 'badv', type: 'string[]', status: 'optional' },
        { name: 'source', type: 'object', status: 'optional' },
        { name: 'regs', type: 'object', status: 'optional' }
      ]
    },
    imp: {
      name: 'Imp',
      description: 'Impression/ad placement being auctioned',
      color: 'green',
      fields: [
        { name: 'id', type: 'string', status: 'required' },
        { name: 'banner', type: 'object', status: 'optional' },
        { name: 'video', type: 'object', status: 'optional' },
        { name: 'audio', type: 'object', status: 'optional' },
        { name: 'native', type: 'object', status: 'optional' },
        { name: 'pmp', type: 'object', status: 'optional' },
        { name: 'bidfloor', type: 'float', status: 'optional' },
        { name: 'bidfloorcur', type: 'string', status: 'optional' },
        { name: 'secure', type: 'integer', status: 'optional' },
        { name: 'instl', type: 'integer', status: 'optional' },
        { name: 'tagid', type: 'string', status: 'optional' }
      ]
    },
    video: {
      name: 'Video',
      description: 'In-stream video impression (VAST compliant)',
      color: 'purple',
      fields: [
        { name: 'mimes', type: 'string[]', status: 'required' },
        { name: 'minduration', type: 'integer', status: 'recommended' },
        { name: 'maxduration', type: 'integer', status: 'recommended' },
        { name: 'protocols', type: 'integer[]', status: 'recommended' },
        { name: 'w', type: 'integer', status: 'recommended' },
        { name: 'h', type: 'integer', status: 'recommended' },
        { name: 'startdelay', type: 'integer', status: 'recommended' },
        { name: 'placement', type: 'integer', status: 'optional' },
        { name: 'linearity', type: 'integer', status: 'optional' },
        { name: 'skip', type: 'integer', status: 'optional' },
        { name: 'podid', type: 'string', status: 'optional' },
        { name: 'podseq', type: 'integer', status: 'optional' },
        { name: 'poddur', type: 'integer', status: 'recommended' },
        { name: 'maxseq', type: 'integer', status: 'recommended' }
      ]
    },
    banner: {
      name: 'Banner',
      description: 'Display ad (static, expandable, or in-banner video)',
      color: 'orange',
      fields: [
        { name: 'format', type: 'object[]', status: 'recommended' },
        { name: 'w', type: 'integer', status: 'optional' },
        { name: 'h', type: 'integer', status: 'optional' },
        { name: 'btype', type: 'integer[]', status: 'optional' },
        { name: 'battr', type: 'integer[]', status: 'optional' },
        { name: 'pos', type: 'integer', status: 'optional' },
        { name: 'mimes', type: 'string[]', status: 'optional' },
        { name: 'api', type: 'integer[]', status: 'optional' }
      ]
    }
  };

  const NavButton = ({ id, label, active }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        active ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">OpenRTB 2.6 Decision Tree</h1>
          <p className="text-blue-200">Interactive guide to building valid bid requests</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <NavButton id="overview" label="Overview" active={activeSection === 'overview'} />
          <NavButton id="decision" label="Decision Flow" active={activeSection === 'decision'} />
          <NavButton id="objects" label="Objects" active={activeSection === 'objects'} />
          <NavButton id="constraints" label="Constraints" active={activeSection === 'constraints'} />
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          {activeSection === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Minimum Valid Bid Request</h2>
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-green-800 mb-2">✓ Absolute Requirements</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-32 font-mono text-green-700">BidRequest.id</span>
                    <span className="text-gray-600">Unique auction identifier (string)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 font-mono text-green-700">BidRequest.imp[]</span>
                    <span className="text-gray-600">At least one Imp object</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 font-mono text-green-700">Imp.id</span>
                    <span className="text-gray-600">Unique within request (string)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 font-mono text-green-700">Imp.[type]</span>
                    <span className="text-gray-600">At least one of: banner, video, audio, native</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">Object Hierarchy</h3>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                <pre>{`BidRequest (root)
├── id (required)
├── imp[] (required, 1+)
│   ├── id (required)
│   ├── banner ─┐
│   ├── video  ├── At least one required
│   ├── audio  │
│   └── native ─┘
├── site (recommended) ─┐
├── app (recommended)  ─┴── XOR (never both)
├── device (recommended)
├── user (recommended)
├── source (optional)
└── regs (optional)`}</pre>
              </div>
            </div>
          )}

          {activeSection === 'decision' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Decision Flow</h2>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg mb-2">Step 1: Core Structure</h3>
                <div className="bg-blue-50 p-3 rounded mb-4">
                  <p>Every request starts with <code className="bg-blue-200 px-1 rounded">BidRequest.id</code> and <code className="bg-blue-200 px-1 rounded">BidRequest.imp[]</code></p>
                </div>
              </div>

              <DecisionNode question="What ad format(s) are you offering?">
                <DecisionPath condition="Display ad" result="Add Imp.banner object" />
                <DecisionPath condition="Video ad" result="Add Imp.video object (mimes[] required)" required />
                <DecisionPath condition="Audio ad" result="Add Imp.audio object (mimes[] required)" required />
                <DecisionPath condition="Native ad" result="Add Imp.native object (request required)" required />
                <p className="text-sm text-gray-600 mt-2 italic">Note: Multiple types can be offered; bidder responds with exactly one.</p>
              </DecisionNode>

              <DecisionNode question="Is inventory from a website or app?">
                <DecisionPath condition="Website" result="Include BidRequest.site" />
                <DecisionPath condition="Mobile App" result="Include BidRequest.app" />
                <Constraint text="NEVER include both site AND app in the same request" type="error" />
              </DecisionNode>

              <DecisionNode question="Is this a video/audio ad pod?">
                <DecisionPath condition="Yes, part of pod" result="Set podid to group impressions" />
                <DecisionPath condition="Dynamic pod" result="Set poddur (total duration) + maxseq (max ads)" />
                <Constraint text="Use EITHER minduration/maxduration OR rqddurs — never both" type="info" />
              </DecisionNode>

              <DecisionNode question="Are there private marketplace deals?">
                <DecisionPath condition="Yes" result="Include Imp.pmp with deals[]" />
                <DecisionPath condition="Private auction only" result="Set pmp.private_auction = 1" />
              </DecisionNode>

              <DecisionNode question="What regulations apply?">
                <DecisionPath condition="COPPA" result="Set regs.coppa = 1" />
                <DecisionPath condition="GDPR" result="Set regs.gdpr = 1 AND user.consent (TCF string)" />
                <DecisionPath condition="US Privacy/CCPA" result="Set regs.us_privacy (US Privacy String)" />
              </DecisionNode>
            </div>
          )}

          {activeSection === 'objects' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Object Specifications</h2>
              <p className="text-gray-600 mb-4">Click any object to expand and see all fields</p>
              <ObjectCard {...objects.bidRequest} />
              <ObjectCard {...objects.imp} />
              <ObjectCard {...objects.video} />
              <ObjectCard {...objects.banner} />
            </div>
          )}

          {activeSection === 'constraints' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Key Constraints & Dependencies</h2>
              
              <h3 className="font-bold text-lg mt-4 mb-2">Mutually Exclusive Fields</h3>
              <div className="space-y-2">
                <Constraint text="site XOR app — Never include both" type="error" />
                <Constraint text="wseat XOR bseat — Use at most one" type="error" />
                <Constraint text="minduration/maxduration XOR rqddurs" type="error" />
                <Constraint text="keywords XOR kwarray" type="error" />
              </div>

              <h3 className="font-bold text-lg mt-6 mb-2">Conditional Requirements</h3>
              <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                <p>• <b>If video.skip = 1</b> → skipmin and skipafter become relevant</p>
                <p>• <b>If pmp.private_auction = 1</b> → Only deals in pmp.deals[] eligible</p>
                <p>• <b>If regs.gdpr = 1</b> → user.consent should contain TCF string</p>
                <p>• <b>If dynamic pod</b> → poddur, maxseq, mincpmpersec relevant</p>
                <p>• <b>If sua present</b> → Prefer sua over ua (ua may be frozen)</p>
              </div>

              <h3 className="font-bold text-lg mt-6 mb-2">Deprecated Fields (Avoid)</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-gray-600">
                <p>• video/audio.sequence → Use podid/slotinpod instead</p>
                <p>• user.yob, user.gender → Deprecated for privacy</p>
                <p>• device.didsha1, didmd5, dpidsha1, dpidmd5, macsha1, macmd5 → All deprecated</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-6">
          Based on IAB Tech Lab OpenRTB 2.6 Specification
        </div>
      </div>
    </div>
  );
}
