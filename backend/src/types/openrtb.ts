/**
 * OpenRTB 2.6 Type Definitions (MVP Subset)
 * Focus: Banner ads with Site context
 * Reference: https://www.iab.com/wp-content/uploads/2016/03/OpenRTB-API-Specification-Version-2-6-final.pdf
 */

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
  app?: any;

  /** Details via a Device object about the user's device */
  device?: Device;

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

  /** Blocked advertiser categories using IAB content categories */
  bcat?: string[];

  /** Block list of advertisers by their domains */
  badv?: string[];

  /** Block list of applications by their bundle or package names */
  bapp?: string[];
}

/**
 * Impression represents an ad placement or impression being auctioned
 * Required fields: id, and one of banner/video/audio/native
 */
export interface Impression {
  /** Unique ID of the impression within this bid request */
  id: string;

  /** Banner object if this impression is offered as a banner ad opportunity */
  banner?: Banner;

  /** Video object if this impression is offered as a video ad opportunity */
  video?: Video;

  /** Audio object if this impression is offered as an audio ad opportunity */
  audio?: any;

  /** Native object if this impression is offered as a native ad opportunity */
  native?: any;

  /** Minimum bid for this impression expressed in CPM */
  bidfloor?: number;

  /** Currency for bid floor using ISO-4217 alpha codes, default USD */
  bidfloorcur?: string;

  /** Flag to indicate if the impression requires secure HTTPS URL creative assets (0 = no, 1 = yes) */
  secure?: number;

  /** Array of creative attributes that are blocked */
  battr?: number[];

  /** Name of ad mediation partner, SDK technology, or player responsible for rendering ad */
  displaymanager?: string;

  /** Version of ad mediation partner, SDK technology, or player */
  displaymanagerver?: string;

  /** Whether the ad is interstitial or full screen (0 = no, 1 = yes) */
  instl?: number;

  /** Identifier for specific ad placement or ad tag */
  tagid?: string;
}

/**
 * Banner represents the most general type of impression
 */
export interface Banner {
  /** Width of the impression in pixels (recommended for interstitial) */
  w?: number;

  /** Height of the impression in pixels (recommended for interstitial) */
  h?: number;

  /** Array of format objects representing the banner sizes permitted */
  format?: Format[];

  /** Ad position on screen (0 = Unknown, 1 = Above the Fold, 3 = Below the Fold, etc.) */
  pos?: number;

  /** Blocked creative attributes (see OpenRTB spec Table 5.3) */
  battr?: number[];

  /** List of supported API frameworks (1 = VPAID 1.0, 2 = VPAID 2.0, etc.) */
  api?: number[];

  /** Unique identifier for this banner object */
  id?: string;

  /** Blocked creative types (see OpenRTB spec Table 5.2) */
  btype?: number[];

  /** Minimum width in device independent pixels */
  wmin?: number;

  /** Minimum height in device independent pixels */
  hmin?: number;

  /** Maximum width in device independent pixels */
  wmax?: number;

  /** Maximum height in device independent pixels */
  hmax?: number;

  /** Whitelist of content MIME types supported */
  mimes?: string[];
}

/**
 * Format represents an allowed size for a banner
 */
export interface Format {
  /** Width in device independent pixels */
  w: number;

  /** Height in device independent pixels */
  h: number;
}

/**
 * Video represents a video ad impression opportunity
 * Compliant with OpenRTB 2.6 specification
 */
export interface Video {
  /** Content MIME types supported (e.g., "video/mp4", "video/webm") - REQUIRED */
  mimes: string[];

  /** Minimum video ad duration in seconds */
  minduration?: number;

  /** Maximum video ad duration in seconds */
  maxduration?: number;

  /** Array of supported video protocols (1=VAST 1.0, 2=VAST 2.0, 3=VAST 3.0, etc.) */
  protocols?: number[];

  /** Width of the video player in device independent pixels */
  w?: number;

  /** Height of the video player in device independent pixels */
  h?: number;

  /** Start delay in seconds for pre-roll, mid-roll, or post-roll ad placements (0=pre-roll, -1=generic mid-roll, -2=generic post-roll) */
  startdelay?: number;

  /** Placement type for the video (NEW in OpenRTB 2.6, replaces deprecated placement field) */
  plcmt?: number;

  /** Linearity mode (1=linear/in-stream, 2=non-linear/overlay) */
  linearity?: number;

