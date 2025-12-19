/**
 * Context Object Generators
 * Creates OpenRTB 2.6 compliant context objects (App, User, Regs, Source, Pmp)
 */

import { v4 as uuidv4 } from 'uuid';
import {
  App,
  User,
  Regs,
  Source,
  Pmp,
  Deal,
  SupplyChain,
  SupplyChainNode,
  Publisher,
  Content,
  Data,
  Segment,
  EID,
  UID,
  Geo
} from '../types/openrtb';

// ============================================================================
// APP GENERATOR
// ============================================================================

export interface AppParams {
  id?: string;
  name?: string;
  bundle?: string;
  domain?: string;
  storeurl?: string;
  cat?: string[];
  sectioncat?: string[];
  pagecat?: string[];
  ver?: string;
  privacypolicy?: number;
  paid?: number;
  keywords?: string;
  kwarray?: string[];
  publisher?: Partial<Publisher>;
  content?: Partial<Content>;
}

/**
 * Generates an App object with OpenRTB 2.6 compliant defaults
 */
export function generateApp(params: AppParams = {}): App {
  const app: App = {
    id: params.id || uuidv4(),
    name: params.name,
    bundle: params.bundle,
    domain: params.domain,
    storeurl: params.storeurl,
    ver: params.ver,
    privacypolicy: params.privacypolicy,
    paid: params.paid
  };

  // Add arrays only if provided
  if (params.cat?.length) app.cat = params.cat;
  if (params.sectioncat?.length) app.sectioncat = params.sectioncat;
  if (params.pagecat?.length) app.pagecat = params.pagecat;

  // Keywords (mutually exclusive)
  if (params.kwarray?.length) {
    app.kwarray = params.kwarray;
  } else if (params.keywords) {
    app.keywords = params.keywords;
  }

  // Publisher
  if (params.publisher) {
    app.publisher = {
      id: params.publisher.id || uuidv4(),
      name: params.publisher.name,
      domain: params.publisher.domain,
      cat: params.publisher.cat
    };
  }

  // Content
  if (params.content) {
    app.content = generateContent(params.content);
  }

  return app;
}

// ============================================================================
// CONTENT GENERATOR
// ============================================================================

/**
 * Generates a Content object
 */
export function generateContent(params: Partial<Content> = {}): Content {
  const content: Content = {};

  if (params.id) content.id = params.id;
  if (params.episode !== undefined) content.episode = params.episode;
  if (params.title) content.title = params.title;
  if (params.series) content.series = params.series;
  if (params.season) content.season = params.season;
  if (params.artist) content.artist = params.artist;
  if (params.genre) content.genre = params.genre;
  if (params.album) content.album = params.album;
  if (params.isrc) content.isrc = params.isrc;
  if (params.url) content.url = params.url;
  if (params.cattax !== undefined) content.cattax = params.cattax;
  if (params.cat?.length) content.cat = params.cat;
  if (params.prodq !== undefined) content.prodq = params.prodq;
  if (params.context !== undefined) content.context = params.context;
  if (params.contentrating) content.contentrating = params.contentrating;
  if (params.userrating) content.userrating = params.userrating;
  if (params.qagmediarating !== undefined) content.qagmediarating = params.qagmediarating;
  if (params.livestream !== undefined) content.livestream = params.livestream;
  if (params.sourcerelationship !== undefined) content.sourcerelationship = params.sourcerelationship;
  if (params.len !== undefined) content.len = params.len;
  if (params.embeddable !== undefined) content.embeddable = params.embeddable;

  // Language (mutually exclusive)
  if (params.langb) {
    content.langb = params.langb;
  } else if (params.language) {
    content.language = params.language;
  }

  // Keywords (mutually exclusive)
  if (params.kwarray?.length) {
    content.kwarray = params.kwarray;
  } else if (params.keywords) {
    content.keywords = params.keywords;
  }

  // Producer
  if (params.producer) {
    content.producer = params.producer;
  }

  // Network and Channel
  if (params.network) content.network = params.network;
  if (params.channel) content.channel = params.channel;

  // Data segments
  if (params.data?.length) content.data = params.data;

  return content;
}

// ============================================================================
// USER GENERATOR
// ============================================================================

export interface UserParams {
  id?: string;
  buyeruid?: string;
  keywords?: string;
  kwarray?: string[];
  customdata?: string;
  geo?: Partial<Geo>;
  consent?: string;
  data?: DataParams[];
  eids?: EIDParams[];
}

