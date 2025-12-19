// Form state types for bid request customization

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
}

export interface ImpressionFormState {
  id: string;
  mediaType: 'banner' | 'video';
  banner: BannerFormState;
  video: VideoFormState;
  bidfloor: number;
  bidfloorcur: string;
  secure: boolean;
  instl: boolean;
  tagid: string;
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
}

export interface UIFormState {
  expandedSections: string[];
  jsonEditMode: boolean;
  rawJson: string;
  activePreset: string | null;
}

export interface BidRequestFormState {
  site: SiteFormState;
  device: DeviceFormState;
  geo: GeoFormState;
  impressions: ImpressionFormState[];
  auction: AuctionFormState;
  ui: UIFormState;
}
