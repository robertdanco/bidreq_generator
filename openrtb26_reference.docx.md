# **OpenRTB 2.6**

Complete Bid Request Specification Reference

With Decision Tree Diagram & Field Dependencies

*Based on IAB Tech Lab OpenRTB 2.6 Specification*

Yellow highlighted rows \= Required or Recommended fields

# **Table of Contents**

# **1\. Overview**

This document provides a comprehensive reference for OpenRTB 2.6 bid request objects, including all fields, their types, requirement status, and dependencies. The specification defines the protocol for real-time bidding between exchanges (sell-side) and bidders (demand-side).

## **1.1 Field Status Legend**

* Required: Must be present for a technically valid request  
* Recommended: Market norm to include; may be required by business partners  
* Optional: Include based on availability and business requirements

# **2\. Bid Request Decision Tree**

This decision tree captures the logical flow and dependencies for constructing a valid OpenRTB 2.6 bid request.

## **2.1 Core Structure Decisions**

**START: Every bid request MUST have:**

1. BidRequest.id (string) \- Unique auction identifier  
2. BidRequest.imp\[\] (array) \- At least one Imp object

## **2.2 Impression Type Decision**

**DECISION: What ad format(s) are you offering?**

Each Imp object MUST include at least one of:

* IF Banner → Include Imp.banner object (requires format\[\] or w/h)  
* IF Video → Include Imp.video object (REQUIRES mimes\[\])  
* IF Audio → Include Imp.audio object (REQUIRES mimes\[\])  
* IF Native → Include Imp.native object (REQUIRES request string)

*NOTE: Multiple types can be offered; bidder responds with exactly one.*

## **2.3 Inventory Context Decision**

**DECISION: Is the inventory from a website or an app?**

* IF Website → Include BidRequest.site object (RECOMMENDED: site.id)  
* IF App → Include BidRequest.app object (RECOMMENDED: app.id)

**CONSTRAINT: NEVER include both site AND app in same request.**

## **2.4 Video/Audio Pod Decisions**

**IF Video or Audio with Ad Pods:**

* Use podid to group impressions in same pod  
* Use podseq for pod position in content (0=last/unknown, 1=first)  
* Use slotinpod for position within pod  
* For dynamic pods: Set poddur (total duration) and maxseq (max ads)

**DURATION CONSTRAINT:**

* Use EITHER minduration/maxduration OR rqddurs \- NEVER both  
* rqddurs \= exact durations for live TV (avoids dead air)

## **2.5 Private Marketplace Decisions**

**DECISION: Are there private marketplace deals?**

* IF YES → Include Imp.pmp object  
* IF pmp.private\_auction \= 1 → Bids restricted to specified deals only  
* Each Deal REQUIRES deal.id (unique identifier)  
* deal.at can override BidRequest.at for specific deal

## **2.6 Regulatory Decisions**

**DECISION: What regulations apply?**

* IF COPPA applies → Set regs.coppa \= 1  
* IF GDPR applies → Set regs.gdpr \= 1 AND user.consent (TCF string)  
* IF US Privacy/CCPA → Set regs.us\_privacy (US Privacy String)

## **2.7 Supply Chain Decisions**

**DECISION: Include supply chain transparency?**

* IF YES → Include source.schain object  
* SupplyChain REQUIRES: complete, nodes\[\], ver  
* Each node REQUIRES: asi (domain), sid (seller ID)

## **2.8 User Agent Decisions**

**DECISION: User-Agent format?**

* Traditional UA → Use device.ua (string)  
* Client Hints → Use device.sua (structured UserAgent object)  
* BEST PRACTICE: If sua present, prefer sua over ua (ua may be frozen)

## **2.9 Header Bidding / Upstream Decisions**

**DECISION: Is this header bidding or has upstream decisioning?**

* IF YES → Include source object  
* source.fd \= 0 if exchange makes final decision  
* source.fd \= 1 if upstream source makes final decision  
* Use source.tid for transaction ID across all participants

# **3\. Object Hierarchy Diagram**

The following shows the parent-child relationships between OpenRTB 2.6 objects:

**BidRequest (root)**

├── imp\[\] (required, 1+)  
├── banner → format\[\]  
├── video → companionad\[\] (Banner objects)  
├── audio → companionad\[\] (Banner objects)  
├── native  
├── pmp → deals\[\]  
└── metric\[\]  
├── site (XOR with app)  
├── publisher  
└── content → producer, network, channel, data\[\]  
├── app (XOR with site)  
├── publisher  
└── content → producer, network, channel, data\[\]  
├── device → geo, sua (UserAgent → BrandVersion\[\])  
├── user → geo, data\[\] → segment\[\], eids\[\] → uids\[\]  
├── source → schain → nodes\[\]  
└── regs

