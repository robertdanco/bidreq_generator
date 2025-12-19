// OpenRTB 2.6 enumeration values

export const DEVICE_TYPES = [
  { value: 1, label: 'Mobile/Tablet' },
  { value: 2, label: 'Personal Computer' },
  { value: 3, label: 'Connected TV' },
  { value: 4, label: 'Phone' },
  { value: 5, label: 'Tablet' },
  { value: 6, label: 'Connected Device' },
  { value: 7, label: 'Set Top Box' },
] as const;

export const AD_POSITIONS = [
  { value: 0, label: 'Unknown' },
  { value: 1, label: 'Above the Fold' },
  { value: 3, label: 'Below the Fold' },
  { value: 4, label: 'Header' },
  { value: 5, label: 'Footer' },
  { value: 6, label: 'Sidebar' },
  { value: 7, label: 'Full Screen' },
] as const;

export const API_FRAMEWORKS = [
  { value: 1, label: 'VPAID 1.0', description: 'Video Player-Ad Interface Definition' },
  { value: 2, label: 'VPAID 2.0', description: 'Video Player-Ad Interface Definition v2' },
  { value: 3, label: 'MRAID 1.0', description: 'Mobile Rich Media Ad Interface' },
  { value: 4, label: 'ORMMA', description: 'Open Rich Media Mobile Advertising' },
  { value: 5, label: 'MRAID 2.0', description: 'Mobile Rich Media Ad Interface v2' },
  { value: 6, label: 'MRAID 3.0', description: 'Mobile Rich Media Ad Interface v3' },
  { value: 7, label: 'OMID 1.0', description: 'Open Measurement Interface Definition' },
] as const;

export const CONNECTION_TYPES = [
  { value: 0, label: 'Unknown' },
  { value: 1, label: 'Ethernet' },
  { value: 2, label: 'WiFi' },
  { value: 3, label: 'Cellular (Unknown)' },
  { value: 4, label: '2G' },
  { value: 5, label: '3G' },
  { value: 6, label: '4G/LTE' },
  { value: 7, label: '5G' },
] as const;

export const GEO_TYPES = [
  { value: 1, label: 'GPS/Location Services' },
  { value: 2, label: 'IP Address' },
  { value: 3, label: 'User Provided' },
] as const;

export const BANNER_MIMES = [
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/png', label: 'PNG' },
  { value: 'image/gif', label: 'GIF' },
  { value: 'image/webp', label: 'WebP' },
  { value: 'text/html', label: 'HTML' },
  { value: 'application/javascript', label: 'JavaScript' },
] as const;

export const IAB_BANNER_SIZES = [
  { w: 300, h: 250, name: 'Medium Rectangle' },
  { w: 728, h: 90, name: 'Leaderboard' },
  { w: 300, h: 600, name: 'Half Page' },
  { w: 320, h: 50, name: 'Mobile Leaderboard' },
  { w: 320, h: 100, name: 'Large Mobile Banner' },
  { w: 160, h: 600, name: 'Wide Skyscraper' },
  { w: 970, h: 250, name: 'Billboard' },
  { w: 970, h: 90, name: 'Super Leaderboard' },
  { w: 336, h: 280, name: 'Large Rectangle' },
  { w: 320, h: 480, name: 'Mobile Interstitial' },
  { w: 300, h: 50, name: 'Mobile Banner' },
  { w: 468, h: 60, name: 'Full Banner' },
  { w: 120, h: 600, name: 'Skyscraper' },
  { w: 250, h: 250, name: 'Square' },
  { w: 200, h: 200, name: 'Small Square' },
] as const;

