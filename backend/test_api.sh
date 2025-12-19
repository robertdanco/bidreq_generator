#!/bin/bash

# Test script for backward compatibility and new API features

API_URL="http://localhost:3001/api"

echo "Testing OpenRTB 2.6 Bid Request Generator API"
echo "=============================================="
echo ""

# Test 1: Legacy API format (backward compatibility)
echo "Test 1: Legacy API format (backward compatibility)"
echo "---------------------------------------------------"
curl -X POST "$API_URL/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "example.com",
    "page": "https://example.com/article.html",
    "width": 300,
    "height": 250,
    "test": true,
    "bidfloor": 1.5,
    "siteName": "Example News",
    "publisherName": "Example Publisher",
    "publisherDomain": "publisher.example.com"
  }' | jq '.bidRequest | {id, test, imp: .imp[0] | {id, bidfloor, banner: {w, h}}, site: {name, domain, publisher: {name, domain}}}'

echo ""
echo ""

# Test 2: New API with custom device and geo
echo "Test 2: New API with custom device and geo"
echo "-------------------------------------------"
curl -X POST "$API_URL/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "mobile-app.com",
    "page": "https://mobile-app.com/index.html",
    "width": 320,
    "height": 50,
    "device": {
      "ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)",
      "devicetype": 1,
      "make": "Apple",
      "model": "iPhone 13",
      "os": "iOS",
      "osv": "15.0",
      "ip": "203.0.113.1",
      "ifa": "AEBE52E7-03EE-455A-B3C4-E57283966239"
    },
    "geo": {
      "lat": 40.7128,
      "lon": -74.0060,
      "country": "USA",
      "city": "New York",
      "zip": "10001",
      "type": 1
    }
  }' | jq '.bidRequest | {device: {ua, devicetype, make, model, ifa, geo: {lat, lon, city}}}'

echo ""
echo ""

# Test 3: Multiple impressions with custom banner fields
echo "Test 3: Multiple impressions with custom banner fields"
echo "-------------------------------------------------------"
curl -X POST "$API_URL/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "news-site.com",
    "page": "https://news-site.com/breaking-news.html",
    "impressions": [
      {
        "id": "imp-1",
        "banner": {
          "w": 728,
          "h": 90,
          "pos": 1,
          "format": [{"w": 728, "h": 90}, {"w": 970, "h": 90}]
        },
        "bidfloor": 2.5,
        "tagid": "header-banner"
      },
      {
        "id": "imp-2",
        "banner": {
          "w": 300,
          "h": 250,
          "pos": 3
        },
        "bidfloor": 1.0,
        "tagid": "sidebar-rect"
      }
    ],
    "site": {
      "name": "Breaking News Daily",
      "cat": ["IAB12", "IAB1"],
      "privacypolicy": 1
    },
    "at": 2,
    "tmax": 150,
    "cur": ["USD", "EUR"]
  }' | jq '.bidRequest | {at, tmax, cur, imp: [.imp[] | {id, tagid, bidfloor, banner: {w, h, pos, format}}], site: {name, cat}}'

echo ""
echo ""

# Test 4: Custom site with publisher info
echo "Test 4: Custom site with publisher info"
echo "----------------------------------------"
curl -X POST "$API_URL/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "sports.example.com",
    "page": "https://sports.example.com/live-scores",
    "width": 300,
    "height": 600,
    "site": {
      "id": "site-123",
      "name": "Sports Central",
      "cat": ["IAB17"],
      "pagecat": ["IAB17-1"],
      "ref": "https://google.com/search?q=live+scores",
      "publisher": {
        "id": "pub-456",
        "name": "Sports Media Group",
        "domain": "sportsmedia.com",
        "cat": ["IAB17", "IAB20"]
      }
    }
  }' | jq '.bidRequest.site'

echo ""
echo ""

# Test 5: Block lists and auction settings
echo "Test 5: Block lists and auction settings"
echo "-----------------------------------------"
curl -X POST "$API_URL/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "family-friendly.com",
    "page": "https://family-friendly.com/kids-section",
    "width": 160,
    "height": 600,
    "bcat": ["IAB25", "IAB26"],
    "badv": ["competitor1.com", "competitor2.com"],
    "allimps": 1,
    "test": 0
  }' | jq '.bidRequest | {bcat, badv, allimps, test}'

echo ""
echo ""
echo "All tests completed!"
