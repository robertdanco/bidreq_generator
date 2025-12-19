/**
 * OpenRTB 2.6 Bid Request Validator
 * Validates bid requests for compliance with OpenRTB 2.6 specification
 */

import { BidRequest, Impression } from '../types/openrtb';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates a BidRequest object for OpenRTB 2.6 compliance
 * @param bidRequest - The bid request to validate
 * @returns ValidationResult with errors and warnings
 */
export function validateBidRequest(bidRequest: BidRequest): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  if (!bidRequest.id || bidRequest.id.trim() === '') {
    errors.push('BidRequest.id is required and must not be empty');
  }

  if (!bidRequest.imp || !Array.isArray(bidRequest.imp)) {
    errors.push('BidRequest.imp is required and must be an array');
  } else if (bidRequest.imp.length === 0) {
    errors.push('BidRequest.imp must contain at least one impression');
  } else {
    // Validate each impression
    bidRequest.imp.forEach((imp, index) => {
      const impErrors = validateImpression(imp, index, warnings);
      errors.push(...impErrors);
    });
  }

  // Must have either site or app
  if (!bidRequest.site && !bidRequest.app) {
    errors.push('BidRequest must have either a site or app object');
  }

  // Validate site if present
  if (bidRequest.site) {
    if (!bidRequest.site.id && !bidRequest.site.page && !bidRequest.site.domain) {
      warnings.push('Site object should have at least id, page, or domain for proper identification');
    }
  }

  // Validate test flag
  if (bidRequest.test !== undefined && bidRequest.test !== 0 && bidRequest.test !== 1) {
    errors.push('BidRequest.test must be 0 or 1');
  }

  // Validate auction type
  if (bidRequest.at !== undefined && ![1, 2, 3].includes(bidRequest.at)) {
    warnings.push('BidRequest.at should typically be 1 (First Price) or 2 (Second Price)');
  }

  // Validate tmax
  if (bidRequest.tmax !== undefined && bidRequest.tmax <= 0) {
    errors.push('BidRequest.tmax must be a positive number if specified');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates an Impression object
 * @param impression - The impression to validate
 * @param index - The index of the impression in the array (for error messages)
 * @param warnings - Array to collect warning messages
 * @returns Array of error messages
 */
function validateImpression(impression: Impression, index: number, warnings?: string[]): string[] {
  const errors: string[] = [];

  if (!impression.id || impression.id.trim() === '') {
    errors.push(`Impression[${index}].id is required and must not be empty`);
  }

  // Must have at least one of: banner, video, audio, native
  if (!impression.banner && !impression.video && !impression.audio && !impression.native) {
    errors.push(
      `Impression[${index}] must have at least one of: banner, video, audio, or native`
    );
  }

  // Validate banner if present
  if (impression.banner) {
    const bannerErrors = validateBanner(impression.banner, index);
    errors.push(...bannerErrors);
  }

  // Validate video if present
  if (impression.video) {
    const videoErrors = validateVideo(impression.video, index, warnings);
    errors.push(...videoErrors);
  }

  // Validate bidfloor
  if (impression.bidfloor !== undefined && impression.bidfloor < 0) {
    errors.push(`Impression[${index}].bidfloor must be non-negative`);
  }

  // Validate bidfloorcur
  if (impression.bidfloorcur && impression.bidfloorcur.length !== 3) {
    errors.push(
      `Impression[${index}].bidfloorcur should be a 3-letter ISO-4217 currency code (e.g., USD, EUR)`
    );
  }

  // Validate secure flag
  if (impression.secure !== undefined && impression.secure !== 0 && impression.secure !== 1) {
    errors.push(`Impression[${index}].secure must be 0 or 1`);
  }

  // Validate instl flag
  if (impression.instl !== undefined && impression.instl !== 0 && impression.instl !== 1) {
    errors.push(`Impression[${index}].instl must be 0 or 1`);
  }

  return errors;
}

/**
 * Validates a Banner object
 * @param banner - The banner to validate
 * @param impIndex - The index of the parent impression (for error messages)
 * @returns Array of error messages
 */
function validateBanner(banner: any, impIndex: number): string[] {
  const errors: string[] = [];

  // Banner should have either w/h or format array
  const hasSize = banner.w && banner.h;
  const hasFormat = banner.format && Array.isArray(banner.format) && banner.format.length > 0;

  if (!hasSize && !hasFormat) {
    errors.push(
      `Impression[${impIndex}].banner should have either w/h dimensions or a format array`
    );
  }

  // Validate format array if present
  if (banner.format) {
    if (!Array.isArray(banner.format)) {
      errors.push(`Impression[${impIndex}].banner.format must be an array`);
    } else {
      banner.format.forEach((format: any, fIndex: number) => {
        if (!format.w || !format.h) {
          errors.push(
            `Impression[${impIndex}].banner.format[${fIndex}] must have both w and h properties`
          );
        }
        if (format.w <= 0 || format.h <= 0) {
          errors.push(
            `Impression[${impIndex}].banner.format[${fIndex}] dimensions must be positive`
          );
        }
      });
    }
  }

  // Validate dimensions if present
  if (banner.w !== undefined && banner.w <= 0) {
    errors.push(`Impression[${impIndex}].banner.w must be positive`);
  }

  if (banner.h !== undefined && banner.h <= 0) {
    errors.push(`Impression[${impIndex}].banner.h must be positive`);
  }

  return errors;
}

/**
 * Validates a Video object
 * @param video - The video to validate
 * @param impIndex - The index of the parent impression (for error messages)
 * @param warnings - Array to collect warning messages
 * @returns Array of error messages
 */
function validateVideo(video: any, impIndex: number, warnings?: string[]): string[] {
  const errors: string[] = [];

  // Required field: mimes must be a non-empty array
  if (!video.mimes || !Array.isArray(video.mimes)) {
    errors.push(`Impression[${impIndex}].video.mimes is required and must be an array`);
  } else if (video.mimes.length === 0) {
    errors.push(`Impression[${impIndex}].video.mimes must contain at least one MIME type`);
  }

  // Validate durations if present
  if (video.minduration !== undefined) {
    if (typeof video.minduration !== 'number' || video.minduration < 0) {
      errors.push(`Impression[${impIndex}].video.minduration must be a non-negative number`);
    }
  }

  if (video.maxduration !== undefined) {
    if (typeof video.maxduration !== 'number' || video.maxduration < 0) {
      errors.push(`Impression[${impIndex}].video.maxduration must be a non-negative number`);
    }
  }

  if (video.minduration !== undefined && video.maxduration !== undefined) {
    if (video.minduration > video.maxduration) {
      errors.push(`Impression[${impIndex}].video.minduration cannot be greater than maxduration`);
    }
  }

  // Validate protocols if present
  if (video.protocols !== undefined) {
    if (!Array.isArray(video.protocols)) {
      errors.push(`Impression[${impIndex}].video.protocols must be an array`);
    } else {
      const validProtocols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      video.protocols.forEach((protocol: number) => {
        if (!validProtocols.includes(protocol)) {
          errors.push(
            `Impression[${impIndex}].video.protocols contains invalid protocol value: ${protocol}`
          );
        }
      });
    }
  }

  // Validate dimensions if present
  if (video.w !== undefined && video.w <= 0) {
    errors.push(`Impression[${impIndex}].video.w must be positive`);
  }

  if (video.h !== undefined && video.h <= 0) {
    errors.push(`Impression[${impIndex}].video.h must be positive`);
  }

  // Validate plcmt (placement type) - OpenRTB 2.6 values: 1-4
  if (video.plcmt !== undefined) {
    if (![1, 2, 3, 4].includes(video.plcmt)) {
      errors.push(
        `Impression[${impIndex}].video.plcmt must be 1 (Instream), 2 (Accompanying), 3 (Interstitial), or 4 (No Content)`
      );
    }
  }

  // Validate linearity - 1 or 2
  if (video.linearity !== undefined) {
    if (![1, 2].includes(video.linearity)) {
      errors.push(
        `Impression[${impIndex}].video.linearity must be 1 (linear/in-stream) or 2 (non-linear/overlay)`
      );
    }
  }

  // Validate skip flag - 0 or 1
  if (video.skip !== undefined) {
    if (![0, 1].includes(video.skip)) {
      errors.push(`Impression[${impIndex}].video.skip must be 0 or 1`);
    }
  }

  // Validate skipmin and skipafter if skip is enabled
  if (video.skip === 1) {
    if (video.skipmin !== undefined && video.skipmin < 0) {
      errors.push(`Impression[${impIndex}].video.skipmin must be non-negative`);
    }
    if (video.skipafter !== undefined && video.skipafter < 0) {
      errors.push(`Impression[${impIndex}].video.skipafter must be non-negative`);
    }
  }

  // Validate bitrate if present
  if (video.minbitrate !== undefined && video.minbitrate < 0) {
    errors.push(`Impression[${impIndex}].video.minbitrate must be non-negative`);
  }

  if (video.maxbitrate !== undefined && video.maxbitrate < 0) {
    errors.push(`Impression[${impIndex}].video.maxbitrate must be non-negative`);
  }

  if (video.minbitrate !== undefined && video.maxbitrate !== undefined) {
    if (video.minbitrate > video.maxbitrate) {
      errors.push(`Impression[${impIndex}].video.minbitrate cannot be greater than maxbitrate`);
    }
  }

  // Validate boxingallowed - 0 or 1
  if (video.boxingallowed !== undefined) {
    if (![0, 1].includes(video.boxingallowed)) {
      errors.push(`Impression[${impIndex}].video.boxingallowed must be 0 or 1`);
    }
  }

  // Validate playbackend - 1, 2, or 3
  if (video.playbackend !== undefined) {
    if (![1, 2, 3].includes(video.playbackend)) {
      errors.push(
        `Impression[${impIndex}].video.playbackend must be 1 (completion), 2 (viewable), or 3 (leaving viewport)`
      );
    }
  }

  // Warning if no duration specified
  if (video.minduration === undefined && video.maxduration === undefined && warnings) {
    warnings.push(
      `Impression[${impIndex}].video: No duration constraints specified (minduration/maxduration). Consider adding duration limits.`
    );
  }

  return errors;
}

/**
 * Quick validation function that throws an error if validation fails
 * @param bidRequest - The bid request to validate
 * @throws Error if validation fails
 */
export function validateOrThrow(bidRequest: BidRequest): void {
  const result = validateBidRequest(bidRequest);

  if (!result.valid) {
    const errorMessage = `Bid request validation failed:\n${result.errors.join('\n')}`;
    throw new Error(errorMessage);
  }
}
