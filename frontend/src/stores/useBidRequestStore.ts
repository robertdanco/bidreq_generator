import { create } from 'zustand';
import type {
  BidRequestFormState,
  SiteFormState,
  AppFormState,
  DeviceFormState,
  GeoFormState,
  UserFormState,
  RegsFormState,
  SourceFormState,
  ImpressionFormState,
  AuctionFormState,
  BannerFormState,
  VideoFormState,
  AudioFormState,
  PmpFormState,
  FormatSize,
  InventoryType,
  MediaType,
} from '../types/formState';
import { getPresetById } from '../constants/presets';

// Helper utilities for toApiPayload transformation
// Converts empty arrays to undefined to keep payload clean
const omitEmpty = <T>(arr: T[]): T[] | undefined => (arr.length > 0 ? arr : undefined);
// Converts empty/blank strings to undefined
const omitBlank = (str: string): string | undefined => (str ? str : undefined);

// Default values
const defaultSite: SiteFormState = {
  id: '',
  name: '',
  domain: 'example.com',
  page: 'https://example.com/page.html',
  ref: '',
  cat: [],
  sectioncat: [],
  pagecat: [],
  privacypolicy: true,
  mobile: false,
  publisher: {
    id: '',
    name: '',
    domain: '',
    cat: [],
  },
};

const defaultDevice: DeviceFormState = {
  ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  devicetype: 2,
  ip: '73.158.64.100',
  ipv6: '',
  make: 'Apple',
  model: '',
  os: 'macOS',
  osv: '10.15.7',
  hwv: '',
  w: 1920,
  h: 1080,
  ppi: 96,
  pxratio: 2.0,
  js: true,
  language: 'en',
  dnt: false,
  lmt: false,
  connectiontype: 2,
  carrier: '',
  mccmnc: '',
  ifa: '',
};

const defaultGeo: GeoFormState = {
  lat: 37.7749,
  lon: -122.4194,
  type: 2,
  accuracy: null,
  country: 'USA',
  region: 'CA',
  city: 'San Francisco',
  zip: '94102',
  metro: '807',
  utcoffset: -480,
};

const defaultApp: AppFormState = {
  id: '',
  name: '',
  bundle: 'com.example.app',
  domain: 'example.com',
  storeurl: '',
  ver: '',
  cat: [],
  sectioncat: [],
  pagecat: [],
  privacypolicy: true,
  paid: false,
  publisher: {
    id: '',
    name: '',
    domain: '',
    cat: [],
  },
};

const defaultUser: UserFormState = {
  id: '',
  buyeruid: '',
  keywords: '',
  customdata: '',
  consent: '',
  geo: { ...defaultGeo },
  data: [],
  eids: [],
};

const defaultRegs: RegsFormState = {
  coppa: false,
  gdpr: false,
  us_privacy: '',
};

const defaultSource: SourceFormState = {
  fd: 0,
  tid: '',
  pchain: '',
  schain: null,
};

const defaultBanner: BannerFormState = {
  w: 300,
  h: 250,
  format: [{ w: 300, h: 250 }],
  pos: 1,
  api: [5, 6, 7],
  mimes: ['image/jpeg', 'image/png', 'image/gif', 'text/html', 'application/javascript'],
  battr: [],
  btype: [],
};

const defaultVideo: VideoFormState = {
  mimes: ['video/mp4', 'video/webm'],
  minduration: 0,
  maxduration: 30,
  protocols: [2, 3, 5, 6],
  w: 640,
  h: 360,
  startdelay: 0,
  plcmt: 1,
  linearity: 1,
  skip: false,
  skipmin: 0,
  skipafter: 0,
  playbackmethod: [2],
  delivery: [1, 2],
  pos: 0,
  api: [],
  battr: [],
  minbitrate: null,
  maxbitrate: null,
  boxingallowed: true,
  playbackend: 1,
  // Pod fields
  poddur: null,
  podid: '',
  podseq: 0,
  slotinpod: 0,
  mincpmpersec: null,
  maxseq: null,
  maxextended: null,
  rqddurs: [],
};

