/**
 * OpenRTB 2.6 Type Definitions
 * Full specification support for Banner, Video, and Audio
 * Reference: https://www.iab.com/wp-content/uploads/2016/03/OpenRTB-API-Specification-Version-2-6-final.pdf
 */

// ============================================================================
// TOP-LEVEL OBJECTS
// ============================================================================

/**
 * BidRequest represents the top-level bid request object
 * Required fields: id, imp
 */
export interface BidRequest {
  /** Unique ID of the bid request, provided by the exchange */
  id: string;

  /** Array of Imp objects representing the impressions offered (at least 1) */
  imp: Impression[];

  /** Details via a Site object about the publisher's website */
  site?: Site;

  /** Details via an App object about the publisher's app (mobile) */
  app?: App;

  /** Details via a Device object about the user's device */
  device?: Device;

  /** Details via a User object about the human user */
  user?: User;

  /** Indicator of test mode (0 = live, 1 = test), default 0 */
  test?: number;

  /** Auction type (1 = First Price, 2 = Second Price Plus), default 2 */
  at?: number;

  /** Maximum time in milliseconds to submit a bid, default based on exchange */
  tmax?: number;

  /** Array of buyer seats allowed to bid on this impression */
  wseat?: string[];

  /** Block list of buyer seats restricted from bidding */
  bseat?: string[];

  /** Flag to indicate if Exchange can verify that the user IDs are correct, 0 or 1 */
  allimps?: number;

  /** Array of allowed currencies for bids using ISO-4217 alpha codes */
  cur?: string[];

  /** Allowed languages for creatives using ISO-639-1-alpha-2 */
  wlang?: string[];

  /** Allowed languages using IETF BCP 47. Only one of wlang or wlangb. */
  wlangb?: string[];

  /** Blocked advertiser categories using cattax taxonomy */
  bcat?: string[];

  /** Taxonomy for bcat (default: 1 = IAB 1.0) */
  cattax?: number;

  /** Block list of advertisers by their domains */
  badv?: string[];

  /** Block list of applications by their bundle or package names */
  bapp?: string[];

  /** Source object for inventory source and final decision info */
  source?: Source;

  /** Regs object for regulatory conditions (COPPA, GDPR, etc.) */
  regs?: Regs;

  /** Placeholder for exchange-specific extensions */
  ext?: Record<string, unknown>;
}

// ============================================================================
// IMPRESSION OBJECTS
// ============================================================================

/**
 * Impression represents an ad placement or impression being auctioned
 * Required fields: id, and one of banner/video/audio/native
 */
export interface Impression {
  /** Unique ID of the impression within this bid request */
  id: string;

  /** Array of Metric objects for impression insights */
  metric?: Metric[];

  /** Banner object if this impression is offered as a banner ad opportunity */
  banner?: Banner;

  /** Video object if this impression is offered as a video ad opportunity */
  video?: Video;

  /** Audio object if this impression is offered as an audio ad opportunity */
  audio?: Audio;

  /** Native object if this impression is offered as a native ad opportunity */
  native?: Native;

  /** Pmp object for private marketplace deals */
  pmp?: Pmp;

  /** Name of ad mediation partner, SDK technology, or player responsible for rendering ad */
  displaymanager?: string;

  /** Version of ad mediation partner, SDK technology, or player */
  displaymanagerver?: string;

  /** Whether the ad is interstitial or full screen (0 = no, 1 = yes) */
  instl?: number;

  /** Identifier for specific ad placement or ad tag */
  tagid?: string;

  /** Minimum bid for this impression expressed in CPM */
  bidfloor?: number;

  /** Currency for bid floor using ISO-4217 alpha codes, default USD */
  bidfloorcur?: string;

  /** Browser type on click in app. 0 = embedded, 1 = native */
  clickbrowser?: number;

  /** Flag to indicate if the impression requires secure HTTPS URL creative assets (0 = no, 1 = yes) */
  secure?: number;

  /** Supported iframe busters */
  iframebuster?: string[];

  /** Rewarded ad. 0 = no, 1 = yes (default: 0) */
  rwdd?: number;

  /** Server-side ad insertion. 0 = unknown, 1 = all client, 2 = server stitch/client track, 3 = all server */
  ssai?: number;