  /** Indicates if the player will allow the video to be skipped (0=no, 1=yes) */
  skip?: number;

  /** Videos of total duration greater than this number of seconds can be skippable (only applicable if skip=1) */
  skipmin?: number;

  /** Number of seconds a video must play before skip control is made available (only applicable if skip=1) */
  skipafter?: number;

  /** Playback methods that may be in use (1=Autoplay sound on, 2=Autoplay sound off, 3=Click-to-play, 4=Mouse-over, 5=Viewport sound on, 6=Viewport sound off) */
  playbackmethod?: number[];

  /** Supported delivery methods (1=streaming, 2=progressive, 3=download) */
  delivery?: number[];

  /** Ad position on screen (0=Unknown, 1=Above the Fold, 3=Below the Fold, etc.) */
  pos?: number;

  /** List of supported API frameworks for this impression (1=VPAID 1.0, 2=VPAID 2.0, 3=MRAID-1, etc.) */
  api?: number[];

  /** Blocked creative attributes (see OpenRTB spec Table 5.3) */
  battr?: number[];

  /** Minimum bit rate in Kbps */
  minbitrate?: number;

  /** Maximum bit rate in Kbps */
  maxbitrate?: number;

  /** Indicates if letter-boxing of 4:3 content into a 16:9 window is allowed (0=no, 1=yes, default 1) */
  boxingallowed?: number;

  /** The event that causes playback to end (1=completion, 2=leaving viewport/fullscreen, 3=leaving viewport) */
  playbackend?: number;

  /** Array of Banner objects if companion ads are available */
  companionad?: Banner[];

  /** Supported companion ad types (1=Static Resource, 2=HTML Resource, 3=iframe Resource) */
  companiontype?: number[];
}

/**
 * Site represents a website
 * Should be included when the ad supported content is a website
 */
export interface Site {
  /** Exchange-specific site ID */
  id?: string;

  /** Site name (may be masked at publisher's request) */
  name?: string;

  /** Domain of the site (e.g., "mysite.foo.com") */
  domain?: string;

  /** Array of IAB content categories of the site (see OpenRTB spec Table 5.1) */
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

  /** Details about the Publisher of the site */
  publisher?: Publisher;

  /** Indicates if the site has a privacy policy (0 = no, 1 = yes) */
  privacypolicy?: number;

  /** Mobile-optimized signal (0 = no, 1 = yes) */
  mobile?: number;
}

/**
 * Publisher represents the publisher of the site or app
 */
export interface Publisher {
  /** Exchange-specific publisher ID */
  id?: string;

  /** Publisher name (may be masked at publisher's request) */
  name?: string;

  /** Array of IAB content categories that describe the publisher */
  cat?: string[];

  /** Highest level domain of the publisher (e.g., "publisher.com") */
  domain?: string;
}

/**
 * Device represents the device the ad will be delivered to
 */
export interface Device {
  /** Browser user agent string */
  ua?: string;

  /** Location of the device using Geo object */
  geo?: Geo;

  /** Standard "Do Not Track" flag (0 = tracking unrestricted, 1 = tracking restricted) */
  dnt?: number;

  /** "Limit Ad Tracking" signal (0 = tracking unrestricted, 1 = tracking must be limited) */
  lmt?: number;

  /** IPv4 address closest to device */
  ip?: string;

  /** IPv6 address closest to device */
  ipv6?: string;

  /** Device type (1 = Mobile/Tablet, 2 = Personal Computer, 3 = Connected TV, etc.) */
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

  /** Physical width of the screen in pixels */
  w?: number;

  /** Physical height of the screen in pixels */
  h?: number;

  /** Screen size as pixels per linear inch */
  ppi?: number;

  /** The ratio of physical pixels to device independent pixels */
  pxratio?: number;

  /** Support for JavaScript (0 = no, 1 = yes) */
  js?: number;

  /** Indicates if the geolocation API will be available (0 = no, 1 = yes) */
  geofetch?: number;

  /** Browser language using ISO-639-1-alpha-2 */
  language?: string;

  /** Carrier or ISP (e.g., "VERIZON") */
  carrier?: string;

  /** Mobile carrier as the concatenated MCC-MNC code */
  mccmnc?: string;

  /** Network connection type (0 = unknown, 1 = Ethernet, 2 = WIFI, etc.) */
  connectiontype?: number;