const defaultAudio: AudioFormState = {
  mimes: ['audio/mp4', 'audio/mpeg', 'audio/ogg'],
  minduration: 0,
  maxduration: 30,
  protocols: [2, 3, 9, 10],
  startdelay: 0,
  battr: [],
  minbitrate: null,
  maxbitrate: null,
  delivery: [1],
  api: [7],
  companiontype: [],
  // Audio-specific
  feed: 1,
  stitched: false,
  nvol: 0,
  // Pod fields
  poddur: null,
  podid: '',
  podseq: 0,
  slotinpod: 0,
  mincpmpersec: null,
  maxseq: null,
  maxextended: null,
  rqddurs: [],
};

const defaultPmp: PmpFormState = {
  enabled: false,
  private_auction: false,
  deals: [],
};

const createDefaultImpression = (id: string = '1'): ImpressionFormState => ({
  id,
  mediaType: 'banner',
  banner: { ...defaultBanner, format: [{ w: 300, h: 250 }] },
  video: { ...defaultVideo },
  audio: { ...defaultAudio },
  pmp: { ...defaultPmp },
  bidfloor: 0.5,
  bidfloorcur: 'USD',
  secure: true,
  instl: false,
  tagid: '',
  displaymanager: '',
  displaymanagerver: '',
  rwdd: false,
  ssai: 0,
  exp: null,
});

const defaultAuction: AuctionFormState = {
  test: false,
  at: 1,
  tmax: 200,
  cur: ['USD'],
  allimps: false,
  bcat: [],
  badv: [],
  bapp: [],
  wseat: [],
  bseat: [],
  wlang: [],
  cattax: 1,
};

const defaultUI = {
  expandedSections: ['site', 'impressions'],
  jsonEditMode: false,
  rawJson: '',
  activePreset: null,
};

const getDefaultState = (): BidRequestFormState => ({
  inventoryType: 'site',
  site: { ...defaultSite, publisher: { ...defaultSite.publisher } },
  app: { ...defaultApp, publisher: { ...defaultApp.publisher } },
  device: { ...defaultDevice },
  geo: { ...defaultGeo },
  user: { ...defaultUser, geo: { ...defaultGeo }, data: [], eids: [] },
  regs: { ...defaultRegs },
  source: { ...defaultSource },
  impressions: [createDefaultImpression('1')],
  auction: { ...defaultAuction, cur: ['USD'], bcat: [], badv: [], bapp: [], wseat: [], bseat: [], wlang: [] },
  ui: { ...defaultUI, expandedSections: ['site', 'impressions'] },
});

interface BidRequestStore extends BidRequestFormState {
  // Inventory type actions
  setInventoryType: (type: InventoryType) => void;

  // Site actions
  updateSite: (updates: Partial<SiteFormState>) => void;
  updatePublisher: (updates: Partial<SiteFormState['publisher']>) => void;

  // App actions
  updateApp: (updates: Partial<AppFormState>) => void;
  updateAppPublisher: (updates: Partial<AppFormState['publisher']>) => void;

  // Device actions
  updateDevice: (updates: Partial<DeviceFormState>) => void;

  // Geo actions
  updateGeo: (updates: Partial<GeoFormState>) => void;

  // User actions
  updateUser: (updates: Partial<UserFormState>) => void;

  // Regs actions
  updateRegs: (updates: Partial<RegsFormState>) => void;

  // Source actions
  updateSource: (updates: Partial<SourceFormState>) => void;

  // Impression actions
  addImpression: () => void;
  removeImpression: (id: string) => void;
  updateImpression: (id: string, updates: Partial<ImpressionFormState>) => void;
  updateBanner: (impId: string, updates: Partial<BannerFormState>) => void;
  updateVideo: (impId: string, updates: Partial<VideoFormState>) => void;
  updateAudio: (impId: string, updates: Partial<AudioFormState>) => void;
  updatePmp: (impId: string, updates: Partial<PmpFormState>) => void;
  setImpressionMediaType: (impId: string, mediaType: MediaType) => void;
  addFormat: (impId: string, format: FormatSize) => void;
  removeFormat: (impId: string, index: number) => void;

  // Auction actions
  updateAuction: (updates: Partial<AuctionFormState>) => void;

  // UI actions
  toggleSection: (sectionId: string) => void;
  setJsonEditMode: (enabled: boolean) => void;
  setRawJson: (json: string) => void;