  /** Seconds between auction and actual impression */
  exp?: number;

  /** Array of creative attributes that are blocked */
  battr?: number[];

  /** Placeholder for exchange-specific extensions */
  ext?: Record<string, unknown>;
}

/**
 * Metric object for impression insights like viewability, CTR
 */
export interface Metric {
  /** Metric type using exchange-curated names */
  type: string;

  /** Metric value. Probabilities must be 0.0-1.0 */
  value: number;

  /** Source of value. 'EXCHANGE' if exchange is source */
  vendor?: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

// ============================================================================
// MEDIA TYPE OBJECTS
// ============================================================================

/**
 * Banner represents the most general type of impression
 */
export interface Banner {
  /** Array of Format objects for permitted sizes. Highly recommended */
  format?: Format[];

  /** Exact width in device independent pixels */
  w?: number;

  /** Exact height in device independent pixels */
  h?: number;

  /** Minimum width in device independent pixels */
  wmin?: number;

  /** Maximum width in device independent pixels */
  wmax?: number;

  /** Minimum height in device independent pixels */
  hmin?: number;

  /** Maximum height in device independent pixels */
  hmax?: number;

  /** Blocked banner types (1=XHTML Text, 2=XHTML Banner, 3=JavaScript, 4=iframe) */
  btype?: number[];

  /** Blocked creative attributes */
  battr?: number[];

  /** Ad position on screen */
  pos?: number;

  /** Supported MIME types (e.g., 'image/jpeg', 'image/gif') */
  mimes?: string[];

  /** Top frame vs iframe. 0 = iframe, 1 = top frame */
  topframe?: number;

  /** Expandable directions */
  expdir?: number[];

  /** Supported API frameworks */
  api?: number[];

  /** Unique identifier for banner. Recommended for companion ads with Video */
  id?: string;

  /** For Video companions. 0 = concurrent, 1 = end-card */
  vcm?: number;

  /** Placeholder for exchange-specific extensions */
  ext?: Record<string, unknown>;
}

/**
 * Format represents an allowed size for a banner
 */
export interface Format {
  /** Width in device independent pixels */
  w?: number;

  /** Height in device independent pixels */
  h?: number;

  /** Relative width for ratio sizing */
  wratio?: number;

  /** Relative height for ratio sizing */
  hratio?: number;

  /** Minimum width in DIPS for ratio sizing */
  wmin?: number;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Video represents a video ad impression opportunity
 * Compliant with OpenRTB 2.6 specification
 */
export interface Video {
  /** Content MIME types supported (e.g., "video/mp4", "video/webm") - REQUIRED */
  mimes: string[];

  /** Minimum video ad duration in seconds. Mutually exclusive with rqddurs */
  minduration?: number;

  /** Maximum video ad duration in seconds. Mutually exclusive with rqddurs */
  maxduration?: number;

  /** Start delay in seconds for pre-roll, mid-roll, or post-roll */
  startdelay?: number;

  /** Max ads in dynamic video ad pod */
  maxseq?: number;

  /** Total seconds for dynamic pod. Required for dynamic portions */
  poddur?: number;

  /** Array of supported video protocols */
  protocols?: number[];

  /** Width of the video player in device independent pixels */
  w?: number;

  /** Height of the video player in device independent pixels */
  h?: number;

  /** Unique ID for video ad pod. Shared across impressions in same pod */
  podid?: string;

  /** Pod sequence in content stream (0=last/unknown, 1=first) */
  podseq?: number;

  /** Precise acceptable durations. Mutually exclusive with min/maxduration */
  rqddurs?: number[];

  /** Video placement type (deprecated, use plcmt) */
  placement?: number;

  /** Placement type for the video (OpenRTB 2.6) */
  plcmt?: number;

  /** Linearity mode (1=linear/in-stream, 2=non-linear/overlay) */
  linearity?: number;

  /** Indicates if the player will allow the video to be skipped (0=no, 1=yes) */
  skip?: number;

  /** Videos > this duration can be skippable (only if skip=1) */
  skipmin?: number;

  /** Seconds before skip enabled (only if skip=1) */
  skipafter?: number;

  /** DEPRECATED. Use podid/slotinpod instead */
  sequence?: number;