# **4\. Complete Object Specifications**

The following tables document all OpenRTB 2.6 bid request objects with their fields, types, descriptions, and requirement status.

## **Object: BidRequest**

*Top-level bid request object containing globally unique auction ID and all impression/context data.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Unique ID of the bid request, provided by the exchange | Required |
| imp | object array | Array of Imp objects representing impressions offered. At least 1 required. | Required |
| site | object | Details via Site object about publisher's website. Only for websites. | Recommended |
| app | object | Details via App object about publisher's app. Only for non-browser apps. | Recommended |
| device | object | Details via Device object about user's device. | Recommended |
| user | object | Details via User object about human user; the advertising audience. | Recommended |
| test | integer | Test mode indicator. 0 \= live, 1 \= test mode (default: 0\) | Optional |
| at | integer | Auction type. 1 \= First Price, 2 \= Second Price Plus (default: 2). 500+ \= exchange-specific. | Optional |
| tmax | integer | Max time in ms for bids including latency. Supersedes a priori guidance. | Optional |
| wseat | string array | Allowed list of buyer seats. Omission implies no restrictions. | Optional |
| bseat | string array | Block list of buyer seats. At most one of wseat/bseat should be used. | Optional |
| allimps | integer | Flag if impressions represent all available in context. 0 \= no/unknown, 1 \= yes (default: 0\) | Optional |
| cur | string array | Allowed currencies using ISO-4217 alpha codes. | Optional |
| wlang | string array | Allowed languages for creatives using ISO-639-1-alpha-2. | Optional |
| wlangb | string array | Allowed languages using IETF BCP 47\. Only one of wlang or wlangb. | Optional |
| bcat | string array | Blocked advertiser categories using cattax taxonomy. | Optional |
| cattax | integer | Taxonomy for bcat. See AdCOM Category Taxonomies (default: 1 \= IAB 1.0) | Optional |
| badv | string array | Block list of advertisers by domain (e.g., 'ford.com'). | Optional |
| bapp | string array | Block list of apps by app store IDs. | Optional |
| source | object | Source object for inventory source and final decision info. | Optional |
| regs | object | Regs object for regulatory conditions (COPPA, GDPR, etc.). | Optional |
| ext | object | Placeholder for exchange-specific extensions. | Optional |

## **Object: Source**

*Describes nature/behavior of entity that is source of bid request upstream from exchange. Used for header bidding and upstream decisioning.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| fd | integer | Entity responsible for final impression sale decision. 0 \= exchange, 1 \= upstream source. | Recommended |
| tid | string | Transaction ID common across all participants in bid request. | Recommended |
| pchain | string | Payment ID chain string per TAG Payment ID Protocol v1.0. | Recommended |
| schain | object | SupplyChain object representing supply chain links. | Recommended |
| ext | object | Placeholder for exchange-specific extensions. | Optional |

## **Object: Regs**

*Contains legal, governmental, or industry regulations applicable to the request.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| coppa | integer | COPPA flag. 0 \= no, 1 \= yes (subject to COPPA regulations). | Optional |
| gdpr | integer | GDPR flag. 0 \= No, 1 \= Yes, omission \= Unknown. | Optional |
| us\_privacy | string | US Privacy String for consumer privacy signals (CCPA). | Optional |
| ext | object | Placeholder for exchange-specific extensions. | Optional |

## **Object: Imp**

*Describes an ad placement/impression being auctioned. Single request can include multiple Imp objects.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Unique identifier within bid request context (typically starts at 1). | Required |
| metric | object array | Array of Metric objects for impression insights. | Optional |
| banner | object | Banner object; required if offered as banner ad opportunity. | Optional |
| video | object | Video object; required if offered as video ad opportunity. | Optional |
| audio | object | Audio object; required if offered as audio ad opportunity. | Optional |
| native | object | Native object; required if offered as native ad opportunity. | Optional |
| pmp | object | Pmp object for private marketplace deals. | Optional |
| displaymanager | string | Name of ad mediation partner, SDK, or player. Recommended for video/apps. | Optional |
| displaymanagerver | string | Version of displaymanager. Recommended for video/apps. | Optional |
| instl | integer | 1 \= interstitial/full screen, 0 \= not interstitial (default: 0). | Optional |
| tagid | string | Identifier for ad placement/tag that initiated auction. | Optional |
| bidfloor | float | Minimum bid in CPM (default: 0). | Optional |
| bidfloorcur | string | Currency for bidfloor using ISO-4217 (default: 'USD'). | Optional |
| clickbrowser | integer | Browser type on click in app. 0 \= embedded, 1 \= native. | Optional |
| secure | integer | Requires HTTPS. 0 \= non-secure, 1 \= secure. Omission \= unknown. | Optional |
| iframebuster | string array | Supported iframe busters. | Optional |
| rwdd | integer | Rewarded ad. 0 \= no, 1 \= yes (default: 0). | Optional |
| ssai | integer | Server-side ad insertion. 0 \= unknown, 1 \= all client, 2 \= server stitch/client track, 3 \= all server (default: 0). | Optional |
| exp | integer | Seconds between auction and actual impression. | Optional |
| ext | object | Placeholder for exchange-specific extensions. | Optional |

