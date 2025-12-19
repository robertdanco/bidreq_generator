// Form state types for bid request customization
// OpenRTB 2.6 compliant form state types

// ============================================================================
// INVENTORY TYPE
// ============================================================================

export type InventoryType = 'site' | 'app';

// ============================================================================
// SITE AND APP
// ============================================================================

export interface SiteFormState {
  id: string;
  name: string;
  domain: string;
  page: string;
  ref: string;
  cat: string[];
  sectioncat: string[];
  pagecat: string[];
  privacypolicy: boolean;
  mobile: boolean;
  publisher: PublisherFormState;
}

export interface PublisherFormState {
  id: string;
  name: string;
  domain: string;
  cat: string[];
}

export interface AppFormState {
  id: string;
  name: string;
  bundle: string;
  domain: string;
  storeurl: string;
  ver: string;
  cat: string[];
  sectioncat: string[];
  pagecat: string[];
  privacypolicy: boolean;
  paid: boolean;
  publisher: PublisherFormState;
}

// ============================================================================
// DEVICE AND GEO
// ============================================================================

export interface DeviceFormState {
  ua: string;
  devicetype: number;
  ip: string;
  ipv6: string;
  make: string;
  model: string;
  os: string;
  osv: string;
  hwv: string;
  w: number;
  h: number;
  ppi: number;
  pxratio: number;
  js: boolean;
  language: string;
  dnt: boolean;
  lmt: boolean;
  connectiontype: number;
  carrier: string;
  mccmnc: string;
  ifa: string;
}

export interface GeoFormState {
  lat: number | null;
  lon: number | null;
  type: number;
  accuracy: number | null;
  country: string;
  region: string;
  city: string;
  zip: string;
  metro: string;
  utcoffset: number;
}

// ============================================================================
// USER AND DATA
// ============================================================================

export interface UserFormState {
  id: string;
  buyeruid: string;
  keywords: string;
  customdata: string;
  consent: string;
  geo: GeoFormState;
  data: DataFormState[];
  eids: EIDFormState[];
}

export interface DataFormState {
  id: string;
  name: string;
  segment: SegmentFormState[];
}

export interface SegmentFormState {
  id: string;
  name: string;
  value: string;
}

export interface EIDFormState {
  source: string;
  uids: UIDFormState[];
}

export interface UIDFormState {
  id: string;
  atype: number;
}

// ============================================================================
// REGULATIONS
// ============================================================================

export interface RegsFormState {
  coppa: boolean;
  gdpr: boolean;
  us_privacy: string;
}

// ============================================================================
// SOURCE AND SUPPLY CHAIN
// ============================================================================

export interface SourceFormState {
  fd: number;
  tid: string;
  pchain: string;
  schain: SupplyChainFormState | null;
}

export interface SupplyChainFormState {
  complete: boolean;
  ver: string;
  nodes: SupplyChainNodeFormState[];
}

export interface SupplyChainNodeFormState {
  asi: string;
  sid: string;
  rid: string;
  name: string;
  domain: string;
  hp: boolean;
}

// ============================================================================
// IMPRESSION OBJECTS
// ============================================================================

export interface FormatSize {
  w: number;
  h: number;
}

export interface BannerFormState {
  w: number;
  h: number;
  format: FormatSize[];
  pos: number;
  api: number[];
  mimes: string[];
  battr: number[];
  btype: number[];
}

export interface VideoFormState {
  mimes: string[];
  minduration: number;
  maxduration: number;
  protocols: number[];
  w: number;
  h: number;
  startdelay: number;
  plcmt: number;
  linearity: number;
  skip: boolean;
  skipmin: number;
  skipafter: number;
  playbackmethod: number[];
  delivery: number[];
  pos: number;
  api: number[];
  battr: number[];
  minbitrate: number | null;
  maxbitrate: number | null;
  boxingallowed: boolean;
  playbackend: number;
  // Pod fields
  poddur: number | null;
  podid: string;
  podseq: number;
  slotinpod: number;
  mincpmpersec: number | null;
  maxseq: number | null;
  maxextended: number | null;
  rqddurs: number[];
}

export interface AudioFormState {
  mimes: string[];
  minduration: number;
  maxduration: number;
  protocols: number[];
  startdelay: number;
  battr: number[];
  minbitrate: number | null;
  maxbitrate: number | null;
  delivery: number[];
  api: number[];
  companiontype: number[];
  // Audio-specific
  feed: number;
  stitched: boolean;
  nvol: number;
  // Pod fields
  poddur: number | null;
  podid: string;
  podseq: number;
  slotinpod: number;
  mincpmpersec: number | null;
  maxseq: number | null;
  maxextended: number | null;
  rqddurs: number[];
}

// ============================================================================
// PRIVATE MARKETPLACE
// ============================================================================

export interface PmpFormState {
  enabled: boolean;
  private_auction: boolean;
  deals: DealFormState[];
}

export interface DealFormState {
  id: string;
  bidfloor: number;
  bidfloorcur: string;
  at: number;
  wseat: string[];
  wadomain: string[];
}

export type MediaType = 'banner' | 'video' | 'audio';

export interface ImpressionFormState {
  id: string;
  mediaType: MediaType;
  banner: BannerFormState;
  video: VideoFormState;
  audio: AudioFormState;
  pmp: PmpFormState;
  bidfloor: number;
  bidfloorcur: string;
  secure: boolean;
  instl: boolean;
  tagid: string;
  displaymanager: string;
  displaymanagerver: string;
  rwdd: boolean;
  ssai: number;
  exp: number | null;
}

export interface AuctionFormState {
  test: boolean;
  at: number;
  tmax: number;
  cur: string[];
  allimps: boolean;
  bcat: string[];
  badv: string[];
  bapp: string[];
  wseat: string[];
  bseat: string[];
  wlang: string[];
  cattax: number;
}

export interface UIFormState {
  expandedSections: string[];
  jsonEditMode: boolean;
  rawJson: string;
  activePreset: string | null;
}

// ============================================================================
// ROOT FORM STATE
// ============================================================================

export interface BidRequestFormState {
  // Inventory type selector (site XOR app)
  inventoryType: InventoryType;
  site: SiteFormState;
  app: AppFormState;
  device: DeviceFormState;
  geo: GeoFormState;
  user: UserFormState;
  regs: RegsFormState;
  source: SourceFormState;
  impressions: ImpressionFormState[];
  auction: AuctionFormState;
  ui: UIFormState;
}