export interface DataParams {
  id?: string;
  name?: string;
  segment?: SegmentParams[];
}

export interface SegmentParams {
  id?: string;
  name?: string;
  value?: string;
}

export interface EIDParams {
  source?: string;
  uids?: UIDParams[];
}

export interface UIDParams {
  id?: string;
  atype?: number;
}

/**
 * Generates a User object with OpenRTB 2.6 compliant defaults
 */
export function generateUser(params: UserParams = {}): User {
  const user: User = {};

  if (params.id) user.id = params.id;
  if (params.buyeruid) user.buyeruid = params.buyeruid;
  if (params.customdata) user.customdata = params.customdata;
  if (params.consent) user.consent = params.consent;

  // Keywords (mutually exclusive)
  if (params.kwarray?.length) {
    user.kwarray = params.kwarray;
  } else if (params.keywords) {
    user.keywords = params.keywords;
  }

  // Geo
  if (params.geo) {
    user.geo = params.geo as Geo;
  }

  // Data segments
  if (params.data?.length) {
    user.data = params.data.map(d => ({
      id: d.id,
      name: d.name,
      segment: d.segment?.map(s => ({
        id: s.id,
        name: s.name,
        value: s.value
      }))
    }));
  }

  // Extended IDs
  if (params.eids?.length) {
    user.eids = params.eids.map(e => ({
      source: e.source,
      uids: e.uids?.map(u => ({
        id: u.id,
        atype: u.atype
      }))
    }));
  }

  return user;
}

// ============================================================================
// REGS GENERATOR
// ============================================================================

export interface RegsParams {
  coppa?: number;
  gdpr?: number;
  us_privacy?: string;
}

/**
 * Generates a Regs object for regulatory compliance
 */
export function generateRegs(params: RegsParams = {}): Regs {
  const regs: Regs = {};

  if (params.coppa !== undefined) regs.coppa = params.coppa;
  if (params.gdpr !== undefined) regs.gdpr = params.gdpr;
  if (params.us_privacy) regs.us_privacy = params.us_privacy;

  return regs;
}

// ============================================================================
// SOURCE GENERATOR
// ============================================================================

export interface SourceParams {
  fd?: number;
  tid?: string;
  pchain?: string;
  schain?: SupplyChainParams;
}

export interface SupplyChainParams {
  complete: number;
  ver?: string;
  nodes: SupplyChainNodeParams[];
}

export interface SupplyChainNodeParams {
  asi: string;
  sid: string;
  rid?: string;
  name?: string;
  domain?: string;
  hp?: number;
}

/**
 * Generates a Source object for supply chain transparency
 */
export function generateSource(params: SourceParams = {}): Source {
  const source: Source = {};

  if (params.fd !== undefined) source.fd = params.fd;
  if (params.tid) source.tid = params.tid;
  if (params.pchain) source.pchain = params.pchain;

  // Supply chain
  if (params.schain) {
    source.schain = {
      complete: params.schain.complete,
      ver: params.schain.ver || '1.0',
      nodes: params.schain.nodes.map(n => ({
        asi: n.asi,
        sid: n.sid,
        rid: n.rid,
        name: n.name,
        domain: n.domain,
        hp: n.hp !== undefined ? n.hp : 1
      }))
    };
  }

  return source;
}

// ============================================================================
// PMP GENERATOR
// ============================================================================

export interface PmpParams {
  private_auction?: number;
  deals?: DealParams[];
}

export interface DealParams {
  id: string;
  bidfloor?: number;
  bidfloorcur?: string;
  at?: number;
  wseat?: string[];
  wadomain?: string[];
}

/**
 * Generates a Pmp object for private marketplace deals
 */
export function generatePmp(params: PmpParams = {}): Pmp {
  const pmp: Pmp = {
    private_auction: params.private_auction !== undefined ? params.private_auction : 0
  };

  if (params.deals?.length) {
    pmp.deals = params.deals.map(d => {
      const deal: Deal = {
        id: d.id,
        bidfloor: d.bidfloor !== undefined ? d.bidfloor : 0,
        bidfloorcur: d.bidfloorcur || 'USD'
      };

      if (d.at !== undefined) deal.at = d.at;
      if (d.wseat?.length) deal.wseat = d.wseat;
      if (d.wadomain?.length) deal.wadomain = d.wadomain;

      return deal;
    });
  }

  return pmp;
}