## **Object: Metric**

*Impression metrics like viewability, CTR. Helps with decisioning.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| type | string | Metric type using exchange-curated names. | Required |
| value | float | Metric value. Probabilities must be 0.0-1.0. | Required |
| vendor | string | Source of value. 'EXCHANGE' if exchange is source. | Recommended |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Banner**

*Most general impression type. Can be static image, expandable, or in-banner video. Also used for Video companion ads.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| format | object array | Array of Format objects for permitted sizes. Highly recommended. | Recommended |
| w | integer | Exact width in DIPS. Recommended if no format objects. | Optional |
| h | integer | Exact height in DIPS. Recommended if no format objects. | Optional |
| btype | integer array | Blocked banner types. 1=XHTML Text, 2=XHTML Banner, 3=JavaScript, 4=iframe. | Optional |
| battr | integer array | Blocked creative attributes. See AdCOM Creative Attributes. | Optional |
| pos | integer | Ad position on screen. See AdCOM Placement Positions. | Optional |
| mimes | string array | Supported MIME types (e.g., 'image/jpeg', 'image/gif'). | Optional |
| topframe | integer | Top frame vs iframe. 0 \= iframe, 1 \= top frame. | Optional |
| expdir | integer array | Expandable directions. See AdCOM Expandable Directions. | Optional |
| api | integer array | Supported API frameworks. See AdCOM API Frameworks. | Optional |
| id | string | Unique identifier for banner. Recommended for companion ads with Video. | Optional |
| vcm | integer | For Video companions. 0 \= concurrent, 1 \= end-card. | Optional |
| ext | object | Placeholder for exchange-specific extensions. | Optional |

## **Object: Video**

*In-stream video impression. Assumes VAST compliance. Supports companion ads via Banner array.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| mimes | string array | Supported MIME types (e.g., 'video/mp4'). | Required |
| minduration | integer | Minimum video duration in seconds. Mutually exclusive with rqddurs (default: 0). | Recommended |
| maxduration | integer | Maximum video duration in seconds. Mutually exclusive with rqddurs. | Recommended |
| startdelay | integer | Start delay for pre/mid/post-roll. See AdCOM Start Delay Modes. | Recommended |
| maxseq | integer | Max ads in dynamic video ad pod. | Recommended |
| poddur | integer | Total seconds for dynamic pod. Required for dynamic portions. | Recommended |
| protocols | integer array | Supported video protocols. See AdCOM Creative Subtypes \- Audio/Video. | Recommended |
| w | integer | Video player width in DIPS. | Recommended |
| h | integer | Video player height in DIPS. | Recommended |
| podid | string | Unique ID for video ad pod. Shared across impressions in same pod. | Optional |
| podseq | integer | Pod sequence in content stream. See AdCOM Pod Sequence (default: 0). | Optional |
| rqddurs | integer array | Precise acceptable durations. Mutually exclusive with min/maxduration. | Optional |
| placement | integer | Video placement type. See AdCOM Placement Subtypes \- Video. | Optional |
| linearity | integer | Linear/nonlinear. See AdCOM Linearity Modes. Omission \= all allowed. | Optional |
| skip | integer | Skippable. 0 \= no, 1 \= yes. | Optional |
| skipmin | integer | Videos \> this duration can skip (default: 0). | Optional |
| skipafter | integer | Seconds before skip enabled (default: 0). | Optional |
| sequence | integer | DEPRECATED. Sequence number for coordinated delivery (default: 0). | Optional |
| slotinpod | integer | Guaranteed slot position in pod. See AdCOM Slot Position in Pod (default: 0). | Optional |
| mincpmpersec | float | Minimum CPM per second for dynamic pod pricing. | Optional |
| battr | integer array | Blocked creative attributes. See AdCOM Creative Attributes. | Optional |
| maxextended | integer | Max extended duration. 0 \= no extension, \-1 \= unlimited, \>0 \= seconds. | Optional |
| minbitrate | integer | Minimum bit rate in Kbps. | Optional |
| maxbitrate | integer | Maximum bit rate in Kbps. | Optional |
| boxingallowed | integer | Allow 4:3 letterboxing into 16:9. 0 \= no, 1 \= yes (default: 1). | Optional |
| playbackmethod | integer array | Playback methods. See AdCOM Playback Methods. | Optional |
| playbackend | integer | Playback end event. See AdCOM Playback Cessation Modes. | Optional |
| delivery | integer array | Delivery methods. See AdCOM Delivery Methods. | Optional |
| pos | integer | Position on screen. See AdCOM Placement Positions. | Optional |
| companionad | object array | Array of Banner objects for companion ads. | Optional |
| api | integer array | Supported API frameworks. See AdCOM API Frameworks. | Optional |
| companiontype | integer array | VAST companion types. See AdCOM Companion Types. | Optional |
| ext | object | Placeholder for exchange-specific extensions. | Optional |

