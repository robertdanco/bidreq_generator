/**
 * Banner Ad Generator
 * Creates OpenRTB 2.6 compliant banner impression objects
 */

import { Banner, Impression, Format } from '../types/openrtb';

export interface BannerParams {
  width: number;
  height: number;
  pos?: number;
  secure?: number;
  format?: Format[];
  api?: number[];
  mimes?: string[];
  battr?: number[];
  btype?: number[];
  wmin?: number;
  hmin?: number;
  wmax?: number;
  hmax?: number;
}

/**
 * Generates a Banner object with the specified dimensions
 * @param params - Banner parameters including width and height
 * @param overrides - Optional overrides for all banner fields
 * @returns Banner object compliant with OpenRTB 2.6
 */
export function generateBanner(params: BannerParams, overrides?: Partial<Banner>): Banner {
  const { width, height, pos = 0, secure = 1 } = params;

  // Create format array with the primary size
  const defaultFormat: Format[] = [{ w: width, h: height }];

  // Common banner sizes - add related sizes if the primary size matches standard IAB sizes
  const standardSizes: Record<string, Format[]> = {
    '300x250': [
      { w: 300, h: 250 },
      { w: 300, h: 600 } // Medium Rectangle often paired with Half Page
    ],
    '728x90': [
      { w: 728, h: 90 },
      { w: 970, h: 90 } // Leaderboard often paired with Super Leaderboard
    ],
    '320x50': [
      { w: 320, h: 50 },
      { w: 320, h: 100 } // Mobile Banner often paired with Large Mobile Banner
    ],
    '160x600': [
      { w: 160, h: 600 },
      { w: 120, h: 600 } // Wide Skyscraper and Skyscraper
    ]
  };

  const sizeKey = `${width}x${height}`;
  const relatedFormats = standardSizes[sizeKey];

  const banner: Banner = {
    w: width,
    h: height,
    format: params.format || relatedFormats || defaultFormat,
    pos: params.pos !== undefined ? params.pos : pos,
    // API frameworks supported (MRAID-1, MRAID-2, MRAID-3, OMID-1)
    api: params.api || [5, 6, 7, 13],
    // Common MIME types for banner ads
    mimes: params.mimes || ['image/jpeg', 'image/png', 'image/gif', 'application/javascript', 'text/html'],
    ...overrides
  };

  // Add optional fields if provided
  if (params.battr !== undefined) banner.battr = params.battr;
  if (params.btype !== undefined) banner.btype = params.btype;
  if (params.wmin !== undefined) banner.wmin = params.wmin;
  if (params.hmin !== undefined) banner.hmin = params.hmin;
  if (params.wmax !== undefined) banner.wmax = params.wmax;
  if (params.hmax !== undefined) banner.hmax = params.hmax;

  return banner;
}

export interface ImpressionOverrides {
  id?: string;
  bidfloor?: number;
  bidfloorcur?: string;
  secure?: number;
  instl?: number;
  tagid?: string;
  displaymanager?: string;
  displaymanagerver?: string;
  banner?: Partial<Banner>;
}

/**
 * Generates an Impression object with a banner
 * @param id - Unique impression ID
 * @param bannerParams - Parameters for banner generation
 * @param bidfloor - Optional minimum bid floor in CPM
 * @param overrides - Optional overrides for impression fields
 * @returns Impression object with banner
 */
export function generateBannerImpression(
  id: string,
  bannerParams: BannerParams,
  bidfloor: number = 0.5,
  overrides?: ImpressionOverrides
): Impression {
  const banner = generateBanner(bannerParams, overrides?.banner);

  const impression: Impression = {
    id: overrides?.id || id,
    banner,
    bidfloor: overrides?.bidfloor !== undefined ? overrides.bidfloor : bidfloor,
    bidfloorcur: overrides?.bidfloorcur || 'USD',
    secure: overrides?.secure !== undefined ? overrides.secure : (bannerParams.secure ?? 1),
    instl: overrides?.instl !== undefined ? overrides.instl : 0 // Not interstitial by default
  };

  // Add optional fields if provided
  if (overrides?.tagid !== undefined) {
    impression.tagid = overrides.tagid;
  }
  if (overrides?.displaymanager !== undefined) {
    impression.displaymanager = overrides.displaymanager;
  }
  if (overrides?.displaymanagerver !== undefined) {
    impression.displaymanagerver = overrides.displaymanagerver;
  }

  return impression;
}