  /** ID sanctioned for advertiser use in the clear */
  ifa?: string;

  /** Hardware device ID (e.g., IMEI); hashed via SHA1 */
  didsha1?: string;

  /** Hardware device ID (e.g., IMEI); hashed via MD5 */
  didmd5?: string;

  /** Platform device ID (e.g., Android ID); hashed via SHA1 */
  dpidsha1?: string;

  /** Platform device ID (e.g., Android ID); hashed via MD5 */
  dpidmd5?: string;
}

/**
 * Geo represents the geographic location of the device
 */
export interface Geo {
  /** Latitude from -90.0 to +90.0, where negative is south */
  lat?: number;

  /** Longitude from -180.0 to +180.0, where negative is west */
  lon?: number;

  /** Source of location data (1 = GPS/Location Services, 2 = IP Address, 3 = User provided) */
  type?: number;

  /** Estimated location accuracy in meters (recommended when lat/lon are specified) */
  accuracy?: number;

  /** Number of seconds since this geolocation fix was established */
  lastfix?: number;

  /** Service or provider used to determine geolocation from IP address if applicable */
  ipservice?: number;

  /** Country code using ISO-3166-1-alpha-3 */
  country?: string;

  /** Region code using ISO-3166-2 */
  region?: string;

  /** Region of a country using FIPS 10-4 notation */
  regionfips104?: string;

  /** Google metro code (similar to Nielsen DMAs) */
  metro?: string;

  /** City using United Nations Code for Trade & Transport Locations */
  city?: string;

  /** Zip or postal code */
  zip?: string;

  /** Local time of day in the format HHmm */
  utcoffset?: number;
}

/**
 * BidRequestParams - API input parameters for generating bid requests
 * Supports full OpenRTB 2.6 customization while maintaining backward compatibility
 */
export interface BidRequestParams {
  // Required fields for backward compatibility
  domain: string;
  page: string;

  // Site overrides (all optional - use defaults if not provided)
  site?: {
    id?: string;
    name?: string;
    ref?: string;
    cat?: string[];
    sectioncat?: string[];
    pagecat?: string[];
    privacypolicy?: number;
    mobile?: number;
    publisher?: {
      id?: string;
      name?: string;
      domain?: string;
      cat?: string[];
    };
  };

  // Device overrides (all optional)
  device?: {
    ua?: string;
    devicetype?: number;
    ip?: string;
    ipv6?: string;
    make?: string;
    model?: string;
    os?: string;
    osv?: string;
    hwv?: string;
    w?: number;
    h?: number;
    ppi?: number;
    pxratio?: number;
    js?: number;
    language?: string;
    dnt?: number;
    lmt?: number;
    connectiontype?: number;
    carrier?: string;
    mccmnc?: string;
    ifa?: string;
  };

  // Geo overrides (all optional)
  geo?: {
    lat?: number;
    lon?: number;
    type?: number;
    accuracy?: number;
    country?: string;
    region?: string;
    city?: string;
    zip?: string;
    metro?: string;
    utcoffset?: number;
  };

  // Impressions array (replaces width/height for advanced usage)
  impressions?: Array<{
    id?: string;
    banner?: {
      w: number;
      h: number;
      format?: Array<{ w: number; h: number }>;
      pos?: number;
      api?: number[];
      mimes?: string[];
      battr?: number[];
      btype?: number[];
      wmin?: number;
      hmin?: number;
      wmax?: number;
      hmax?: number;
    };
    video?: {
      mimes: string[];
      minduration?: number;
      maxduration?: number;
      protocols?: number[];
      w?: number;
      h?: number;
      startdelay?: number;
      plcmt?: number;
      linearity?: number;
      skip?: number;
      skipmin?: number;
      skipafter?: number;
      playbackmethod?: number[];
      delivery?: number[];
      pos?: number;
      api?: number[];
      battr?: number[];
      minbitrate?: number;
      maxbitrate?: number;
      boxingallowed?: number;
      playbackend?: number;
      companiontype?: number[];
    };
    bidfloor?: number;
    bidfloorcur?: string;
    secure?: number;
    instl?: number;
    tagid?: string;
  }>;

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
  bcat?: string[];
  badv?: string[];
  bapp?: string[];

  // Legacy optional fields (for backward compatibility)
  siteName?: string;
  publisherName?: string;
  publisherDomain?: string;
}