## **Object: Audio**

*Audio type impression. Assumes VAST compliance. Supports companion ads via Banner array.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| mimes | string array | Supported MIME types (e.g., 'audio/mp4'). | Required |
| minduration | integer | Minimum audio duration in seconds. Mutually exclusive with rqddurs (default: 0). | Recommended |
| maxduration | integer | Maximum audio duration in seconds. Mutually exclusive with rqddurs. | Recommended |
| poddur | integer | Total seconds for dynamic audio pod. | Recommended |
| protocols | integer array | Supported audio protocols. See AdCOM Creative Subtypes. | Recommended |
| startdelay | integer | Start delay for pre/mid/post-roll. See AdCOM Start Delay Modes. | Recommended |
| rqddurs | integer array | Precise acceptable durations. Mutually exclusive with min/maxduration. | Optional |
| podid | string | Unique ID for audio ad pod. | Optional |
| podseq | integer | Pod sequence in content stream (default: 0). | Optional |
| sequence | integer | DEPRECATED. Sequence number (default: 0). | Optional |
| slotinpod | integer | Guaranteed slot in pod (default: 0). | Optional |
| mincpmpersec | float | Minimum CPM per second for dynamic pod. | Optional |
| battr | integer array | Blocked creative attributes. | Optional |
| maxextended | integer | Max extended duration. | Optional |
| minbitrate | integer | Minimum bit rate in Kbps. | Optional |
| maxbitrate | integer | Maximum bit rate in Kbps. | Optional |
| delivery | integer array | Delivery methods. | Optional |
| companionad | object array | Array of Banner objects for companions. | Optional |
| api | integer array | Supported API frameworks. | Optional |
| companiontype | integer array | Companion ad types. | Optional |
| maxseq | integer | Max ads in ad pod. | Optional |
| feed | integer | Audio feed type. See AdCOM Feed Types. | Optional |
| stitched | integer | Stitched with content. 0 \= no, 1 \= yes. | Optional |
| nvol | integer | Volume normalization. See AdCOM Volume Normalization Modes. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Native**

*Native ad impression. Uses Dynamic Native Ads API for request/response structure.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| request | string | JSON-encoded request payload per Native Ad Spec. | Required |
| ver | string | Dynamic Native Ads API version. Highly recommended. | Recommended |
| api | integer array | Supported API frameworks. | Optional |
| battr | integer array | Blocked creative attributes. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Format**

*Allowed size (height/width) or Flex Ad parameters for banner. Used in array for multiple sizes.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| w | integer | Width in DIPS. | Optional |
| h | integer | Height in DIPS. | Optional |
| wratio | integer | Relative width for ratio sizing. | Optional |
| hratio | integer | Relative height for ratio sizing. | Optional |
| wmin | integer | Minimum width in DIPS for ratio sizing. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Pmp**

*Private marketplace container for direct deals between buyers and sellers.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| private\_auction | integer | Auction eligibility. 0 \= all bids accepted, 1 \= restricted to deals (default: 0). | Optional |
| deals | object array | Array of Deal objects applicable to this impression. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Deal**