// Categorized banner sizes for organized display
export const IAB_BANNER_SIZES_GROUPED = {
  standard: {
    label: 'Standard',
    sizes: [
      { w: 300, h: 250, name: 'Med Rect' },
      { w: 336, h: 280, name: 'Lg Rect' },
      { w: 728, h: 90, name: 'Leaderboard' },
      { w: 468, h: 60, name: 'Full Banner' },
      { w: 250, h: 250, name: 'Square' },
      { w: 200, h: 200, name: 'Sm Square' },
    ],
  },
  mobile: {
    label: 'Mobile',
    sizes: [
      { w: 320, h: 50, name: 'Mobile LB' },
      { w: 320, h: 100, name: 'Lg Mobile' },
      { w: 300, h: 50, name: 'Mobile' },
      { w: 320, h: 480, name: 'Interstitial' },
    ],
  },
  highImpact: {
    label: 'High-Impact',
    sizes: [
      { w: 970, h: 250, name: 'Billboard' },
      { w: 970, h: 90, name: 'Super LB' },
      { w: 300, h: 600, name: 'Half Page' },
      { w: 160, h: 600, name: 'Wide Sky' },
      { w: 120, h: 600, name: 'Skyscraper' },
    ],
  },
} as const;

export const CURRENCIES = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
  { value: 'CHF', label: 'Swiss Franc (CHF)' },
  { value: 'CNY', label: 'Chinese Yuan (CNY)' },
  { value: 'INR', label: 'Indian Rupee (INR)' },
  { value: 'BRL', label: 'Brazilian Real (BRL)' },
] as const;

export const AUCTION_TYPES = [
  { value: 1, label: 'First Price' },
  { value: 2, label: 'Second Price' },
] as const;

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ar', label: 'Arabic' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ru', label: 'Russian' },
] as const;

// Creative attribute restrictions
export const BLOCKED_ATTRIBUTES = [
  { value: 1, label: 'Audio (Auto-Play)' },
  { value: 2, label: 'Audio (User-Initiated)' },
  { value: 3, label: 'Expandable (Automatic)' },
  { value: 4, label: 'Expandable (Click-Initiated)' },
  { value: 5, label: 'Expandable (Rollover-Initiated)' },
  { value: 6, label: 'In-Banner Video (Auto-Play)' },
  { value: 7, label: 'In-Banner Video (User-Initiated)' },
  { value: 8, label: 'Pop (e.g., Over, Under, Upon Exit)' },
  { value: 9, label: 'Provocative/Suggestive Imagery' },
  { value: 10, label: 'Shaky/Flashing/Flickering/Extreme Animation' },
  { value: 11, label: 'Surveys' },
  { value: 12, label: 'Text Only' },
  { value: 13, label: 'User Interactive' },
  { value: 14, label: 'Windows Dialog/Alert Style' },
  { value: 15, label: 'Has Audio On/Off Button' },
  { value: 16, label: 'Ad Skippable' },
  { value: 17, label: 'Adobe Flash' },
] as const;

// Banner type restrictions
export const BANNER_TYPES = [
  { value: 1, label: 'XHTML Text Ad' },
  { value: 2, label: 'XHTML Banner Ad' },
  { value: 3, label: 'JavaScript Ad' },
  { value: 4, label: 'iframe' },
] as const;

// Video MIME types
export const VIDEO_MIMES = [
  { value: 'video/mp4', label: 'MP4' },
  { value: 'video/webm', label: 'WebM' },
  { value: 'video/ogg', label: 'Ogg' },
  { value: 'video/x-flv', label: 'FLV' },
  { value: 'video/3gpp', label: '3GPP' },
  { value: 'application/javascript', label: 'VPAID JS' },
] as const;

// Video protocols (VAST versions)
export const VIDEO_PROTOCOLS = [
  { value: 1, label: 'VAST 1.0' },
  { value: 2, label: 'VAST 2.0' },
  { value: 3, label: 'VAST 3.0' },
  { value: 4, label: 'VAST 1.0 Wrapper' },
  { value: 5, label: 'VAST 2.0 Wrapper' },
  { value: 6, label: 'VAST 3.0 Wrapper' },
  { value: 7, label: 'VAST 4.0' },
  { value: 8, label: 'VAST 4.0 Wrapper' },
  { value: 9, label: 'DAAST 1.0' },
  { value: 10, label: 'DAAST 1.0 Wrapper' },
  { value: 11, label: 'VAST 4.1' },
  { value: 12, label: 'VAST 4.1 Wrapper' },
  { value: 13, label: 'VAST 4.2' },
  { value: 14, label: 'VAST 4.2 Wrapper' },
] as const;

