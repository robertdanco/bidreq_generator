/**
 * OpenRTB 2.6 Shared Constraints
 * Single source of truth for validation constraints and field dependencies.
 *
 * IMPORTANT: Copy this file to both:
 * - /backend/src/shared/constraints.ts
 * - /frontend/src/shared/constraints.ts
 * Keep all copies in sync!
 */

// ============================================================================
// DURATION CONSTRAINTS
// ============================================================================

export const DURATION_CONSTRAINTS = {
  MIN: 0,
  MAX: 300,
  DEFAULT_MIN: 0,
  DEFAULT_MAX: 30,
} as const;

// ============================================================================
// BITRATE CONSTRAINTS
// ============================================================================

export const BITRATE_CONSTRAINTS = {
  MIN: 0,
  MAX: 50000, // 50 Mbps
  DEFAULT_VIDEO_MIN: null,
  DEFAULT_VIDEO_MAX: null,
  DEFAULT_AUDIO_MIN: null,
  DEFAULT_AUDIO_MAX: null,
} as const;

// ============================================================================
// DIMENSION CONSTRAINTS
// ============================================================================

export const DIMENSION_CONSTRAINTS = {
  MIN_WIDTH: 1,
  MAX_WIDTH: 7680, // 8K
  MIN_HEIGHT: 1,
  MAX_HEIGHT: 4320, // 8K
} as const;

// ============================================================================
// MUTUAL EXCLUSION RULES
// ============================================================================

export interface MutualExclusion {
  type: 'mutually_exclusive';
  fields: string[];
  message: string;
  severity: 'error' | 'warning';
}

/**
 * Scoped constraint - applies to a specific nested object path
 */
export interface ScopedConstraint {
  scope: string;  // Path to object (e.g., 'site', 'device.geo', '' for root)
}

export type ScopedMutualExclusion = MutualExclusion & ScopedConstraint;