*Specific pre-arranged deal between buyer and seller for this impression.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Unique identifier for the direct deal. | Required |
| bidfloor | float | Minimum bid in CPM (default: 0). | Optional |
| bidfloorcur | string | Currency using ISO-4217 (default: 'USD'). | Optional |
| at | integer | Override auction type. 1 \= First, 2 \= Second+, 3 \= fixed deal price. | Optional |
| wseat | string array | Allowed buyer seats. | Optional |
| wadomain | string array | Allowed advertiser domains. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Site**

*Website information. Include if content is website (not app). Mutually exclusive with App.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Exchange-specific site ID. | Recommended |
| name | string | Site name (may be aliased). | Optional |
| domain | string | Site domain (e.g., 'mysite.foo.com'). | Optional |
| cattax | integer | Category taxonomy. See AdCOM Category Taxonomies. | Optional |
| cat | string array | IAB content categories. | Optional |
| sectioncat | string array | Categories for current section. | Optional |
| pagecat | string array | Categories for current page. | Optional |
| page | string | URL of page with impression. | Optional |
| ref | string | Referrer URL. | Optional |
| search | string | Search string that led to page. | Optional |
| mobile | integer | Mobile-optimized. 0 \= no, 1 \= yes. | Optional |
| privacypolicy | integer | Has privacy policy. 0 \= no, 1 \= yes. | Optional |
| publisher | object | Publisher object. | Optional |
| content | object | Content object. | Optional |
| keywords | string | Comma-separated keywords. Only one of keywords/kwarray. | Optional |
| kwarray | string array | Array of keywords. Only one of keywords/kwarray. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: App**

*Application information. Include if content is app (not website). Mutually exclusive with Site.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Exchange-specific app ID. | Recommended |
| name | string | App name (may be aliased). | Optional |
| bundle | string | App store ID or bundle name. | Optional |
| domain | string | App domain. | Optional |
| storeurl | string | App store URL for IQG 2.1 compliance. | Optional |
| cattax | integer | Category taxonomy (default: 1). | Optional |
| cat | string array | IAB content categories. | Optional |
| sectioncat | string array | Categories for current section. | Optional |
| pagecat | string array | Categories for current page/view. | Optional |
| ver | string | Application version. | Optional |
| privacypolicy | integer | Has privacy policy. 0 \= no, 1 \= yes. | Optional |
| paid | integer | 0 \= free, 1 \= paid. | Optional |
| publisher | object | Publisher object. | Optional |
| content | object | Content object. | Optional |
| keywords | string | Comma-separated keywords. | Optional |
| kwarray | string array | Array of keywords. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Publisher**

*Entity that directly supplies inventory and is paid by the exchange.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Exchange-specific seller ID. Maps to sellers.json seller\_id. | Optional |
| name | string | Seller name (may be aliased). | Optional |
| cattax | integer | Category taxonomy (default: 1). | Optional |
| cat | string array | IAB content categories. | Optional |
| domain | string | Highest level domain (e.g., 'seller.com'). | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Content**

*Content in which impression appears. Useful for syndicated content.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Unique content identifier. | Optional |
| episode | integer | Episode number. | Optional |
| title | string | Content title. | Optional |
| series | string | Content series. | Optional |
| season | string | Content season. | Optional |
| artist | string | Artist credited. | Optional |
| genre | string | Genre (e.g., rock, pop). | Optional |
| album | string | Album for audio. | Optional |
| isrc | string | International Standard Recording Code (ISO-3901). | Optional |
| producer | object | Producer object. | Optional |
| url | string | URL of content. | Optional |
| cattax | integer | Category taxonomy (default: 1). | Optional |
| cat | string array | IAB content categories. | Optional |
| prodq | integer | Production quality. See AdCOM Production Qualities. | Optional |
| context | integer | Content type. See AdCOM Content Contexts. | Optional |
| contentrating | string | Content rating (e.g., MPAA). | Optional |
| userrating | string | User rating. | Optional |
| qagmediarating | integer | IQG media rating. See AdCOM Media Ratings. | Optional |
| keywords | string | Comma-separated keywords. | Optional |
| kwarray | string array | Array of keywords. | Optional |
| livestream | integer | 0 \= not live, 1 \= live content. | Optional |
| sourcerelationship | integer | 0 \= indirect, 1 \= direct. | Optional |
| len | integer | Length in seconds for video/audio. | Optional |
| language | string | Language using ISO-639-1-alpha-2. | Optional |
| langb | string | Language using IETF BCP 47\. | Optional |
| embeddable | integer | Embeddable. 0 \= no, 1 \= yes. | Optional |
| data | object array | Array of Data objects. | Optional |
| network | object | Network object. | Optional |
| channel | object | Channel object. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Producer**