// Video placement types (OpenRTB 2.6 plcmt - NEW, replaces deprecated placement)
export const VIDEO_PLCMT_TYPES = [
  { value: 1, label: 'Instream', description: 'Pre-roll, mid-roll, post-roll' },
  { value: 2, label: 'Accompanying Content', description: 'Plays alongside content' },
  { value: 3, label: 'Interstitial', description: 'Full screen between content' },
  { value: 4, label: 'No Content/Standalone', description: 'No content, just video player' },
] as const;

// Video linearity
export const VIDEO_LINEARITY = [
  { value: 1, label: 'Linear/In-Stream', description: 'Video plays before/during/after content' },
  { value: 2, label: 'Non-Linear/Overlay', description: 'Overlay on content' },
] as const;

// Video playback methods
export const VIDEO_PLAYBACK_METHODS = [
  { value: 1, label: 'Auto-Play Sound On' },
  { value: 2, label: 'Auto-Play Sound Off' },
  { value: 3, label: 'Click-to-Play' },
  { value: 4, label: 'Mouse-Over' },
  { value: 5, label: 'Viewport Sound On' },
  { value: 6, label: 'Viewport Sound Off' },
] as const;

// Video delivery methods
export const VIDEO_DELIVERY = [
  { value: 1, label: 'Streaming' },
  { value: 2, label: 'Progressive' },
  { value: 3, label: 'Download' },
] as const;

// Video start delay
export const VIDEO_START_DELAY = [
  { value: 0, label: 'Pre-Roll' },
  { value: -1, label: 'Generic Mid-Roll' },
  { value: -2, label: 'Generic Post-Roll' },
] as const;

// Common video sizes/resolutions
export const VIDEO_SIZES = [
  { w: 640, h: 360, name: '360p (SD)' },
  { w: 640, h: 480, name: '480p (SD)' },
  { w: 1280, h: 720, name: '720p (HD)' },
  { w: 1920, h: 1080, name: '1080p (Full HD)' },
  { w: 3840, h: 2160, name: '4K (Ultra HD)' },
  { w: 300, h: 250, name: 'In-Banner Video' },
  { w: 320, h: 480, name: 'Mobile Vertical' },
] as const;

// Playback end behaviors
export const VIDEO_PLAYBACK_END = [
  { value: 1, label: 'On Video Completion' },
  { value: 2, label: 'When Viewable' },
  { value: 3, label: 'When Leaving Viewport' },
] as const;

// Companion types (shared by video and audio)
export const VIDEO_COMPANION_TYPES = [
  { value: 1, label: 'Static Resource' },
  { value: 2, label: 'HTML Resource' },
  { value: 3, label: 'iframe Resource' },
] as const;

// Alias for audio editors (same values as video companion types per OpenRTB 2.6)
export const COMPANION_TYPES = VIDEO_COMPANION_TYPES;

// ============================================================================
// AUDIO ENUMS
// ============================================================================

// Audio MIME types
export const AUDIO_MIMES = [
  { value: 'audio/mp4', label: 'MP4 Audio' },
  { value: 'audio/mpeg', label: 'MP3' },
  { value: 'audio/ogg', label: 'Ogg Audio' },
  { value: 'audio/wav', label: 'WAV' },
  { value: 'audio/aac', label: 'AAC' },
  { value: 'audio/flac', label: 'FLAC' },
] as const;

// Audio protocols (DAAST and VAST)
export const AUDIO_PROTOCOLS = [
  { value: 1, label: 'VAST 1.0' },
  { value: 2, label: 'VAST 2.0' },
  { value: 3, label: 'VAST 3.0' },
  { value: 4, label: 'VAST 1.0 Wrapper' },
  { value: 5, label: 'VAST 2.0 Wrapper' },
  { value: 6, label: 'VAST 3.0 Wrapper' },
  { value: 7, label: 'VAST 4.0' },
  { value: 8, label: 'VAST 4.0 Wrapper' },
  { value: 9, label: 'DAAST 1.0' },
  { value: 10, label: 'DAAST 1.0 Wrapper' },
  { value: 11, label: 'VAST 4.1' },
  { value: 12, label: 'VAST 4.1 Wrapper' },
] as const;

