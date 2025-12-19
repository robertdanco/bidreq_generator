/**
 * Bid Request Generator
 * Creates complete OpenRTB 2.6 compliant bid request objects
 */

import { v4 as uuidv4 } from 'uuid';
import { BidRequest, Site, Device, Publisher, Geo, BidRequestParams } from '../types/openrtb';
import { generateBannerImpression, BannerParams, ImpressionOverrides as BannerImpressionOverrides } from './banner';
import { generateVideoImpression, VideoParams, ImpressionOverrides as VideoImpressionOverrides } from './video';

/**
 * Generates a Site object for the bid request
 * @param params - Site parameters
 * @param overrides - Optional field overrides
 * @returns Site object
 */
function generateSite(
  params: {
    domain: string;
    page: string;
    siteName?: string;
    publisherName?: string;
    publisherDomain?: string;
  },
  overrides?: BidRequestParams['site']
): Site {
  const { domain, page, siteName, publisherName, publisherDomain } = params;

  const publisher: Publisher = {
    id: overrides?.publisher?.id || uuidv4(),
    name: overrides?.publisher?.name || publisherName || domain,
    domain: overrides?.publisher?.domain || publisherDomain || domain,
    ...(overrides?.publisher?.cat && { cat: overrides.publisher.cat })
  };

  const site: Site = {
    id: overrides?.id || uuidv4(),
    name: overrides?.name || siteName || domain,
    domain,
    page,
    publisher,
    privacypolicy: overrides?.privacypolicy !== undefined ? overrides.privacypolicy : 1,
    mobile: overrides?.mobile !== undefined ? overrides.mobile : 0,
    ...(overrides?.ref && { ref: overrides.ref }),
    ...(overrides?.cat && { cat: overrides.cat }),
    ...(overrides?.sectioncat && { sectioncat: overrides.sectioncat }),
    ...(overrides?.pagecat && { pagecat: overrides.pagecat })
  };

  return site;
}

/**
 * Generates a Device object with common desktop parameters
 * @param deviceOverrides - Optional device field overrides
 * @param geoOverrides - Optional geo field overrides
 * @returns Device object
 */
function generateDevice(
  deviceOverrides?: BidRequestParams['device'],
  geoOverrides?: BidRequestParams['geo']
): Device {
  const device: Device = {
    ua: deviceOverrides?.ua || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    devicetype: deviceOverrides?.devicetype !== undefined ? deviceOverrides.devicetype : 2,
    ip: deviceOverrides?.ip || '192.0.2.1',
    js: deviceOverrides?.js !== undefined ? deviceOverrides.js : 1,
    language: deviceOverrides?.language || 'en',
    make: deviceOverrides?.make || 'Apple',
    os: deviceOverrides?.os || 'macOS',
    osv: deviceOverrides?.osv || '10.15.7',
    w: deviceOverrides?.w !== undefined ? deviceOverrides.w : 1920,
    h: deviceOverrides?.h !== undefined ? deviceOverrides.h : 1080,
    pxratio: deviceOverrides?.pxratio !== undefined ? deviceOverrides.pxratio : 1.0,
    geo: generateGeo(geoOverrides)
  };

  // Add optional fields if provided in overrides
  if (deviceOverrides?.ipv6) device.ipv6 = deviceOverrides.ipv6;
  if (deviceOverrides?.model) device.model = deviceOverrides.model;
  if (deviceOverrides?.hwv) device.hwv = deviceOverrides.hwv;
  if (deviceOverrides?.ppi !== undefined) device.ppi = deviceOverrides.ppi;
  if (deviceOverrides?.dnt !== undefined) device.dnt = deviceOverrides.dnt;
  if (deviceOverrides?.lmt !== undefined) device.lmt = deviceOverrides.lmt;
  if (deviceOverrides?.connectiontype !== undefined) device.connectiontype = deviceOverrides.connectiontype;
  if (deviceOverrides?.carrier) device.carrier = deviceOverrides.carrier;
  if (deviceOverrides?.mccmnc) device.mccmnc = deviceOverrides.mccmnc;
  if (deviceOverrides?.ifa) device.ifa = deviceOverrides.ifa;

  return device;
}

/**
 * Generates a Geo object with example US location
 * @param overrides - Optional geo field overrides
 * @returns Geo object
 */
function generateGeo(overrides?: BidRequestParams['geo']): Geo {
  const geo: Geo = {
    country: overrides?.country || 'USA',
    city: overrides?.city || 'San Francisco',
    zip: overrides?.zip || '94102',
    type: overrides?.type !== undefined ? overrides.type : 2,
    utcoffset: overrides?.utcoffset !== undefined ? overrides.utcoffset : -480
  };

  // Add optional fields if provided in overrides
  if (overrides?.lat !== undefined) geo.lat = overrides.lat;
  if (overrides?.lon !== undefined) geo.lon = overrides.lon;
  if (overrides?.accuracy !== undefined) geo.accuracy = overrides.accuracy;
  if (overrides?.region) geo.region = overrides.region;
  if (overrides?.metro) geo.metro = overrides.metro;

  return geo;
}