*Content producer. Useful when content is syndicated (producer ≠ publisher).*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Producer ID for syndicated content. | Optional |
| name | string | Producer name (e.g., 'Warner Bros'). | Optional |
| cattax | integer | Category taxonomy (default: 1). | Optional |
| cat | string array | IAB content categories. | Optional |
| domain | string | Producer domain. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Device**

*Device through which user interacts. Includes hardware, platform, location, carrier data.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| geo | object | Geo object for device/user location. | Recommended |
| dnt | integer | Do Not Track. 0 \= unrestricted, 1 \= do not track. | Recommended |
| lmt | integer | Limit Ad Tracking. 0 \= unrestricted, 1 \= limited. | Recommended |
| ua | string | Browser user agent string. | Optional |
| sua | object | UserAgent object for structured UA (Client Hints). | Optional |
| ip | string | IPv4 address. | Optional |
| ipv6 | string | IPv6 address. | Optional |
| devicetype | integer | Device type. See AdCOM Device Types. | Optional |
| make | string | Device make (e.g., 'Apple'). | Optional |
| model | string | Device model (e.g., 'iPhone'). | Optional |
| os | string | OS (e.g., 'iOS'). | Optional |
| osv | string | OS version (e.g., '3.1.2'). | Optional |
| hwv | string | Hardware version (e.g., '5S'). | Optional |
| h | integer | Physical screen height in pixels. | Optional |
| w | integer | Physical screen width in pixels. | Optional |
| ppi | integer | Pixels per inch. | Optional |
| pxratio | float | Physical to device-independent pixel ratio. | Optional |
| js | integer | JavaScript support. 0 \= no, 1 \= yes. | Optional |
| geofetch | integer | Geolocation API available. 0 \= no, 1 \= yes. | Optional |
| flashver | string | Flash version. | Optional |
| language | string | Browser language using ISO-639-1-alpha-2. | Optional |
| langb | string | Browser language using IETF BCP 47\. | Optional |
| carrier | string | Carrier or ISP name. | Optional |
| mccmnc | string | Mobile carrier MCC-MNC code (e.g., '310-005'). | Optional |
| connectiontype | integer | Network connection type. See AdCOM Connection Types. | Optional |
| ifa | string | ID for advertiser (not hashed). | Optional |
| didsha1 | string | DEPRECATED. Hardware ID SHA1. | Optional |
| didmd5 | string | DEPRECATED. Hardware ID MD5. | Optional |
| dpidsha1 | string | DEPRECATED. Platform ID SHA1. | Optional |
| dpidmd5 | string | DEPRECATED. Platform ID MD5. | Optional |
| macsha1 | string | DEPRECATED. MAC address SHA1. | Optional |
| macmd5 | string | DEPRECATED. MAC address MD5. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Geo**

*Geographic location. Under Device \= current location. Under User \= home base.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| lat | float | Latitude \-90.0 to \+90.0. | Optional |
| lon | float | Longitude \-180.0 to \+180.0. | Optional |
| type | integer | Location source. See AdCOM Location Types. Recommended with lat/lon. | Optional |
| accuracy | integer | Accuracy in meters. Recommended for device-sourced location. | Optional |
| lastfix | integer | Seconds since geolocation fix. | Optional |
| ipservice | integer | IP geolocation service. See AdCOM IP Location Services. | Optional |
| country | string | Country using ISO-3166-1-alpha-3. | Optional |
| region | string | Region using ISO-3166-2. | Optional |
| regionfips104 | string | Region using FIPS 10-4 (withdrawn 2008). | Optional |
| metro | string | Google metro code. | Optional |
| city | string | City using UN LOCODE. | Optional |
| zip | string | ZIP or postal code. | Optional |
| utcoffset | integer | Local time offset from UTC in minutes. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: User**

*Human user of device; the advertising audience.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Exchange-specific user ID. | Optional |
| buyeruid | string | Buyer-specific user ID. | Optional |
| yob | integer | DEPRECATED. Year of birth (4-digit). | Optional |
| gender | string | DEPRECATED. 'M'=male, 'F'=female, 'O'=other. | Optional |
| keywords | string | Keywords, interests, or intent. | Optional |
| kwarray | string array | Array of keywords. | Optional |
| customdata | string | Exchange cookie data in base85. | Optional |
| geo | object | Geo object for user's home base. | Optional |
| data | object array | Array of Data objects for additional user data. | Optional |
| consent | string | TCF Consent String for GDPR. | Optional |
| eids | object array | Array of EID objects for third-party identifiers. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Data**