  /** Guaranteed slot position in pod (0=any, 1=last, 2=first or last, -1=first) */
  slotinpod?: number;

  /** Minimum CPM per second for dynamic pod pricing */
  mincpmpersec?: number;

  /** Blocked creative attributes */
  battr?: number[];

  /** Max extended duration. 0 = no extension, -1 = unlimited, >0 = seconds */
  maxextended?: number;

  /** Minimum bit rate in Kbps */
  minbitrate?: number;

  /** Maximum bit rate in Kbps */
  maxbitrate?: number;

  /** Allow 4:3 letterboxing into 16:9. 0 = no, 1 = yes (default: 1) */
  boxingallowed?: number;

  /** Playback methods */
  playbackmethod?: number[];

  /** Playback end event */
  playbackend?: number;

  /** Supported delivery methods */
  delivery?: number[];

  /** Ad position on screen */
  pos?: number;

  /** Array of Banner objects for companion ads */
  companionad?: Banner[];

  /** Supported API frameworks */
  api?: number[];

  /** VAST companion types */
  companiontype?: number[];

  /** Placeholder for exchange-specific extensions */
  ext?: Record<string, unknown>;
}

/**
 * Audio represents an audio ad impression opportunity
 * Assumes VAST compliance. Supports companion ads via Banner array.
 */
export interface Audio {
  /** Supported MIME types (e.g., 'audio/mp4') - REQUIRED */
  mimes: string[];

  /** Minimum audio duration in seconds. Mutually exclusive with rqddurs */
  minduration?: number;

  /** Maximum audio duration in seconds. Mutually exclusive with rqddurs */
  maxduration?: number;

  /** Total seconds for dynamic audio pod */
  poddur?: number;

  /** Supported audio protocols */
  protocols?: number[];

  /** Start delay for pre/mid/post-roll */
  startdelay?: number;

  /** Precise acceptable durations. Mutually exclusive with min/maxduration */
  rqddurs?: number[];

  /** Unique ID for audio ad pod */
  podid?: string;

  /** Pod sequence in content stream (default: 0) */
  podseq?: number;

  /** DEPRECATED. Use podid/slotinpod */
  sequence?: number;

  /** Guaranteed slot in pod (default: 0) */
  slotinpod?: number;

  /** Minimum CPM per second for dynamic pod */
  mincpmpersec?: number;

  /** Blocked creative attributes */
  battr?: number[];

  /** Max extended duration */
  maxextended?: number;

  /** Minimum bit rate in Kbps */
  minbitrate?: number;

  /** Maximum bit rate in Kbps */
  maxbitrate?: number;

  /** Delivery methods */
  delivery?: number[];

  /** Array of Banner objects for companions */
  companionad?: Banner[];

  /** Supported API frameworks */
  api?: number[];

  /** Companion ad types */
  companiontype?: number[];

  /** Max ads in ad pod */
  maxseq?: number;

  /** Audio feed type (1=Music, 2=FM/AM, 3=Podcast) */
  feed?: number;

  /** Stitched with content. 0 = no, 1 = yes */
  stitched?: number;

  /** Volume normalization mode */
  nvol?: number;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Native ad impression. Uses Dynamic Native Ads API for request/response structure.
 */
export interface Native {
  /** JSON-encoded request payload per Native Ad Spec - REQUIRED */
  request: string;

  /** Dynamic Native Ads API version. Highly recommended */
  ver?: string;

  /** Supported API frameworks */
  api?: number[];