// Audio feed types
export const AUDIO_FEED_TYPES = [
  { value: 1, label: 'Music Service' },
  { value: 2, label: 'FM/AM Broadcast' },
  { value: 3, label: 'Podcast' },
] as const;

// Audio volume normalization modes
export const AUDIO_VOLUME_NORMALIZATION = [
  { value: 0, label: 'Unknown' },
  { value: 1, label: 'Average Volume' },
  { value: 2, label: 'Peak Volume' },
  { value: 3, label: 'Loudness' },
  { value: 4, label: 'Custom' },
] as const;

// Audio start delay (same as video)
export const AUDIO_START_DELAY = [
  { value: 0, label: 'Pre-Roll' },
  { value: -1, label: 'Generic Mid-Roll' },
  { value: -2, label: 'Generic Post-Roll' },
] as const;

// Audio delivery methods
export const AUDIO_DELIVERY = [
  { value: 1, label: 'Streaming' },
  { value: 2, label: 'Progressive' },
  { value: 3, label: 'Download' },
] as const;

// ============================================================================
// EXTENDED ID (EID) ENUMS
// ============================================================================

// Agent types for EIDs
export const EID_AGENT_TYPES = [
  { value: 1, label: 'Device ID' },
  { value: 2, label: 'Person ID' },
  { value: 3, label: 'User ID' },
  { value: 500, label: 'Publisher Generated' },
  { value: 501, label: 'SSP Generated' },
  { value: 502, label: 'DSP Generated' },
  { value: 503, label: 'ID Vendor Generated' },
] as const;

// Common EID sources
export const EID_SOURCES = [
  { value: 'liveramp.com', label: 'LiveRamp' },
  { value: 'criteo.com', label: 'Criteo' },
  { value: 'id5-sync.com', label: 'ID5' },
  { value: 'sharedid.org', label: 'SharedID' },
  { value: 'uidapi.com', label: 'UID2' },
  { value: 'pubcid.org', label: 'PubCommon ID' },
  { value: 'adserver.org', label: 'Trade Desk' },
] as const;

// ============================================================================
// CATEGORY TAXONOMY ENUMS
// ============================================================================

export const CATEGORY_TAXONOMIES = [
  { value: 1, label: 'IAB Tech Lab Content Category Taxonomy 1.0' },
  { value: 2, label: 'IAB Tech Lab Content Category Taxonomy 2.0' },
  { value: 3, label: 'IAB Tech Lab Ad Product Taxonomy 1.0' },
  { value: 4, label: 'IAB Tech Lab Audience Taxonomy 1.1' },
  { value: 5, label: 'IAB Tech Lab Content Category Taxonomy 2.1' },
  { value: 6, label: 'IAB Tech Lab Content Category Taxonomy 2.2' },
  { value: 7, label: 'IAB Tech Lab Content Category Taxonomy 3.0' },
] as const;

// ============================================================================
// POD/SLOT ENUMS
// ============================================================================

// Pod sequence positions
export const POD_SEQUENCE = [
  { value: 0, label: 'Any/Unknown' },
  { value: 1, label: 'First Pod' },
  { value: 2, label: 'Last Pod' },
  { value: -1, label: 'First or Last Pod' },
] as const;

// Slot in pod positions
export const SLOT_IN_POD = [
  { value: 0, label: 'Any/Unknown' },
  { value: 1, label: 'First Slot' },
  { value: 2, label: 'Last Slot' },
  { value: -1, label: 'First or Last Slot' },
] as const;

// ============================================================================
// FORM CONSTRAINTS
// ============================================================================

// Maximum number of impressions per bid request
// OpenRTB spec has no explicit limit, but we cap at 10 for practical UX reasons
export const MAX_IMPRESSIONS = 10;