*Additional data about user or content from data providers.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Exchange-specific data provider ID. | Optional |
| name | string | Data provider name. | Optional |
| segment | object array | Array of Segment objects with data values. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Segment**

*Key-value pairs for specific data units within a Data object.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Data segment ID. | Optional |
| name | string | Data segment name. | Optional |
| value | string | Data segment value. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Network**

*Network the content is on (parent entity of Channel). E.g., Viacom, Discovery, CBS.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Publisher-assigned unique identifier. | Optional |
| name | string | Network name (e.g., 'ABC'). | Optional |
| domain | string | Primary domain (e.g., 'abc.com'). | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: Channel**

*Channel the content is on. E.g., MTV, HGTV, CNN, BBC One. Stream within a brand.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | Publisher-assigned unique identifier. | Optional |
| name | string | Channel name (e.g., 'WABC-TV'). | Optional |
| domain | string | Primary domain (e.g., 'abc7ny.com'). | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: SupplyChain**

*Set of nodes representing entities in direct payment flow for inventory.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| complete | integer | Chain complete back to inventory owner. 0 \= no, 1 \= yes. | Required |
| nodes | object array | Array of SupplyChainNode objects in chain order. | Required |
| ver | string | Supply chain spec version (e.g., '1.0'). | Required |
| ext | object | Placeholder for extensions. | Optional |

## **Object: SupplyChainNode**

*Identity of entity participating in supply chain.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| asi | string | Canonical domain of SSP/Exchange/etc. Same as ads.txt. | Required |
| sid | string | Seller ID within advertising system. Max 64 chars. | Required |
| rid | string | OpenRTB RequestId from this seller. | Optional |
| name | string | Company name (omit if in sellers.json). | Optional |
| domain | string | Business domain (omit if in sellers.json). | Optional |
| hp | integer | In payment flow. 1 \= yes (always 1 for v1.0). | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: EID**

*Extended identifiers from a single source/technology provider.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| source | string | Source domain responsible for IDs. | Optional |
| uids | object array | Array of UID objects. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: UID**

*Single user identifier within extended identifiers.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| id | string | User identifier. | Optional |
| atype | integer | Agent type. See AdCOM Agent Types. Highly recommended. | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: UserAgent**

*Structured user agent from Client Hints. Prefer over device.ua if both present.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| browsers | BrandVersion array | Browser/software component identifiers. | Recommended |
| platform | BrandVersion | Execution platform/OS identifier. | Recommended |
| mobile | integer | Prefers mobile content. 0 \= desktop, 1 \= mobile. | Optional |
| architecture | string | Major binary architecture (e.g., 'x86', 'arm'). | Optional |
| bitness | string | Device bitness (e.g., '64'). | Optional |
| model | string | Device model. | Optional |
| source | integer | Data source. See AdCOM User-Agent Source (default: 0). | Optional |
| ext | object | Placeholder for extensions. | Optional |

## **Object: BrandVersion**

*Identifies browser or platform from User-Agent Client Hints.*

| Attribute | Type | Description | Status |
| ----- | ----- | ----- | ----- |
| brand | string | Brand identifier (e.g., 'Chrome', 'Windows'). | Required |
| version | string array | Version components in descending order (major, minor, micro). | Optional |
| ext | object | Placeholder for extensions. | Optional |

# **5\. AdCOM Enumerated Lists Reference**

Many OpenRTB 2.6 fields reference enumerated values defined in AdCOM 1.0. Below are the key lists:

### **Creative Attributes**

1=Audio (Auto-Play), 2=Audio (User Initiated), 3=Expandable (Auto), 4=Expandable (Click), 5=Expandable (Rollover), 6=In-Banner Video (Auto-Play), 7=In-Banner Video (User Initiated), 8=Pop, 9=Provocative, 10=Shaky/Flashy, 11=Surveys, 12=Text Only, 13=User Interactive, 14=Windows Dialog, 15=Has Audio On/Off Button, 16=Ad Skippable, 17=Adobe Flash

### **API Frameworks**

1=VPAID 1.0, 2=VPAID 2.0, 3=MRAID-1, 4=ORMMA, 5=MRAID-2, 6=MRAID-3, 7=OMID-1, 8=SIMID 1.0, 9=SIMID 1.1

### **Placement Positions**

0=Unknown, 1=Above the Fold, 2=Deprecated, 3=Below the Fold, 4=Header, 5=Footer, 6=Sidebar, 7=Full Screen

### **Start Delay Modes**