/**
 * Generates a complete OpenRTB 2.6 Banner Bid Request
 * @param params - Bid request parameters with optional overrides
 * @returns Complete BidRequest object
 */
export function generateBannerBidRequest(params: BidRequestParams): BidRequest {
  const {
    domain,
    page,
    width,
    height,
    test = false,
    bidfloor = 0.5,
    siteName,
    publisherName,
    publisherDomain,
    site: siteOverrides,
    device: deviceOverrides,
    geo: geoOverrides,
    impressions,
    at,
    tmax,
    cur,
    allimps,
    bcat,
    badv,
    bapp
  } = params;

  // Generate unique auction ID
  const auctionId = uuidv4();

  // Generate impressions
  let bidImpressions;

  if (impressions && impressions.length > 0) {
    // Use custom impressions array
    bidImpressions = impressions.map((imp, index) => {
      const impId = imp.id || `${index + 1}`;

      if (imp.banner) {
        const bannerParams: BannerParams = {
          width: imp.banner.w,
          height: imp.banner.h,
          pos: imp.banner.pos,
          format: imp.banner.format,
          api: imp.banner.api,
          mimes: imp.banner.mimes,
          battr: imp.banner.battr,
          btype: imp.banner.btype,
          wmin: imp.banner.wmin,
          hmin: imp.banner.hmin,
          wmax: imp.banner.wmax,
          hmax: imp.banner.hmax
        };

        const impOverrides: BannerImpressionOverrides = {
          id: imp.id,
          bidfloor: imp.bidfloor,
          bidfloorcur: imp.bidfloorcur,
          secure: imp.secure,
          instl: imp.instl,
          tagid: imp.tagid
        };

        return generateBannerImpression(impId, bannerParams, imp.bidfloor, impOverrides);
      } else if (imp.video) {
        const videoParams: VideoParams = {
          mimes: imp.video.mimes,
          minduration: imp.video.minduration,
          maxduration: imp.video.maxduration,
          protocols: imp.video.protocols,
          w: imp.video.w,
          h: imp.video.h,
          startdelay: imp.video.startdelay,
          plcmt: imp.video.plcmt,
          linearity: imp.video.linearity,
          skip: imp.video.skip,
          skipmin: imp.video.skipmin,
          skipafter: imp.video.skipafter,
          playbackmethod: imp.video.playbackmethod,
          delivery: imp.video.delivery,
          pos: imp.video.pos,
          api: imp.video.api,
          battr: imp.video.battr,
          minbitrate: imp.video.minbitrate,
          maxbitrate: imp.video.maxbitrate,
          boxingallowed: imp.video.boxingallowed,
          playbackend: imp.video.playbackend,
          companiontype: imp.video.companiontype
        };

        const impOverrides: VideoImpressionOverrides = {
          id: imp.id,
          bidfloor: imp.bidfloor,
          bidfloorcur: imp.bidfloorcur,
          secure: imp.secure,
          instl: imp.instl,
          tagid: imp.tagid
        };

        return generateVideoImpression(impId, videoParams, imp.bidfloor, impOverrides, deviceOverrides?.devicetype);
      }

      // Fallback to banner impression (should not happen with proper validation)
      return generateBannerImpression(impId, { width: 300, height: 250 }, imp.bidfloor);
    });
  } else if (width && height) {
    // Legacy mode: Use single width/height
    const bannerParams: BannerParams = {
      width,
      height,
      pos: 1, // Above the fold
      secure: 1 // HTTPS required
    };

    bidImpressions = [generateBannerImpression('1', bannerParams, bidfloor)];
  } else {
    // Neither impressions nor width/height provided - use default
    const bannerParams: BannerParams = {
      width: 300,
      height: 250,
      pos: 1,
      secure: 1
    };

    bidImpressions = [generateBannerImpression('1', bannerParams, bidfloor)];
  }

  // Generate site object
  const site = generateSite(
    {
      domain,
      page,
      siteName,
      publisherName,
      publisherDomain
    },
    siteOverrides
  );

  // Generate device object
  const device = generateDevice(deviceOverrides, geoOverrides);

  // Construct the bid request
  const bidRequest: BidRequest = {
    id: auctionId,
    imp: bidImpressions,
    site,
    device,
    test: typeof test === 'boolean' ? (test ? 1 : 0) : test || 0,
    at: at !== undefined ? at : 1,
    tmax: tmax !== undefined ? tmax : 200,
    cur: cur || ['USD'],
    allimps: allimps !== undefined ? allimps : 0
  };

  // Add optional block lists if provided
  if (bcat && bcat.length > 0) {
    bidRequest.bcat = bcat;
  }
  if (badv && badv.length > 0) {
    bidRequest.badv = badv;
  }
  if (bapp && bapp.length > 0) {
    bidRequest.bapp = bapp;
  }

  return bidRequest;
}

/**
 * Generates a bid request with default values for quick testing
 * @returns BidRequest with example.com defaults
 */
export function generateDefaultBidRequest(): BidRequest {
  return generateBannerBidRequest({
    domain: 'example.com',
    page: 'https://example.com/page.html',
    width: 300,
    height: 250
  });
}
