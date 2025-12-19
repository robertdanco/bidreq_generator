# API Examples

## Basic Request

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "example.com",
    "page": "https://example.com/article.html",
    "width": 300,
    "height": 250,
    "bidfloor": 1.5
  }'
```

**Response:**
```json
{
  "bidRequest": {
    "id": "generated-uuid",
    "imp": [{
      "id": "1",
      "banner": { "w": 300, "h": 250, "pos": 1 },
      "bidfloor": 1.5,
      "bidfloorcur": "USD"
    }],
    "site": {
      "domain": "example.com",
      "page": "https://example.com/article.html",
      "publisher": { "name": "example.com" }
    },
    "device": {
      "ua": "Mozilla/5.0...",
      "devicetype": 2,
      "geo": { "country": "USA", "city": "San Francisco" }
    },
    "at": 1,
    "tmax": 200,
    "cur": ["USD"]
  },
  "validation": { "valid": true }
}
```

## Multiple Impressions

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "news-portal.com",
    "page": "https://news-portal.com/homepage",
    "impressions": [
      {
        "id": "header",
        "banner": { "w": 728, "h": 90, "pos": 1 },
        "bidfloor": 2.5,
        "tagid": "slot-header"
      },
      {
        "id": "sidebar",
        "banner": { "w": 300, "h": 250, "pos": 3 },
        "bidfloor": 1.0,
        "tagid": "slot-sidebar"
      }
    ],
    "at": 2,
    "tmax": 150
  }'
```

## Custom Device/Geo

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "mobile-app.com",
    "page": "https://mobile-app.com/index.html",
    "width": 320,
    "height": 50,
    "device": {
      "devicetype": 1,
      "make": "Apple",
      "model": "iPhone 13",
      "os": "iOS"
    },
    "geo": {
      "lat": 40.7128,
      "lon": -74.0060,
      "country": "USA",
      "city": "New York"
    }
  }'
```

## Error Response

```json
{
  "error": "Invalid input parameters",
  "errors": ["domain is required and must be a non-empty string"]
}
```