export const MUTUAL_EXCLUSIONS: MutualExclusion[] = [
  {
    type: 'mutually_exclusive',
    fields: ['site', 'app'],
    message: 'BidRequest must have site OR app, never both',
    severity: 'error',
  },
  {
    type: 'mutually_exclusive',
    fields: ['wseat', 'bseat'],
    message: 'Use wseat OR bseat, not both',
    severity: 'error',
  },
  {
    type: 'mutually_exclusive',
    fields: ['wlang', 'wlangb'],
    message: 'Use wlang OR wlangb, not both',
    severity: 'warning',
  },
  {
    type: 'mutually_exclusive',
    fields: ['video.minduration+video.maxduration', 'video.rqddurs'],
    message: 'Use min/max duration OR rqddurs for exact durations, not both',
    severity: 'error',
  },
  {
    type: 'mutually_exclusive',
    fields: ['audio.minduration+audio.maxduration', 'audio.rqddurs'],
    message: 'Use min/max duration OR rqddurs for exact durations, not both',
    severity: 'error',
  },
  {
    type: 'mutually_exclusive',
    fields: ['site.keywords', 'site.kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  {
    type: 'mutually_exclusive',
    fields: ['app.keywords', 'app.kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  {
    type: 'mutually_exclusive',
    fields: ['user.keywords', 'user.kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  {
    type: 'mutually_exclusive',
    fields: ['content.keywords', 'content.kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  {
    type: 'mutually_exclusive',
    fields: ['device.language', 'device.langb'],
    message: 'Use language OR langb, not both',
    severity: 'warning',
  },
  {
    type: 'mutually_exclusive',
    fields: ['content.language', 'content.langb'],
    message: 'Use language OR langb, not both',
    severity: 'warning',
  },
];

/**
 * Scoped mutual exclusions - constraints that apply to specific nested objects.
 * These use relative field paths within their scope.
 */
export const SCOPED_MUTUAL_EXCLUSIONS: ScopedMutualExclusion[] = [
  // Site-scoped
  {
    type: 'mutually_exclusive',
    scope: 'site',
    fields: ['keywords', 'kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  // App-scoped
  {
    type: 'mutually_exclusive',
    scope: 'app',
    fields: ['keywords', 'kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  // User-scoped
  {
    type: 'mutually_exclusive',
    scope: 'user',
    fields: ['keywords', 'kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  // Site content-scoped
  {
    type: 'mutually_exclusive',
    scope: 'site.content',
    fields: ['keywords', 'kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  {
    type: 'mutually_exclusive',
    scope: 'site.content',
    fields: ['language', 'langb'],
    message: 'Use language OR langb, not both',
    severity: 'warning',
  },
  // App content-scoped
  {
    type: 'mutually_exclusive',
    scope: 'app.content',
    fields: ['keywords', 'kwarray'],
    message: 'Use keywords string OR kwarray, not both',
    severity: 'warning',
  },
  {
    type: 'mutually_exclusive',
    scope: 'app.content',
    fields: ['language', 'langb'],
    message: 'Use language OR langb, not both',
    severity: 'warning',
  },
  // Device-scoped
  {
    type: 'mutually_exclusive',
    scope: 'device',
    fields: ['language', 'langb'],
    message: 'Use language OR langb, not both',
    severity: 'warning',
  },
];

// ============================================================================
// CONDITIONAL REQUIREMENTS
// ============================================================================

export interface ConditionalRequirement {
  type: 'conditional';
  trigger: {
    field: string;
    condition: 'equals' | 'exists' | 'greater_than';
    value: any;
  };
  requires: string[];
  recommends: string[];
  message: string;
}

export type ScopedConditionalRequirement = ConditionalRequirement & ScopedConstraint;

export const CONDITIONAL_REQUIREMENTS: ConditionalRequirement[] = [
  {
    type: 'conditional',
    trigger: { field: 'video.skip', condition: 'equals', value: 1 },
    requires: [],
    recommends: ['video.skipmin', 'video.skipafter'],
    message: 'skipmin and skipafter are relevant when skip=1',
  },
  {
    type: 'conditional',
    trigger: { field: 'pmp.private_auction', condition: 'equals', value: 1 },
    requires: ['pmp.deals'],
    recommends: [],
    message: 'deals[] required when private_auction=1',
  },
  {
    type: 'conditional',
    trigger: { field: 'regs.gdpr', condition: 'equals', value: 1 },
    requires: [],
    recommends: ['user.consent'],
    message: 'user.consent (TCF string) recommended when gdpr=1',
  },
  {
    type: 'conditional',
    trigger: { field: 'video.poddur', condition: 'exists', value: true },
    requires: ['video.maxseq'],
    recommends: ['video.mincpmpersec'],
    message: 'maxseq required and mincpmpersec recommended for dynamic pods',
  },
  {
    type: 'conditional',
    trigger: { field: 'audio.poddur', condition: 'exists', value: true },
    requires: ['audio.maxseq'],
    recommends: ['audio.mincpmpersec'],
    message: 'maxseq required and mincpmpersec recommended for dynamic pods',
  },
  {
    type: 'conditional',
    trigger: { field: 'geo.type', condition: 'equals', value: 1 },
    requires: [],
    recommends: ['geo.accuracy'],
    message: 'accuracy recommended for GPS-sourced location (type=1)',
  },
  {
    type: 'conditional',
    trigger: { field: 'device.sua', condition: 'exists', value: true },
    requires: [],
    recommends: [],
    message: 'Prefer sua over ua when Client Hints available (ua may be frozen)',
  },
];

/**
 * Scoped conditional requirements - constraints that apply to specific nested objects.
 * These use relative field paths within their scope.
 */
export const SCOPED_CONDITIONAL_REQUIREMENTS: ScopedConditionalRequirement[] = [
  // Device geo-scoped
  {
    type: 'conditional',
    scope: 'device.geo',
    trigger: { field: 'type', condition: 'equals', value: 1 },
    requires: [],
    recommends: ['accuracy'],
    message: 'accuracy recommended for GPS-sourced location (type=1)',
  },
  // User geo-scoped
  {
    type: 'conditional',
    scope: 'user.geo',
    trigger: { field: 'type', condition: 'equals', value: 1 },
    requires: [],
    recommends: ['accuracy'],
    message: 'accuracy recommended for GPS-sourced location (type=1)',
  },
];

// ============================================================================
// FORMAT-SPECIFIC REQUIREMENTS
// ============================================================================

export interface FormatRequirement {
  type: 'format_specific';
  format: 'banner' | 'video' | 'audio' | 'native';
  required: string[];
  recommended: string[];
}

export const FORMAT_REQUIREMENTS: FormatRequirement[] = [
  {
    type: 'format_specific',
    format: 'banner',
    required: [],
    recommended: ['format', 'w', 'h'],
  },
  {
    type: 'format_specific',
    format: 'video',
    required: ['mimes'],
    recommended: ['minduration', 'maxduration', 'protocols', 'w', 'h', 'startdelay'],
  },
  {
    type: 'format_specific',
    format: 'audio',
    required: ['mimes'],
    recommended: ['minduration', 'maxduration', 'protocols', 'startdelay', 'poddur'],
  },
  {
    type: 'format_specific',
    format: 'native',
    required: ['request'],
    recommended: ['ver'],
  },
];

// ============================================================================
// DEPRECATED FIELDS
// ============================================================================

export const DEPRECATED_FIELDS = [
  { field: 'video.sequence', replacement: 'podid/slotinpod', message: 'Use podid and slotinpod instead of sequence' },
  { field: 'audio.sequence', replacement: 'podid/slotinpod', message: 'Use podid and slotinpod instead of sequence' },
  { field: 'user.yob', replacement: null, message: 'Deprecated for privacy reasons' },
  { field: 'user.gender', replacement: null, message: 'Deprecated for privacy reasons' },
  { field: 'device.didsha1', replacement: null, message: 'All hashed device IDs are deprecated' },
  { field: 'device.didmd5', replacement: null, message: 'All hashed device IDs are deprecated' },
  { field: 'device.dpidsha1', replacement: null, message: 'All hashed device IDs are deprecated' },
  { field: 'device.dpidmd5', replacement: null, message: 'All hashed device IDs are deprecated' },
  { field: 'device.macsha1', replacement: null, message: 'All hashed device IDs are deprecated' },
  { field: 'device.macmd5', replacement: null, message: 'All hashed device IDs are deprecated' },
] as const;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export type Constraint = MutualExclusion | ConditionalRequirement | FormatRequirement;

export const ALL_CONSTRAINTS: Constraint[] = [
  ...MUTUAL_EXCLUSIONS,
  ...CONDITIONAL_REQUIREMENTS,
  ...FORMAT_REQUIREMENTS,
];

/**
 * Check if a field has a value (exists and is not empty)
 */
export function fieldHasValue(obj: any, path: string): boolean {
  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return false;
    }
    current = current[part];
  }

  if (current === null || current === undefined) {
    return false;
  }

  // Check for empty arrays
  if (Array.isArray(current) && current.length === 0) {
    return false;
  }

  // Check for empty strings
  if (typeof current === 'string' && current.trim() === '') {
    return false;
  }

  return true;
}

/**
 * Get the value at a nested path
 */
export function getFieldValue(obj: any, path: string): any {
  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[part];
  }

  return current;
}

/**
 * Check mutual exclusion constraint
 */
export function checkMutualExclusion(obj: any, constraint: MutualExclusion): { valid: boolean; message: string } | null {
  const presentFields = constraint.fields.filter(field => {
    // Handle compound fields like "video.minduration+video.maxduration"
    if (field.includes('+')) {
      const subFields = field.split('+');
      return subFields.every(sf => fieldHasValue(obj, sf));
    }
    return fieldHasValue(obj, field);
  });

  if (presentFields.length > 1) {
    return {
      valid: false,
      message: constraint.message,
    };
  }

  return null;
}

/**
 * Check conditional requirement
 */
export function checkConditionalRequirement(
  obj: any,
  constraint: ConditionalRequirement
): { missing: string[]; recommended: string[]; message: string } | null {
  const { trigger, requires, recommends, message } = constraint;
  const fieldValue = getFieldValue(obj, trigger.field);

  let triggered = false;
  switch (trigger.condition) {
    case 'equals':
      triggered = fieldValue === trigger.value;
      break;
    case 'exists':
      triggered = fieldHasValue(obj, trigger.field);
      break;
    case 'greater_than':
      triggered = typeof fieldValue === 'number' && fieldValue > trigger.value;
      break;
  }

  if (!triggered) {
    return null;
  }

  const missingRequired = requires.filter(field => !fieldHasValue(obj, field));
  const missingRecommended = recommends.filter(field => !fieldHasValue(obj, field));

  if (missingRequired.length > 0 || missingRecommended.length > 0) {
    return {
      missing: missingRequired,
      recommended: missingRecommended,
      message,
    };
  }

  return null;
}

/**
 * Check mutual exclusion within a scoped object.
 * Returns null if valid, or error with full path context.
 */
export function checkScopedMutualExclusion(
  root: any,
  constraint: ScopedMutualExclusion
): { message: string; severity: 'error' | 'warning' } | null {
  // Resolve the scope path to get the target object
  const scopeObj = constraint.scope ? getFieldValue(root, constraint.scope) : root;

  if (!scopeObj) {
    // Scope object doesn't exist, constraint is vacuously satisfied
    return null;
  }

  // Check if multiple fields have values within the scope
  const presentFields = constraint.fields.filter(field => {
    if (field.includes('+')) {
      return field.split('+').every(sf => fieldHasValue(scopeObj, sf));
    }
    return fieldHasValue(scopeObj, field);
  });

  if (presentFields.length > 1) {
    // Build full path for error message
    const prefix = constraint.scope ? `${constraint.scope}: ` : '';
    return {
      message: `${prefix}${constraint.message}`,
      severity: constraint.severity,
    };
  }

  return null;
}

/**
 * Check conditional requirement within a scoped object.
 * Returns null if valid, or result with full path context.
 */
export function checkScopedConditionalRequirement(
  root: any,
  constraint: ScopedConditionalRequirement
): { message: string; missing: string[]; recommended: string[] } | null {
  // Resolve the scope path to get the target object
  const scopeObj = constraint.scope ? getFieldValue(root, constraint.scope) : root;

  if (!scopeObj) {
    // Scope object doesn't exist, constraint is vacuously satisfied
    return null;
  }

  // Check the trigger condition within the scoped object
  const fieldValue = getFieldValue(scopeObj, constraint.trigger.field);

  let triggered = false;
  switch (constraint.trigger.condition) {
    case 'equals':
      triggered = fieldValue === constraint.trigger.value;
      break;
    case 'exists':
      triggered = fieldHasValue(scopeObj, constraint.trigger.field);
      break;
    case 'greater_than':
      triggered = typeof fieldValue === 'number' && fieldValue > constraint.trigger.value;
      break;
  }

  if (!triggered) {
    return null;
  }

  // Check for missing required and recommended fields within scope
  const missingRequired = constraint.requires.filter(field => !fieldHasValue(scopeObj, field));
  const missingRecommended = constraint.recommends.filter(field => !fieldHasValue(scopeObj, field));

  if (missingRequired.length > 0 || missingRecommended.length > 0) {
    const prefix = constraint.scope ? `${constraint.scope}: ` : '';
    return {
      message: `${prefix}${constraint.message}`,
      missing: missingRequired,
      recommended: missingRecommended,
    };
  }

  return null;
}

/**
 * Check for deprecated field usage in a bid request.
 * Returns warnings for any deprecated fields found.
 */
export function checkDeprecatedFields(
  obj: any,
  deprecatedFields: typeof DEPRECATED_FIELDS
): { field: string; message: string }[] {
  const warnings: { field: string; message: string }[] = [];

  for (const deprecated of deprecatedFields) {
    if (fieldHasValue(obj, deprecated.field)) {
      let msg = `${deprecated.field} is deprecated. ${deprecated.message}`;
      if (deprecated.replacement) {
        msg += ` Use ${deprecated.replacement} instead.`;
      }
      warnings.push({ field: deprecated.field, message: msg });
    }
  }

  return warnings;
}
