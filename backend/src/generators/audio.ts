/**
 * Audio Ad Generator
 * Creates OpenRTB 2.6 compliant audio impression objects
 */

import { Audio, Impression } from '../types/openrtb';

export interface AudioParams {
  mimes?: string[];
  minduration?: number;
  maxduration?: number;
  protocols?: number[];
  startdelay?: number;
  battr?: number[];
  minbitrate?: number;
  maxbitrate?: number;
  delivery?: number[];
  api?: number[];
  companiontype?: number[];
  maxseq?: number;
  feed?: number;
  stitched?: number;
  nvol?: number;
  // Pod fields
  poddur?: number;
  rqddurs?: number[];
  podid?: string;
  podseq?: number;
  slotinpod?: number;
  mincpmpersec?: number;
  maxextended?: number;
  // Deprecated
  sequence?: number;
}

/**
 * Generates an Audio object with OpenRTB 2.6 compliant defaults
 * @param params - Audio parameters
 * @param overrides - Optional overrides for all audio fields
 * @returns Audio object compliant with OpenRTB 2.6
 */
export function generateAudio(
  params: AudioParams = {},
  overrides?: Partial<Audio>
): Audio {
  const audio: Audio = {
    // Required field - common audio MIME types
    mimes: params.mimes || ['audio/mp4', 'audio/mpeg', 'audio/ogg'],

    // Recommended fields with smart defaults
    minduration: params.minduration !== undefined ? params.minduration : 0,
    maxduration: params.maxduration !== undefined ? params.maxduration : 30,

    // VAST/DAAST protocols: 9=DAAST 1.0, 10=DAAST 1.0 Wrapper
    // Also support VAST: 2=VAST 2.0, 3=VAST 3.0
    protocols: params.protocols || [2, 3, 9, 10],

    // 0 = pre-roll (most common)
    startdelay: params.startdelay !== undefined ? params.startdelay : 0,

    // Delivery: 1 = streaming (most common)
    delivery: params.delivery || [1],

    // API frameworks: 7=OMID-1
    api: params.api || [7],

    ...overrides
  };

  // Add optional fields only if explicitly provided
  if (params.battr !== undefined) audio.battr = params.battr;
  if (params.minbitrate !== undefined) audio.minbitrate = params.minbitrate;
  if (params.maxbitrate !== undefined) audio.maxbitrate = params.maxbitrate;
  if (params.companiontype !== undefined) audio.companiontype = params.companiontype;
  if (params.maxseq !== undefined) audio.maxseq = params.maxseq;
  if (params.feed !== undefined) audio.feed = params.feed;
  if (params.stitched !== undefined) audio.stitched = params.stitched;
  if (params.nvol !== undefined) audio.nvol = params.nvol;

  // Pod fields
  if (params.poddur !== undefined) audio.poddur = params.poddur;
  if (params.rqddurs !== undefined) audio.rqddurs = params.rqddurs;
  if (params.podid !== undefined) audio.podid = params.podid;
  if (params.podseq !== undefined) audio.podseq = params.podseq;
  if (params.slotinpod !== undefined) audio.slotinpod = params.slotinpod;
  if (params.mincpmpersec !== undefined) audio.mincpmpersec = params.mincpmpersec;
  if (params.maxextended !== undefined) audio.maxextended = params.maxextended;

  // Deprecated field (use podid/slotinpod instead)
  if (params.sequence !== undefined) audio.sequence = params.sequence;

  return audio;
}

export interface ImpressionOverrides {
  id?: string;
  bidfloor?: number;
  bidfloorcur?: string;
  secure?: number;
  instl?: number;
  tagid?: string;
  audio?: Partial<Audio>;
}

/**
 * Generates an Impression object with audio
 * @param id - Unique impression ID
 * @param audioParams - Parameters for audio generation
 * @param bidfloor - Optional minimum bid floor in CPM
 * @param overrides - Optional overrides for impression fields
 * @returns Impression object with audio
 */
export function generateAudioImpression(
  id: string,
  audioParams: AudioParams = {},
  bidfloor: number = 1.0,
  overrides?: ImpressionOverrides
): Impression {
  const audio = generateAudio(audioParams, overrides?.audio);

  const impression: Impression = {
    id: overrides?.id || id,
    audio,
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