  /** Blocked creative attributes */
  battr?: number[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

// ============================================================================
// PRIVATE MARKETPLACE OBJECTS
// ============================================================================

/**
 * Pmp - Private marketplace container for direct deals between buyers and sellers
 */
export interface Pmp {
  /** Auction eligibility. 0 = all bids accepted, 1 = restricted to deals (default: 0) */
  private_auction?: number;

  /** Array of Deal objects applicable to this impression */
  deals?: Deal[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Deal - Specific pre-arranged deal between buyer and seller
 */
export interface Deal {
  /** Unique identifier for the direct deal - REQUIRED */
  id: string;

  /** Minimum bid in CPM (default: 0) */
  bidfloor?: number;

  /** Currency using ISO-4217 (default: 'USD') */
  bidfloorcur?: string;

  /** Override auction type. 1 = First, 2 = Second+, 3 = fixed deal price */
  at?: number;

  /** Allowed buyer seats */
  wseat?: string[];

  /** Allowed advertiser domains */
  wadomain?: string[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

// ============================================================================
// INVENTORY CONTEXT OBJECTS
// ============================================================================

/**
 * Site represents a website
 * Should be included when the ad supported content is a website
 * Mutually exclusive with App
 */
export interface Site {
  /** Exchange-specific site ID */
  id?: string;

  /** Site name (may be aliased) */
  name?: string;

  /** Domain of the site (e.g., "mysite.foo.com") */
  domain?: string;

  /** Category taxonomy (default: 1 = IAB 1.0) */
  cattax?: number;

  /** Array of IAB content categories of the site */
  cat?: string[];

  /** Array of IAB content categories that describe the current section */
  sectioncat?: string[];

  /** Array of IAB content categories that describe the current page or view */
  pagecat?: string[];

  /** URL of the page where the impression will be shown */
  page?: string;

  /** Referrer URL that caused navigation to the current page */
  ref?: string;

  /** Search string that caused navigation to the current page */
  search?: string;

  /** Mobile-optimized signal (0 = no, 1 = yes) */
  mobile?: number;

  /** Indicates if the site has a privacy policy (0 = no, 1 = yes) */
  privacypolicy?: number;

  /** Details about the Publisher of the site */
  publisher?: Publisher;

  /** Content object */
  content?: Content;

  /** Comma-separated keywords. Only one of keywords/kwarray */
  keywords?: string;

  /** Array of keywords. Only one of keywords/kwarray */
  kwarray?: string[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * App represents a mobile application
 * Should be included when the ad supported content is an app
 * Mutually exclusive with Site
 */
export interface App {
  /** Exchange-specific app ID */
  id?: string;

  /** App name (may be aliased) */
  name?: string;

  /** App store ID or bundle name */
  bundle?: string;

  /** App domain */
  domain?: string;

  /** App store URL for IQG 2.1 compliance */
  storeurl?: string;

  /** Category taxonomy (default: 1) */
  cattax?: number;

  /** Array of IAB content categories */
  cat?: string[];

  /** Categories for current section */
  sectioncat?: string[];

  /** Categories for current page/view */
  pagecat?: string[];

  /** Application version */
  ver?: string;

  /** Has privacy policy. 0 = no, 1 = yes */
  privacypolicy?: number;

  /** 0 = free, 1 = paid */
  paid?: number;

  /** Publisher object */
  publisher?: Publisher;

  /** Content object */
  content?: Content;

  /** Comma-separated keywords */
  keywords?: string;

  /** Array of keywords */
  kwarray?: string[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Publisher represents the publisher of the site or app
 */
export interface Publisher {
  /** Exchange-specific seller ID. Maps to sellers.json seller_id */
  id?: string;

  /** Seller name (may be aliased) */
  name?: string;

  /** Category taxonomy (default: 1) */
  cattax?: number;

  /** Array of IAB content categories that describe the publisher */
  cat?: string[];

  /** Highest level domain (e.g., 'seller.com') */
  domain?: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Content - Content in which impression appears
 */
export interface Content {
  /** Unique content identifier */
  id?: string;

  /** Episode number */
  episode?: number;

  /** Content title */
  title?: string;

  /** Content series */
  series?: string;

  /** Content season */
  season?: string;

  /** Artist credited */
  artist?: string;

  /** Genre (e.g., rock, pop) */
  genre?: string;

  /** Album for audio */
  album?: string;

  /** International Standard Recording Code (ISO-3901) */
  isrc?: string;

  /** Producer object */
  producer?: Producer;

  /** URL of content */
  url?: string;

  /** Category taxonomy (default: 1) */
  cattax?: number;

  /** IAB content categories */
  cat?: string[];

  /** Production quality */
  prodq?: number;

  /** Content type/context */
  context?: number;

  /** Content rating (e.g., MPAA) */
  contentrating?: string;

  /** User rating */
  userrating?: string;

  /** IQG media rating */
  qagmediarating?: number;

  /** Comma-separated keywords */
  keywords?: string;

  /** Array of keywords */
  kwarray?: string[];

  /** 0 = not live, 1 = live content */
  livestream?: number;

  /** 0 = indirect, 1 = direct */
  sourcerelationship?: number;

  /** Length in seconds for video/audio */
  len?: number;

  /** Language using ISO-639-1-alpha-2 */
  language?: string;

  /** Language using IETF BCP 47 */
  langb?: string;

  /** Embeddable. 0 = no, 1 = yes */
  embeddable?: number;

  /** Array of Data objects */
  data?: Data[];

  /** Network object */
  network?: Network;

  /** Channel object */
  channel?: Channel;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Producer - Content producer (useful when content is syndicated)
 */
export interface Producer {
  /** Producer ID for syndicated content */
  id?: string;

  /** Producer name (e.g., 'Warner Bros') */
  name?: string;

  /** Category taxonomy (default: 1) */
  cattax?: number;

  /** IAB content categories */
  cat?: string[];

  /** Producer domain */
  domain?: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Network - Network the content is on (parent entity of Channel)
 */
export interface Network {
  /** Publisher-assigned unique identifier */
  id?: string;

  /** Network name (e.g., 'ABC') */
  name?: string;

  /** Primary domain (e.g., 'abc.com') */
  domain?: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Channel - Channel the content is on (stream within a brand)
 */
export interface Channel {
  /** Publisher-assigned unique identifier */
  id?: string;

  /** Channel name (e.g., 'WABC-TV') */
  name?: string;

  /** Primary domain (e.g., 'abc7ny.com') */
  domain?: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

// ============================================================================
// DEVICE AND USER OBJECTS
// ============================================================================

/**
 * Device represents the device the ad will be delivered to
 */
export interface Device {
  /** Geo object for device/user location */
  geo?: Geo;

  /** Do Not Track. 0 = unrestricted, 1 = do not track */
  dnt?: number;

  /** Limit Ad Tracking. 0 = unrestricted, 1 = limited */
  lmt?: number;

  /** Browser user agent string */
  ua?: string;

  /** UserAgent object for structured UA (Client Hints) */
  sua?: UserAgent;

  /** IPv4 address closest to device */
  ip?: string;

  /** IPv6 address closest to device */
  ipv6?: string;

  /** Device type */
  devicetype?: number;

  /** Device make (e.g., "Apple") */
  make?: string;

  /** Device model (e.g., "iPhone") */
  model?: string;

  /** Device operating system (e.g., "iOS") */
  os?: string;

  /** Device operating system version (e.g., "3.1.2") */
  osv?: string;

  /** Hardware version of the device (e.g., "5S" for iPhone 5S) */
  hwv?: string;

  /** Physical height of the screen in pixels */
  h?: number;

  /** Physical width of the screen in pixels */
  w?: number;

  /** Screen size as pixels per linear inch */
  ppi?: number;

  /** The ratio of physical pixels to device independent pixels */
  pxratio?: number;

  /** Support for JavaScript (0 = no, 1 = yes) */
  js?: number;

  /** Indicates if the geolocation API will be available (0 = no, 1 = yes) */
  geofetch?: number;

  /** Flash version */
  flashver?: string;

  /** Browser language using ISO-639-1-alpha-2 */
  language?: string;

  /** Browser language using IETF BCP 47 */
  langb?: string;

  /** Carrier or ISP (e.g., "VERIZON") */
  carrier?: string;

  /** Mobile carrier as the concatenated MCC-MNC code */
  mccmnc?: string;

  /** Network connection type */
  connectiontype?: number;

  /** ID sanctioned for advertiser use in the clear */
  ifa?: string;

  /** DEPRECATED. Hardware device ID hashed via SHA1 */
  didsha1?: string;

  /** DEPRECATED. Hardware device ID hashed via MD5 */
  didmd5?: string;

  /** DEPRECATED. Platform device ID hashed via SHA1 */
  dpidsha1?: string;

  /** DEPRECATED. Platform device ID hashed via MD5 */
  dpidmd5?: string;

  /** DEPRECATED. MAC address hashed via SHA1 */
  macsha1?: string;

  /** DEPRECATED. MAC address hashed via MD5 */
  macmd5?: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Geo represents the geographic location
 * Under Device = current location. Under User = home base.
 */
export interface Geo {
  /** Latitude from -90.0 to +90.0, where negative is south */
  lat?: number;

  /** Longitude from -180.0 to +180.0, where negative is west */
  lon?: number;

  /** Location source. Recommended with lat/lon */
  type?: number;

  /** Accuracy in meters. Recommended for device-sourced location */
  accuracy?: number;

  /** Seconds since geolocation fix */
  lastfix?: number;

  /** IP geolocation service */
  ipservice?: number;

  /** Country code using ISO-3166-1-alpha-3 */
  country?: string;

  /** Region code using ISO-3166-2 */
  region?: string;

  /** Region using FIPS 10-4 (withdrawn 2008) */
  regionfips104?: string;

  /** Google metro code */
  metro?: string;

  /** City using UN LOCODE */
  city?: string;

  /** Zip or postal code */
  zip?: string;

  /** Local time offset from UTC in minutes */
  utcoffset?: number;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * UserAgent - Structured user agent from Client Hints
 * Prefer over device.ua if both present
 */
export interface UserAgent {
  /** Browser/software component identifiers */
  browsers?: BrandVersion[];

  /** Execution platform/OS identifier */
  platform?: BrandVersion;

  /** Prefers mobile content. 0 = desktop, 1 = mobile */
  mobile?: number;

  /** Major binary architecture (e.g., 'x86', 'arm') */
  architecture?: string;

  /** Device bitness (e.g., '64') */
  bitness?: string;

  /** Device model */
  model?: string;

  /** Data source (default: 0) */
  source?: number;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * BrandVersion - Identifies browser or platform from User-Agent Client Hints
 */
export interface BrandVersion {
  /** Brand identifier (e.g., 'Chrome', 'Windows') - REQUIRED */
  brand: string;

  /** Version components in descending order (major, minor, micro) */
  version?: string[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * User - Human user of device; the advertising audience
 */
export interface User {
  /** Exchange-specific user ID */
  id?: string;

  /** Buyer-specific user ID */
  buyeruid?: string;

  /** DEPRECATED. Year of birth (4-digit) */
  yob?: number;

  /** DEPRECATED. 'M'=male, 'F'=female, 'O'=other */
  gender?: string;

  /** Keywords, interests, or intent */
  keywords?: string;

  /** Array of keywords */
  kwarray?: string[];

  /** Exchange cookie data in base85 */
  customdata?: string;

  /** Geo object for user's home base */
  geo?: Geo;

  /** Array of Data objects for additional user data */
  data?: Data[];

  /** TCF Consent String for GDPR */
  consent?: string;

  /** Array of EID objects for third-party identifiers */
  eids?: EID[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Data - Additional data about user or content from data providers
 */
export interface Data {
  /** Exchange-specific data provider ID */
  id?: string;

  /** Data provider name */
  name?: string;

  /** Array of Segment objects with data values */
  segment?: Segment[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * Segment - Key-value pairs for specific data units within a Data object
 */
export interface Segment {
  /** Data segment ID */
  id?: string;

  /** Data segment name */
  name?: string;

  /** Data segment value */
  value?: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * EID - Extended identifiers from a single source/technology provider
 */
export interface EID {
  /** Source domain responsible for IDs */
  source?: string;

  /** Array of UID objects */
  uids?: UID[];

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * UID - Single user identifier within extended identifiers
 */
export interface UID {
  /** User identifier */
  id?: string;

  /** Agent type. Highly recommended */
  atype?: number;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

// ============================================================================
// SOURCE AND SUPPLY CHAIN OBJECTS
// ============================================================================

/**
 * Source - Describes nature/behavior of entity that is source of bid request
 * Used for header bidding and upstream decisioning
 */
export interface Source {
  /** Entity responsible for final impression sale decision. 0 = exchange, 1 = upstream source */
  fd?: number;

  /** Transaction ID common across all participants in bid request */
  tid?: string;

  /** Payment ID chain string per TAG Payment ID Protocol v1.0 */
  pchain?: string;

  /** SupplyChain object representing supply chain links */
  schain?: SupplyChain;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * SupplyChain - Set of nodes representing entities in direct payment flow for inventory
 */
export interface SupplyChain {
  /** Chain complete back to inventory owner. 0 = no, 1 = yes - REQUIRED */
  complete: number;

  /** Array of SupplyChainNode objects in chain order - REQUIRED */
  nodes: SupplyChainNode[];

  /** Supply chain spec version (e.g., '1.0') - REQUIRED */
  ver: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

/**
 * SupplyChainNode - Identity of entity participating in supply chain
 */
export interface SupplyChainNode {
  /** Canonical domain of SSP/Exchange/etc. Same as ads.txt - REQUIRED */
  asi: string;

  /** Seller ID within advertising system. Max 64 chars - REQUIRED */
  sid: string;

  /** OpenRTB RequestId from this seller */
  rid?: string;

  /** Company name (omit if in sellers.json) */
  name?: string;

  /** Business domain (omit if in sellers.json) */
  domain?: string;

  /** In payment flow. 1 = yes (always 1 for v1.0) */
  hp?: number;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

// ============================================================================
// REGULATORY OBJECTS
// ============================================================================

/**
 * Regs - Contains legal, governmental, or industry regulations applicable to the request
 */
export interface Regs {
  /** COPPA flag. 0 = no, 1 = yes (subject to COPPA regulations) */
  coppa?: number;

  /** GDPR flag. 0 = No, 1 = Yes, omission = Unknown */
  gdpr?: number;

  /** US Privacy String for consumer privacy signals (CCPA) */
  us_privacy?: string;

  /** Placeholder for extensions */
  ext?: Record<string, unknown>;
}

// ============================================================================
// API INPUT PARAMETERS
// ============================================================================

/**
 * BidRequestParams - API input parameters for generating bid requests
 * Supports full OpenRTB 2.6 customization while maintaining backward compatibility
 */
export interface BidRequestParams {
  // Required fields for backward compatibility
  domain: string;
  page: string;

  // Inventory type selector (site or app)
  inventoryType?: 'site' | 'app';

  // Site overrides (all optional - use defaults if not provided)
  site?: Partial<Site>;

  // App overrides (all optional)
  app?: Partial<App>;

  // Device overrides (all optional)
  device?: Partial<Device>;

  // Geo overrides (all optional)
  geo?: Partial<Geo>;

  // User overrides (all optional)
  user?: Partial<User>;

  // Regulations (all optional)
  regs?: Partial<Regs>;

  // Source/Supply chain (all optional)
  source?: Partial<Source>;

  // Impressions array (replaces width/height for advanced usage)
  impressions?: ImpressionParams[];

  // Legacy single impression (for backward compatibility)
  width?: number;
  height?: number;
  bidfloor?: number;

  // Auction settings
  test?: number | boolean;
  at?: number;
  tmax?: number;
  cur?: string[];
  allimps?: number;
  wlang?: string[];
  wlangb?: string[];
  bcat?: string[];
  cattax?: number;
  badv?: string[];
  bapp?: string[];
  wseat?: string[];
  bseat?: string[];

  // Legacy optional fields (for backward compatibility)
  siteName?: string;
  publisherName?: string;
  publisherDomain?: string;
}

/**
 * ImpressionParams - Parameters for a single impression
 */
export interface ImpressionParams {
  id?: string;

  // Media types
  banner?: Partial<Banner> & { w?: number; h?: number };
  video?: Partial<Video>;
  audio?: Partial<Audio>;

  // Private marketplace
  pmp?: PmpParams;

  // Impression settings
  bidfloor?: number;
  bidfloorcur?: string;
  secure?: number;
  instl?: number;
  tagid?: string;
  displaymanager?: string;
  displaymanagerver?: string;
  clickbrowser?: number;
  rwdd?: number;
  ssai?: number;
  exp?: number;
  battr?: number[];
}

/**
 * PmpParams - Parameters for private marketplace deals
 */
export interface PmpParams {
  private_auction?: number;
  deals?: DealParams[];
}

/**
 * DealParams - Parameters for a single deal
 */
export interface DealParams {
  id: string;
  bidfloor?: number;
  bidfloorcur?: string;
  at?: number;
  wseat?: string[];
  wadomain?: string[];
}
