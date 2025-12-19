/**
 * Video Ad Generator
 * Creates OpenRTB 2.6 compliant video impression objects
 */

import { Video, Impression } from '../types/openrtb';

export interface VideoParams {
  mimes?: string[];
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
}

/**
 * Determines smart defaults for video dimensions based on device type
 * @param deviceType - OpenRTB device type (1=Mobile/Tablet, 2=PC, 3=CTV, etc.)
 * @returns Object with width and height
 */
function getDefaultVideoDimensions(deviceType?: number): { w: number; h: number } {
  switch (deviceType) {
    case 1: // Mobile/Tablet
      return { w: 640, h: 360 }; // 16:9 mobile standard
    case 3: // Connected TV
      return { w: 1920, h: 1080 }; // Full HD for CTV
    case 2: // Personal Computer
    default:
      return { w: 640, h: 360 }; // Standard web video
  }
}

/**
 * Generates a Video object with OpenRTB 2.6 compliant defaults
 * @param params - Video parameters
 * @param overrides - Optional overrides for all video fields
 * @param deviceType - Optional device type for smart dimension defaults
 * @returns Video object compliant with OpenRTB 2.6
 */
export function generateVideo(
  params: VideoParams = {},
  overrides?: Partial<Video>,
  deviceType?: number
): Video {
  // Get smart defaults for dimensions based on device type
  const defaultDimensions = getDefaultVideoDimensions(deviceType);

  const video: Video = {
    // Required field - common video MIME types
    mimes: params.mimes || ['video/mp4', 'video/webm'],

    // Recommended fields with smart defaults
    minduration: params.minduration !== undefined ? params.minduration : 0,
    maxduration: params.maxduration !== undefined ? params.maxduration : 30,

    // VAST protocols: 2=VAST 2.0, 3=VAST 3.0, 5=VAST 2.0 Wrapper, 6=VAST 3.0 Wrapper
    protocols: params.protocols || [2, 3, 5, 6],

    w: params.w !== undefined ? params.w : defaultDimensions.w,
    h: params.h !== undefined ? params.h : defaultDimensions.h,

    // 0 = pre-roll (most common)
    startdelay: params.startdelay !== undefined ? params.startdelay : 0,

    // Common optional defaults
    plcmt: params.plcmt !== undefined ? params.plcmt : 1, // 1 = Instream (most common)
    linearity: params.linearity !== undefined ? params.linearity : 1, // 1 = linear/in-stream

    // Playback method: 2 = Autoplay sound off (most common for web)
    playbackmethod: params.playbackmethod || [2],

    // Delivery: 1 = streaming (most common)
    delivery: params.delivery || [1],

    // Position: 0 = unknown (safe default)
    pos: params.pos !== undefined ? params.pos : 0,

    // API frameworks: 1=VPAID 1.0, 2=VPAID 2.0, 7=OMID-1
    api: params.api || [1, 2, 7],

    ...overrides
  };

  // Add optional fields only if explicitly provided
  if (params.skip !== undefined) video.skip = params.skip;
  if (params.skipmin !== undefined) video.skipmin = params.skipmin;
  if (params.skipafter !== undefined) video.skipafter = params.skipafter;
  if (params.battr !== undefined) video.battr = params.battr;
  if (params.minbitrate !== undefined) video.minbitrate = params.minbitrate;
  if (params.maxbitrate !== undefined) video.maxbitrate = params.maxbitrate;
  if (params.boxingallowed !== undefined) video.boxingallowed = params.boxingallowed;
  if (params.playbackend !== undefined) video.playbackend = params.playbackend;
  if (params.companiontype !== undefined) video.companiontype = params.companiontype;

  return video;
}

export interface ImpressionOverrides {
  id?: string;
  bidfloor?: number;
  bidfloorcur?: string;
  secure?: number;
  instl?: number;
  tagid?: string;
  video?: Partial<Video>;
}

/**
 * Generates an Impression object with a video
 * @param id - Unique impression ID
 * @param videoParams - Parameters for video generation
 * @param bidfloor - Optional minimum bid floor in CPM
 * @param overrides - Optional overrides for impression fields
 * @param deviceType - Optional device type for smart dimension defaults
 * @returns Impression object with video
 */
export function generateVideoImpression(
  id: string,
  videoParams: VideoParams = {},
  bidfloor: number = 1.0,
  overrides?: ImpressionOverrides,
  deviceType?: number
): Impression {
  const video = generateVideo(videoParams, overrides?.video, deviceType);

  const impression: Impression = {
    id: overrides?.id || id,
    video,
    bidfloor: overrides?.bidfloor !== undefined ? overrides.bidfloor : bidfloor,
    bidfloorcur: overrides?.bidfloorcur || 'USD',
    secure: overrides?.secure !== undefined ? overrides.secure : 1,
    instl: overrides?.instl !== undefined ? overrides.instl : 0 // Not interstitial by default
  };

  // Add optional fields if provided
  if (overrides?.tagid !== undefined) {
    impression.tagid = overrides.tagid;
  }

  return impression;
}