  // Preset/Reset actions
  loadPreset: (presetId: string) => void;
  resetSection: (sectionId: 'site' | 'app' | 'device' | 'geo' | 'user' | 'regs' | 'source' | 'impressions' | 'auction') => void;
  resetAll: () => void;

  // Import/Export
  importConfig: (json: string) => boolean;
  exportConfig: () => string;

  // Transform to API payload
  toApiPayload: () => object;
}

export const useBidRequestStore = create<BidRequestStore>((set, get) => ({
  ...getDefaultState(),

  // Inventory type actions
  setInventoryType: (type) =>
    set((state) => {
      const currentExpandedSections = state.ui.expandedSections;
      let newExpandedSections = currentExpandedSections;

      // When switching inventory type, sync expansion state between 'site' and 'app'
      if (type === 'site' && currentExpandedSections.includes('app')) {
        // Switching to Site: if App was expanded, expand Site
        newExpandedSections = currentExpandedSections
          .filter((s) => s !== 'app')
          .concat('site');
      } else if (type === 'app' && currentExpandedSections.includes('site')) {
        // Switching to App: if Site was expanded, expand App
        newExpandedSections = currentExpandedSections
          .filter((s) => s !== 'site')
          .concat('app');
      }

      return {
        inventoryType: type,
        ui: { ...state.ui, expandedSections: newExpandedSections },
      };
    }),

  // Site actions
  updateSite: (updates) =>
    set((state) => ({
      site: { ...state.site, ...updates },
    })),

  updatePublisher: (updates) =>
    set((state) => ({
      site: {
        ...state.site,
        publisher: { ...state.site.publisher, ...updates },
      },
    })),

  // App actions
  updateApp: (updates) =>
    set((state) => ({
      app: { ...state.app, ...updates },
    })),

  updateAppPublisher: (updates) =>
    set((state) => ({
      app: {
        ...state.app,
        publisher: { ...state.app.publisher, ...updates },
      },
    })),

  // Device actions
  updateDevice: (updates) =>
    set((state) => ({
      device: { ...state.device, ...updates },
    })),

  // Geo actions
  updateGeo: (updates) =>
    set((state) => ({
      geo: { ...state.geo, ...updates },
    })),

  // User actions
  updateUser: (updates) =>
    set((state) => ({
      user: { ...state.user, ...updates },
    })),

  // Regs actions
  updateRegs: (updates) =>
    set((state) => ({
      regs: { ...state.regs, ...updates },
    })),

  // Source actions
  updateSource: (updates) =>
    set((state) => ({
      source: { ...state.source, ...updates },
    })),

  // Impression actions
  addImpression: () =>
    set((state) => {
      // Use max ID + 1 to avoid duplicates after removals
      const maxId = Math.max(0, ...state.impressions.map((imp) => parseInt(imp.id) || 0));
      const newId = String(maxId + 1);
      return {
        impressions: [...state.impressions, createDefaultImpression(newId)],
      };
    }),

  removeImpression: (id) =>
    set((state) => ({
      impressions: state.impressions.filter((imp) => imp.id !== id),
    })),

  updateImpression: (id, updates) =>
    set((state) => ({
      impressions: state.impressions.map((imp) =>
        imp.id === id ? { ...imp, ...updates } : imp
      ),
    })),

  updateBanner: (impId, updates) =>
    set((state) => ({
      impressions: state.impressions.map((imp) =>
        imp.id === impId
          ? { ...imp, banner: { ...imp.banner, ...updates } }
          : imp
      ),
    })),

  updateVideo: (impId, updates) =>
    set((state) => ({
      impressions: state.impressions.map((imp) =>
        imp.id === impId
          ? { ...imp, video: { ...imp.video, ...updates } }
          : imp
      ),
    })),

  updateAudio: (impId, updates) =>
    set((state) => ({
      impressions: state.impressions.map((imp) =>
        imp.id === impId
          ? { ...imp, audio: { ...imp.audio, ...updates } }
          : imp
      ),
    })),

  updatePmp: (impId, updates) =>
    set((state) => ({
      impressions: state.impressions.map((imp) =>
        imp.id === impId
          ? { ...imp, pmp: { ...imp.pmp, ...updates } }
          : imp
      ),
    })),

  setImpressionMediaType: (impId, mediaType) =>
    set((state) => ({
      impressions: state.impressions.map((imp) =>
        imp.id === impId ? { ...imp, mediaType } : imp
      ),
    })),

  addFormat: (impId, format) =>
    set((state) => ({
      impressions: state.impressions.map((imp) =>
        imp.id === impId
          ? { ...imp, banner: { ...imp.banner, format: [...imp.banner.format, format] } }
          : imp
      ),
    })),

  removeFormat: (impId, index) =>
    set((state) => ({
      impressions: state.impressions.map((imp) =>
        imp.id === impId
          ? {
              ...imp,
              banner: {
                ...imp.banner,
                format: imp.banner.format.filter((_, i) => i !== index),
              },
            }
          : imp
      ),
    })),

  // Auction actions
  updateAuction: (updates) =>
    set((state) => ({
      auction: { ...state.auction, ...updates },
    })),

  // UI actions
  toggleSection: (sectionId) =>
    set((state) => {
      const expanded = state.ui.expandedSections.includes(sectionId)
        ? state.ui.expandedSections.filter((s) => s !== sectionId)
        : [...state.ui.expandedSections, sectionId];
      return { ui: { ...state.ui, expandedSections: expanded } };
    }),

  setJsonEditMode: (enabled) =>
    set((state) => ({
      ui: { ...state.ui, jsonEditMode: enabled },
    })),

  setRawJson: (json) =>
    set((state) => ({
      ui: { ...state.ui, rawJson: json },
    })),

  // Preset/Reset actions
  loadPreset: (presetId) => {
    const preset = getPresetById(presetId);
    if (!preset) return;

    set((state) => {
      const newState = { ...state };
      if (preset.state.device) {
        newState.device = { ...state.device, ...preset.state.device };
      }
      if (preset.state.geo) {
        newState.geo = { ...state.geo, ...preset.state.geo };
      }
      if (preset.state.impressions) {
        newState.impressions = preset.state.impressions.map((imp) => ({
          ...createDefaultImpression(imp.id),
          ...imp,
          banner: { ...defaultBanner, ...imp.banner },
          video: { ...defaultVideo, ...imp.video },
          audio: { ...defaultAudio, ...imp.audio },
          pmp: { ...defaultPmp, ...imp.pmp },
        }));
      }
      if (preset.state.auction) {
        newState.auction = { ...state.auction, ...preset.state.auction };
      }
      newState.ui = { ...state.ui, activePreset: presetId };
      return newState;
    });
  },

  resetSection: (sectionId) =>
    set((state) => {
      switch (sectionId) {
        case 'site':
          return { site: { ...defaultSite, publisher: { ...defaultSite.publisher } } };
        case 'app':
          return { app: { ...defaultApp, publisher: { ...defaultApp.publisher } } };
        case 'device':
          return { device: { ...defaultDevice } };
        case 'geo':
          return { geo: { ...defaultGeo } };
        case 'user':
          return { user: { ...defaultUser, geo: { ...defaultGeo }, data: [], eids: [] } };
        case 'regs':
          return { regs: { ...defaultRegs } };
        case 'source':
          return { source: { ...defaultSource } };
        case 'impressions':
          return { impressions: [createDefaultImpression('1')] };
        case 'auction':
          return { auction: { ...defaultAuction, cur: ['USD'], bcat: [], badv: [], bapp: [], wseat: [], bseat: [], wlang: [] } };
        default:
          return state;
      }
    }),

  resetAll: () => set(getDefaultState()),

  // Import/Export
  importConfig: (json) => {
    try {
      const parsed = JSON.parse(json);
      const state = get();

      // Map imported JSON to form state
      const newState: Partial<BidRequestFormState> = {};

      if (parsed.site) {
        newState.site = {
          ...state.site,
          id: parsed.site.id || '',
          name: parsed.site.name || '',
          domain: parsed.site.domain || 'example.com',
          page: parsed.site.page || '',
          ref: parsed.site.ref || '',
          cat: parsed.site.cat || [],
          sectioncat: parsed.site.sectioncat || [],
          pagecat: parsed.site.pagecat || [],
          privacypolicy: parsed.site.privacypolicy === 1,
          mobile: parsed.site.mobile === 1,
          publisher: {
            id: parsed.site.publisher?.id || '',
            name: parsed.site.publisher?.name || '',
            domain: parsed.site.publisher?.domain || '',
            cat: parsed.site.publisher?.cat || [],
          },
        };
      }

      if (parsed.device) {
        newState.device = {
          ...state.device,
          ...parsed.device,
          js: parsed.device.js === 1,
          dnt: parsed.device.dnt === 1,
          lmt: parsed.device.lmt === 1,
        };
      }

      if (parsed.device?.geo) {
        newState.geo = {
          ...state.geo,
          ...parsed.device.geo,
        };
      }

      if (parsed.imp && Array.isArray(parsed.imp)) {
        newState.impressions = parsed.imp.map((imp: any) => ({
          id: imp.id || '1',
          mediaType: imp.audio ? 'audio' : (imp.video ? 'video' : 'banner'),
          banner: {
            w: imp.banner?.w || 300,
            h: imp.banner?.h || 250,
            format: imp.banner?.format || [],
            pos: imp.banner?.pos || 0,
            api: imp.banner?.api || [],
            mimes: imp.banner?.mimes || [],
            battr: imp.banner?.battr || [],
            btype: imp.banner?.btype || [],
          },
          video: {
            mimes: imp.video?.mimes || defaultVideo.mimes,
            minduration: imp.video?.minduration ?? defaultVideo.minduration,
            maxduration: imp.video?.maxduration ?? defaultVideo.maxduration,
            protocols: imp.video?.protocols || defaultVideo.protocols,
            w: imp.video?.w || defaultVideo.w,
            h: imp.video?.h || defaultVideo.h,
            startdelay: imp.video?.startdelay ?? defaultVideo.startdelay,
            plcmt: imp.video?.plcmt || defaultVideo.plcmt,
            linearity: imp.video?.linearity || defaultVideo.linearity,
            skip: imp.video?.skip === 1,
            skipmin: imp.video?.skipmin ?? defaultVideo.skipmin,
            skipafter: imp.video?.skipafter ?? defaultVideo.skipafter,
            playbackmethod: imp.video?.playbackmethod || defaultVideo.playbackmethod,
            delivery: imp.video?.delivery || defaultVideo.delivery,
            pos: imp.video?.pos ?? defaultVideo.pos,
            api: imp.video?.api || defaultVideo.api,
            battr: imp.video?.battr || defaultVideo.battr,
            minbitrate: imp.video?.minbitrate ?? null,
            maxbitrate: imp.video?.maxbitrate ?? null,
            boxingallowed: imp.video?.boxingallowed !== 0,
            playbackend: imp.video?.playbackend || defaultVideo.playbackend,
            poddur: imp.video?.poddur ?? null,
            podid: imp.video?.podid || '',
            podseq: imp.video?.podseq ?? 0,
            slotinpod: imp.video?.slotinpod ?? 0,
            mincpmpersec: imp.video?.mincpmpersec ?? null,
            maxseq: imp.video?.maxseq ?? null,
            maxextended: imp.video?.maxextended ?? null,
            rqddurs: imp.video?.rqddurs || [],
          },
          audio: {
            mimes: imp.audio?.mimes || defaultAudio.mimes,
            minduration: imp.audio?.minduration ?? defaultAudio.minduration,
            maxduration: imp.audio?.maxduration ?? defaultAudio.maxduration,
            protocols: imp.audio?.protocols || defaultAudio.protocols,
            startdelay: imp.audio?.startdelay ?? defaultAudio.startdelay,
            battr: imp.audio?.battr || defaultAudio.battr,
            minbitrate: imp.audio?.minbitrate ?? null,
            maxbitrate: imp.audio?.maxbitrate ?? null,
            delivery: imp.audio?.delivery || defaultAudio.delivery,
            api: imp.audio?.api || defaultAudio.api,
            companiontype: imp.audio?.companiontype || [],
            feed: imp.audio?.feed ?? 1,
            stitched: imp.audio?.stitched === 1,
            nvol: imp.audio?.nvol ?? 0,
            poddur: imp.audio?.poddur ?? null,
            podid: imp.audio?.podid || '',
            podseq: imp.audio?.podseq ?? 0,
            slotinpod: imp.audio?.slotinpod ?? 0,
            mincpmpersec: imp.audio?.mincpmpersec ?? null,
            maxseq: imp.audio?.maxseq ?? null,
            maxextended: imp.audio?.maxextended ?? null,
            rqddurs: imp.audio?.rqddurs || [],
          },
          pmp: {
            enabled: !!imp.pmp,
            private_auction: imp.pmp?.private_auction === 1,
            deals: imp.pmp?.deals || [],
          },
          bidfloor: imp.bidfloor || 0,
          bidfloorcur: imp.bidfloorcur || 'USD',
          secure: imp.secure === 1,
          instl: imp.instl === 1,
          tagid: imp.tagid || '',
          displaymanager: imp.displaymanager || '',
          displaymanagerver: imp.displaymanagerver || '',
          rwdd: imp.rwdd === 1,
          ssai: imp.ssai ?? 0,
          exp: imp.exp ?? null,
        }));
      }

      newState.auction = {
        test: parsed.test === 1,
        at: parsed.at || 1,
        tmax: parsed.tmax || 200,
        cur: parsed.cur || ['USD'],
        allimps: parsed.allimps === 1,
        bcat: parsed.bcat || [],
        badv: parsed.badv || [],
        bapp: parsed.bapp || [],
        wseat: parsed.wseat || [],
        bseat: parsed.bseat || [],
        wlang: parsed.wlang || [],
        cattax: parsed.cattax || 1,
      };

      set(newState);
      return true;
    } catch (e) {
      console.error('Failed to import config:', e);
      return false;
    }
  },

  exportConfig: () => {
    const state = get();
    return JSON.stringify(state.toApiPayload(), null, 2);
  },

  // Transform to API payload
  toApiPayload: () => {
    const state = get();

    // Build base payload
    const payload: Record<string, unknown> = {
      domain: state.inventoryType === 'site' ? state.site.domain : state.app.domain,
      page: state.inventoryType === 'site' ? state.site.page : undefined,
      inventoryType: state.inventoryType,
    };

    // Site XOR App (mutually exclusive per OpenRTB 2.6)
    if (state.inventoryType === 'site') {
      payload.site = {
        id: omitBlank(state.site.id),
        name: state.site.name || state.site.domain,
        ref: omitBlank(state.site.ref),
        cat: omitEmpty(state.site.cat),
        sectioncat: omitEmpty(state.site.sectioncat),
        pagecat: omitEmpty(state.site.pagecat),
        privacypolicy: state.site.privacypolicy ? 1 : 0,
        mobile: state.site.mobile ? 1 : 0,
        publisher: {
          id: omitBlank(state.site.publisher.id),
          name: state.site.publisher.name || state.site.domain,
          domain: state.site.publisher.domain || state.site.domain,
          cat: omitEmpty(state.site.publisher.cat),
        },
      };
    } else {
      payload.app = {
        id: omitBlank(state.app.id),
        name: omitBlank(state.app.name),
        bundle: omitBlank(state.app.bundle),
        domain: omitBlank(state.app.domain),
        storeurl: omitBlank(state.app.storeurl),
        ver: omitBlank(state.app.ver),
        cat: omitEmpty(state.app.cat),
        sectioncat: omitEmpty(state.app.sectioncat),
        pagecat: omitEmpty(state.app.pagecat),
        privacypolicy: state.app.privacypolicy ? 1 : 0,
        paid: state.app.paid ? 1 : 0,
        publisher: {
          id: omitBlank(state.app.publisher.id),
          name: omitBlank(state.app.publisher.name),
          domain: omitBlank(state.app.publisher.domain),
          cat: omitEmpty(state.app.publisher.cat),
        },
      };
    }

    // Device
    payload.device = {
      ua: state.device.ua,
      devicetype: state.device.devicetype,
      ip: state.device.ip || undefined,
      ipv6: state.device.ipv6 || undefined,
      make: state.device.make || undefined,
      model: state.device.model || undefined,
      os: state.device.os,
      osv: state.device.osv,
      hwv: state.device.hwv || undefined,
      w: state.device.w,
      h: state.device.h,
      ppi: state.device.ppi || undefined,
      pxratio: state.device.pxratio,
      js: state.device.js ? 1 : 0,
      language: state.device.language,
      dnt: state.device.dnt ? 1 : 0,
      lmt: state.device.lmt ? 1 : 0,
      connectiontype: state.device.connectiontype || undefined,
      carrier: state.device.carrier || undefined,
      mccmnc: state.device.mccmnc || undefined,
      ifa: state.device.ifa || undefined,
    };

    // Geo
    payload.geo = {
      lat: state.geo.lat ?? undefined,
      lon: state.geo.lon ?? undefined,
      type: state.geo.type,
      accuracy: state.geo.accuracy ?? undefined,
      country: state.geo.country,
      region: state.geo.region || undefined,
      city: state.geo.city,
      zip: state.geo.zip || undefined,
      metro: state.geo.metro || undefined,
      utcoffset: state.geo.utcoffset,
    };

    // User (only include if there's meaningful data)
    const hasUserData = state.user.id || state.user.buyeruid || state.user.keywords ||
      state.user.customdata || state.user.consent ||
      state.user.data.length > 0 || state.user.eids.length > 0;
    if (hasUserData) {
      payload.user = {
        id: state.user.id || undefined,
        buyeruid: state.user.buyeruid || undefined,
        keywords: state.user.keywords || undefined,
        customdata: state.user.customdata || undefined,
        consent: state.user.consent || undefined,
        data: state.user.data.length > 0 ? state.user.data.map(d => ({
          id: d.id || undefined,
          name: d.name || undefined,
          segment: d.segment.length > 0 ? d.segment.map(s => ({
            id: s.id || undefined,
            name: s.name || undefined,
            value: s.value || undefined,
          })) : undefined,
        })) : undefined,
        eids: state.user.eids.length > 0 ? state.user.eids.map(e => ({
          source: e.source,
          uids: e.uids.map(u => ({
            id: u.id,
            atype: u.atype,
          })),
        })) : undefined,
      };
    }

    // Regs (only include if there's meaningful data)
    const hasRegsData = state.regs.coppa || state.regs.gdpr || state.regs.us_privacy;
    if (hasRegsData) {
      payload.regs = {
        coppa: state.regs.coppa ? 1 : 0,
        gdpr: state.regs.gdpr ? 1 : 0,
        us_privacy: state.regs.us_privacy || undefined,
      };
    }

    // Source (only include if there's meaningful data)
    const hasSourceData = state.source.tid || state.source.pchain || state.source.schain;
    if (hasSourceData) {
      // Filter out invalid schain nodes (must have required asi and sid fields)
      const validSchainNodes = state.source.schain?.nodes.filter((n) => n.asi && n.sid) || [];

      payload.source = {
        fd: state.source.fd || undefined,
        tid: state.source.tid || undefined,
        pchain: state.source.pchain || undefined,
        schain: state.source.schain && validSchainNodes.length > 0 ? {
          complete: state.source.schain.complete ? 1 : 0,
          ver: state.source.schain.ver,
          nodes: validSchainNodes.map((n) => ({
            asi: n.asi,
            sid: n.sid,
            rid: n.rid || undefined,
            name: n.name || undefined,
            domain: n.domain || undefined,
            hp: n.hp ? 1 : 0,
          })),
        } : undefined,
      };
    }

    // Impressions
    payload.impressions = state.impressions.map((imp) => {
      const base: Record<string, unknown> = {
        id: imp.id,
        bidfloor: imp.bidfloor,
        bidfloorcur: imp.bidfloorcur,
        secure: imp.secure ? 1 : 0,
        instl: imp.instl ? 1 : 0,
        tagid: imp.tagid || undefined,
        displaymanager: imp.displaymanager || undefined,
        displaymanagerver: imp.displaymanagerver || undefined,
        rwdd: imp.rwdd ? 1 : 0,
        ssai: imp.ssai || undefined,
        exp: imp.exp ?? undefined,
      };

      // PMP (only include if enabled)
      if (imp.pmp.enabled) {
        base.pmp = {
          private_auction: imp.pmp.private_auction ? 1 : 0,
          deals: omitEmpty(imp.pmp.deals.map(d => ({
            id: d.id,
            bidfloor: d.bidfloor,
            bidfloorcur: d.bidfloorcur,
            at: d.at,
            wseat: omitEmpty(d.wseat),
            wadomain: omitEmpty(d.wadomain),
          }))),
        };
      }

      if (imp.mediaType === 'video') {
        return {
          ...base,
          video: {
            mimes: omitEmpty(imp.video.mimes),
            minduration: imp.video.minduration,
            maxduration: imp.video.maxduration,
            protocols: omitEmpty(imp.video.protocols),
            w: imp.video.w,
            h: imp.video.h,
            startdelay: imp.video.startdelay,
            plcmt: imp.video.plcmt,
            linearity: imp.video.linearity,
            skip: imp.video.skip ? 1 : 0,
            skipmin: imp.video.skip && imp.video.skipmin ? imp.video.skipmin : undefined,
            skipafter: imp.video.skip && imp.video.skipafter ? imp.video.skipafter : undefined,
            playbackmethod: omitEmpty(imp.video.playbackmethod),
            delivery: omitEmpty(imp.video.delivery),
            pos: imp.video.pos,
            api: omitEmpty(imp.video.api),
            battr: omitEmpty(imp.video.battr),
            minbitrate: imp.video.minbitrate ?? undefined,
            maxbitrate: imp.video.maxbitrate ?? undefined,
            boxingallowed: imp.video.boxingallowed ? 1 : 0,
            playbackend: imp.video.playbackend,
            // Pod fields
            poddur: imp.video.poddur ?? undefined,
            podid: omitBlank(imp.video.podid),
            podseq: imp.video.podseq || undefined,
            slotinpod: imp.video.slotinpod || undefined,
            mincpmpersec: imp.video.mincpmpersec ?? undefined,
            maxseq: imp.video.maxseq ?? undefined,
            maxextended: imp.video.maxextended ?? undefined,
            rqddurs: omitEmpty(imp.video.rqddurs),
          },
        };
      } else if (imp.mediaType === 'audio') {
        return {
          ...base,
          audio: {
            mimes: omitEmpty(imp.audio.mimes),
            minduration: imp.audio.minduration,
            maxduration: imp.audio.maxduration,
            protocols: omitEmpty(imp.audio.protocols),
            startdelay: imp.audio.startdelay,
            battr: omitEmpty(imp.audio.battr),
            minbitrate: imp.audio.minbitrate ?? undefined,
            maxbitrate: imp.audio.maxbitrate ?? undefined,
            delivery: omitEmpty(imp.audio.delivery),
            api: omitEmpty(imp.audio.api),
            companiontype: omitEmpty(imp.audio.companiontype),
            feed: imp.audio.feed,
            stitched: imp.audio.stitched ? 1 : 0,
            nvol: imp.audio.nvol,
            // Pod fields
            poddur: imp.audio.poddur ?? undefined,
            podid: omitBlank(imp.audio.podid),
            podseq: imp.audio.podseq || undefined,
            slotinpod: imp.audio.slotinpod || undefined,
            mincpmpersec: imp.audio.mincpmpersec ?? undefined,
            maxseq: imp.audio.maxseq ?? undefined,
            maxextended: imp.audio.maxextended ?? undefined,
            rqddurs: omitEmpty(imp.audio.rqddurs),
          },
        };
      } else {
        // Banner
        return {
          ...base,
          banner: {
            w: imp.banner.w,
            h: imp.banner.h,
            format: omitEmpty(imp.banner.format),
            pos: imp.banner.pos,
            api: omitEmpty(imp.banner.api),
            mimes: omitEmpty(imp.banner.mimes),
            battr: omitEmpty(imp.banner.battr),
            btype: omitEmpty(imp.banner.btype),
          },
        };
      }
    });

    // Auction settings
    payload.test = state.auction.test ? 1 : 0;
    payload.at = state.auction.at;
    payload.tmax = state.auction.tmax;
    payload.cur = state.auction.cur;
    payload.allimps = state.auction.allimps ? 1 : 0;
    if (state.auction.bcat.length > 0) payload.bcat = state.auction.bcat;
    if (state.auction.badv.length > 0) payload.badv = state.auction.badv;
    if (state.auction.bapp.length > 0) payload.bapp = state.auction.bapp;
    // wseat XOR bseat (mutually exclusive)
    if (state.auction.wseat.length > 0) {
      payload.wseat = state.auction.wseat;
    } else if (state.auction.bseat.length > 0) {
      payload.bseat = state.auction.bseat;
    }
    if (state.auction.wlang.length > 0) payload.wlang = state.auction.wlang;
    if (state.auction.cattax !== 1) payload.cattax = state.auction.cattax;

    return payload;
  },
}));
