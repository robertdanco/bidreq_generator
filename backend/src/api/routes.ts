/**
 * API Routes for Bid Request Generator
 */

import { Router, Request, Response } from 'express';
import { generateBannerBidRequest, generateDefaultBidRequest } from '../generators/bidrequest';
import { validateBidRequest } from '../validation/validator';
import { BidRequestParams } from '../types/openrtb';

const router = Router();

/**
 * POST /api/generate
 * Generates a banner bid request from input parameters
 *
 * Request body supports full OpenRTB 2.6 customization:
 * - domain: string (required) - Site domain
 * - page: string (required) - Page URL
 * - width: number (optional, legacy) - Banner width
 * - height: number (optional, legacy) - Banner height
 * - impressions: array (optional) - Full impression objects
 * - site: object (optional) - Site field overrides
 * - device: object (optional) - Device field overrides
 * - geo: object (optional) - Geo field overrides
 * - test: number|boolean (optional) - Test mode flag
 * - at: number (optional) - Auction type
 * - tmax: number (optional) - Max timeout
 * - cur: string[] (optional) - Accepted currencies
 * - And more... (see BidRequestParams interface)
 */
router.post('/generate', (req: Request, res: Response) => {
  try {
    const params = req.body as BidRequestParams;

    // Validate required parameters
    const inputErrors: string[] = [];

    if (!params.domain || typeof params.domain !== 'string' || params.domain.trim() === '') {
      inputErrors.push('domain is required and must be a non-empty string');
    }

    if (!params.page || typeof params.page !== 'string' || params.page.trim() === '') {
      inputErrors.push('page is required and must be a non-empty string');
    }

    // Validate that either impressions OR width/height is provided
    const hasImpressions = params.impressions && params.impressions.length > 0;
    const hasLegacyDimensions = params.width && params.height;

    if (!hasImpressions && !hasLegacyDimensions) {
      inputErrors.push('Either impressions array or width/height must be provided');
    }

    // Validate legacy dimensions if provided
    if (hasLegacyDimensions) {
      if (typeof params.width !== 'number' || params.width <= 0) {
        inputErrors.push('width must be a positive number');
      }
      if (typeof params.height !== 'number' || params.height <= 0) {
        inputErrors.push('height must be a positive number');
      }
    }

    // Validate impressions if provided
    if (hasImpressions && params.impressions) {
      params.impressions.forEach((imp, index) => {
        // Each impression must have either banner or video (but not both)
        const hasBanner = !!imp.banner;
        const hasVideo = !!imp.video;

        if (!hasBanner && !hasVideo) {
          inputErrors.push(`impressions[${index}] must have either a banner or video object`);
        } else if (hasBanner && hasVideo) {
          inputErrors.push(`impressions[${index}] cannot have both banner and video objects`);
        }

        // Validate banner if present
        if (imp.banner) {
          if (!imp.banner.w || imp.banner.w <= 0) {
            inputErrors.push(`impressions[${index}].banner.w must be a positive number`);
          }
          if (!imp.banner.h || imp.banner.h <= 0) {
            inputErrors.push(`impressions[${index}].banner.h must be a positive number`);
          }
        }

        // Validate video if present
        if (imp.video) {
          // mimes is required for video
          if (!imp.video.mimes || !Array.isArray(imp.video.mimes) || imp.video.mimes.length === 0) {
            inputErrors.push(
              `impressions[${index}].video.mimes is required and must be a non-empty array`
            );
          }
        }
      });
    }

    if (inputErrors.length > 0) {
      return res.status(400).json({
        error: 'Invalid input parameters',
        errors: inputErrors
      });
    }

    // Prepare parameters for bid request generation
    const bidRequestParams: BidRequestParams = {
      domain: params.domain.trim(),
      page: params.page.trim(),
      width: params.width,
      height: params.height,
      test: params.test,
      bidfloor: params.bidfloor,
      siteName: params.siteName?.trim(),
      publisherName: params.publisherName?.trim(),
      publisherDomain: params.publisherDomain?.trim(),
      site: params.site,
      device: params.device,
      geo: params.geo,
      impressions: params.impressions,
      at: params.at,
      tmax: params.tmax,
      cur: params.cur,
      allimps: params.allimps,
      bcat: params.bcat,
      badv: params.badv,
      bapp: params.bapp
    };

    // Generate the bid request
    const bidRequest = generateBannerBidRequest(bidRequestParams);

    // Validate the generated bid request
    const validation = validateBidRequest(bidRequest);

    if (!validation.valid) {
      return res.status(500).json({
        error: 'Generated bid request failed validation',
        errors: validation.errors,
        warnings: validation.warnings
      });
    }

    // Return the bid request with validation warnings if any
    return res.status(200).json({
      bidRequest,
      validation: {
        valid: validation.valid,
        warnings: validation.warnings
      }
    });
  } catch (error) {
    console.error('Error generating bid request:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/example
 * Returns an example bid request with default values
 */
router.get('/example', (req: Request, res: Response) => {
  try {
    const bidRequest = generateDefaultBidRequest();
    const validation = validateBidRequest(bidRequest);

    return res.status(200).json({
      bidRequest,
      validation: {
        valid: validation.valid,
        warnings: validation.warnings
      }
    });
  } catch (error) {
    console.error('Error generating example bid request:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'bidreq-generator-api'
  });
});

export default router;
