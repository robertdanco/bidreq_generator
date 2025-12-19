import { create } from 'zustand';
import type {
  BidRequestFormState,
  SiteFormState,
  DeviceFormState,
  GeoFormState,
  ImpressionFormState,
  AuctionFormState,
  BannerFormState,
  VideoFormState,
  FormatSize,
} from '../types/formState';
import { getPresetById } from '../constants/presets';

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
};

const createDefaultImpression = (id: string = '1'): ImpressionFormState => ({
  id,
  mediaType: 'banner',
  banner: { ...defaultBanner, format: [{ w: 300, h: 250 }] },
  video: { ...defaultVideo },
  bidfloor: 0.5,
  bidfloorcur: 'USD',
  secure: true,
  instl: false,
  tagid: '',
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
};

const defaultUI = {
  expandedSections: ['site', 'impressions'],
  jsonEditMode: false,
  rawJson: '',
  activePreset: null,
};

const getDefaultState = (): BidRequestFormState => ({
  site: { ...defaultSite, publisher: { ...defaultSite.publisher } },
  device: { ...defaultDevice },
  geo: { ...defaultGeo },
  impressions: [createDefaultImpression('1')],
  auction: { ...defaultAuction, cur: ['USD'], bcat: [], badv: [], bapp: [] },
  ui: { ...defaultUI, expandedSections: ['site', 'impressions'] },
});

interface BidRequestStore extends BidRequestFormState {
  // Site actions
  updateSite: (updates: Partial<SiteFormState>) => void;
  updatePublisher: (updates: Partial<SiteFormState['publisher']>) => void;

  // Device actions
  updateDevice: (updates: Partial<DeviceFormState>) => void;

  // Geo actions
  updateGeo: (updates: Partial<GeoFormState>) => void;

  // Impression actions
  addImpression: () => void;
  removeImpression: (id: string) => void;
  updateImpression: (id: string, updates: Partial<ImpressionFormState>) => void;
  updateBanner: (impId: string, updates: Partial<BannerFormState>) => void;
  updateVideo: (impId: string, updates: Partial<VideoFormState>) => void;
  setImpressionMediaType: (impId: string, mediaType: 'banner' | 'video') => void;
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
  resetSection: (sectionId: 'site' | 'device' | 'geo' | 'impressions' | 'auction') => void;
  resetAll: () => void;

  // Import/Export
  importConfig: (json: string) => boolean;
  exportConfig: () => string;

  // Transform to API payload
  toApiPayload: () => object;
}

export const useBidRequestStore = create<BidRequestStore>((set, get) => ({
  ...getDefaultState(),

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

  // Impression actions
  addImpression: () =>
    set((state) => {
      const newId = String(state.impressions.length + 1);
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
        case 'device':
          return { device: { ...defaultDevice } };
        case 'geo':
          return { geo: { ...defaultGeo } };
        case 'impressions':
          return { impressions: [createDefaultImpression('1')] };
        case 'auction':
          return { auction: { ...defaultAuction, cur: ['USD'], bcat: [], badv: [], bapp: [] } };
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
          mediaType: imp.video ? 'video' : 'banner',
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
            minduration: imp.video?.minduration || defaultVideo.minduration,
            maxduration: imp.video?.maxduration || defaultVideo.maxduration,
            protocols: imp.video?.protocols || defaultVideo.protocols,
            w: imp.video?.w || defaultVideo.w,
            h: imp.video?.h || defaultVideo.h,
            startdelay: imp.video?.startdelay ?? defaultVideo.startdelay,
            plcmt: imp.video?.plcmt || defaultVideo.plcmt,
            linearity: imp.video?.linearity || defaultVideo.linearity,
            skip: imp.video?.skip === 1,
            skipmin: imp.video?.skipmin || defaultVideo.skipmin,
            skipafter: imp.video?.skipafter || defaultVideo.skipafter,
            playbackmethod: imp.video?.playbackmethod || defaultVideo.playbackmethod,
            delivery: imp.video?.delivery || defaultVideo.delivery,
            pos: imp.video?.pos ?? defaultVideo.pos,
            api: imp.video?.api || defaultVideo.api,
            battr: imp.video?.battr || defaultVideo.battr,
            minbitrate: imp.video?.minbitrate || null,
            maxbitrate: imp.video?.maxbitrate || null,
            boxingallowed: imp.video?.boxingallowed === 1 || defaultVideo.boxingallowed,
            playbackend: imp.video?.playbackend || defaultVideo.playbackend,
          },
          bidfloor: imp.bidfloor || 0,
          bidfloorcur: imp.bidfloorcur || 'USD',
          secure: imp.secure === 1,
          instl: imp.instl === 1,
          tagid: imp.tagid || '',
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

    return {
      domain: state.site.domain,
      page: state.site.page,
      site: {
        id: state.site.id || undefined,
        name: state.site.name || state.site.domain,
        ref: state.site.ref || undefined,
        cat: state.site.cat.length > 0 ? state.site.cat : undefined,
        sectioncat: state.site.sectioncat.length > 0 ? state.site.sectioncat : undefined,
        pagecat: state.site.pagecat.length > 0 ? state.site.pagecat : undefined,
        privacypolicy: state.site.privacypolicy ? 1 : 0,
        mobile: state.site.mobile ? 1 : 0,
        publisher: {
          id: state.site.publisher.id || undefined,
          name: state.site.publisher.name || state.site.domain,
          domain: state.site.publisher.domain || state.site.domain,
          cat: state.site.publisher.cat.length > 0 ? state.site.publisher.cat : undefined,
        },
      },
      device: {
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
      },
      geo: {
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
      },
      impressions: state.impressions.map((imp) => {
        const base = {
          id: imp.id,
          bidfloor: imp.bidfloor,
          bidfloorcur: imp.bidfloorcur,
          secure: imp.secure ? 1 : 0,
          instl: imp.instl ? 1 : 0,
          tagid: imp.tagid || undefined,
        };

        if (imp.mediaType === 'video') {
          return {
            ...base,
            video: {
              mimes: imp.video.mimes.length > 0 ? imp.video.mimes : undefined,
              minduration: imp.video.minduration,
              maxduration: imp.video.maxduration,
              protocols: imp.video.protocols.length > 0 ? imp.video.protocols : undefined,
              w: imp.video.w,
              h: imp.video.h,
              startdelay: imp.video.startdelay,
              plcmt: imp.video.plcmt,
              linearity: imp.video.linearity,
              skip: imp.video.skip ? 1 : 0,
              skipmin: imp.video.skipmin || undefined,
              skipafter: imp.video.skipafter || undefined,
              playbackmethod: imp.video.playbackmethod.length > 0 ? imp.video.playbackmethod : undefined,
              delivery: imp.video.delivery.length > 0 ? imp.video.delivery : undefined,
              pos: imp.video.pos,
              api: imp.video.api.length > 0 ? imp.video.api : undefined,
              battr: imp.video.battr.length > 0 ? imp.video.battr : undefined,
              minbitrate: imp.video.minbitrate ?? undefined,
              maxbitrate: imp.video.maxbitrate ?? undefined,
              boxingallowed: imp.video.boxingallowed ? 1 : 0,
              playbackend: imp.video.playbackend,
            },
          };
        } else {
          return {
            ...base,
            banner: {
              w: imp.banner.w,
              h: imp.banner.h,
              format: imp.banner.format.length > 0 ? imp.banner.format : undefined,
              pos: imp.banner.pos,
              api: imp.banner.api.length > 0 ? imp.banner.api : undefined,
              mimes: imp.banner.mimes.length > 0 ? imp.banner.mimes : undefined,
              battr: imp.banner.battr.length > 0 ? imp.banner.battr : undefined,
              btype: imp.banner.btype.length > 0 ? imp.banner.btype : undefined,
            },
          };
        }
      }),
      test: state.auction.test ? 1 : 0,
      at: state.auction.at,
      tmax: state.auction.tmax,
      cur: state.auction.cur,
      allimps: state.auction.allimps ? 1 : 0,
      bcat: state.auction.bcat.length > 0 ? state.auction.bcat : undefined,
      badv: state.auction.badv.length > 0 ? state.auction.badv : undefined,
      bapp: state.auction.bapp.length > 0 ? state.auction.bapp : undefined,
    };
  },
}));