\>0=Mid-Roll (delay in sec), 0=Pre-Roll, \-1=Generic Mid-Roll, \-2=Generic Post-Roll

### **Playback Methods**

1=Page Load Sound On, 2=Page Load Sound Off, 3=Click Sound On, 4=Mouse-Over Sound On, 5=Entering Viewport Sound On, 6=Entering Viewport Sound Off

### **Playback Cessation Modes**

1=On Video Completion, 2=On Leaving Viewport, 3=On Leaving Viewport or Completion

### **Device Types**

1=Mobile/Tablet, 2=Personal Computer, 3=Connected TV, 4=Phone, 5=Tablet, 6=Connected Device, 7=Set Top Box, 8=OOH Device

### **Connection Types**

0=Unknown, 1=Ethernet, 2=WiFi, 3=Cellular (Unknown Gen), 4=Cellular 2G, 5=Cellular 3G, 6=Cellular 4G, 7=Cellular 5G

### **Location Types**

1=GPS/Location Services, 2=IP Address, 3=User Provided

### **Category Taxonomies**

1=IAB Content 1.0, 2=IAB Content 2.0, 3=IAB Ad Product 1.0, 4=IAB Audience 1.1, 5=IAB Content 2.1, 6=IAB Content 2.2, 7=IAB Content 3.0, 8=IAB Ad Product 2.0

### **Video Placement Subtypes**

1=In-Stream, 2=In-Banner, 3=In-Article, 4=In-Feed, 5=Interstitial/Floating

### **Linearity Modes**

1=Linear, 2=Non-Linear

### **Feed Types (Audio)**

1=Music Service, 2=FM/AM Broadcast, 3=Podcast

### **Volume Normalization**

0=None, 1=Average Volume, 2=Peak Volume, 3=Loudness, 4=Custom

### **Companion Types**

1=Static Resource, 2=HTML Resource, 3=iframe Resource

### **Delivery Methods**

1=Streaming, 2=Progressive, 3=Download

### **Creative Subtypes (Audio/Video)**

1=VAST 1.0, 2=VAST 2.0, 3=VAST 3.0, 4=VAST 1.0 Wrapper, 5=VAST 2.0 Wrapper, 6=VAST 3.0 Wrapper, 7=VAST 4.0, 8=VAST 4.0 Wrapper, 9=DAAST 1.0, 10=DAAST 1.0 Wrapper, 11=VAST 4.1, 12=VAST 4.1 Wrapper, 13=VAST 4.2, 14=VAST 4.2 Wrapper

### **Agent Types (EID)**

1=Web/Device, 2=In-App, 3=Person-Based

### **Pod Sequence**

0=Last/Unknown, 1=First, 2=First or Last, 3=First or Second

### **Slot Position in Pod**

0=Any, 1=Last, 2=First or Last, \-1=First

# **6\. Key Dependencies & Constraints Summary**

## **6.1 Mutually Exclusive Fields**

* BidRequest: site XOR app (never both)  
* BidRequest: wseat XOR bseat (at most one)  
* BidRequest: wlang XOR wlangb (only one)  
* Video/Audio: minduration/maxduration XOR rqddurs  
* Site/App/Content/User: keywords XOR kwarray  
* Device/Content: language XOR langb

## **6.2 Conditional Requirements**

* If video/audio skippable (skip=1): skipmin and skipafter become relevant  
* If pmp.private\_auction=1: Only deals in pmp.deals\[\] are eligible  
* If GDPR (regs.gdpr=1): user.consent should contain TCF string  
* If video companions: Banner.id and Banner.vcm become relevant  
* If dynamic pod: poddur, maxseq, mincpmpersec become relevant  
* If Geo from device (type=1): accuracy should be included

## **6.3 Format-Specific Requirements**

* Banner: format\[\] array OR w/h pair recommended  
* Video: mimes\[\] REQUIRED; minduration, maxduration, protocols recommended  
* Audio: mimes\[\] REQUIRED; minduration, maxduration, protocols, startdelay recommended  
* Native: request REQUIRED (JSON string per Native Ad Spec)

## **6.4 Deprecation Notices**

* Video/Audio sequence field: DEPRECATED \- use podid/slotinpod  
* User yob, gender: DEPRECATED \- avoid use  
* Device didsha1, didmd5, dpidsha1, dpidmd5, macsha1, macmd5: All DEPRECATED

\---

*End of OpenRTB 2.6 Specification Reference*  
Source: IAB Tech Lab (<https://github.com/InteractiveAdvertisingBureau/openrtb2.x>)
