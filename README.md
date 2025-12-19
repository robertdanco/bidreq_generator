# OpenRTB 2.6 Bid Request Generator

Generate valid OpenRTB 2.6 bid requests for ad tech testing and development.

## Features

- **Live Preview** - JSON updates in real-time as you edit the form
- **Full Media Support** - Banner, Video, and Audio impressions
- **Site & App Inventory** - Toggle between web and mobile app inventory types
- **Complete Context** - User, Regs (GDPR/COPPA), Source (supply chain), and PMP deals
- **Visual Indicators** - Required (red) and recommended (orange) field markers
- **Save to Clipboard** - One-click copy of generated JSON

## Setup

```bash
npm install
cd backend && npm install
cd ../frontend && npm install --legacy-peer-deps
npm run dev
```

Opens at `http://localhost:3000` (API at `http://localhost:3001`)

## API

### POST /api/generate

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "example.com",
    "page": "https://example.com/page.html",
    "width": 300,
    "height": 250,
    "bidfloor": 0.5
  }'
```

**Response:**
```json
{
  "bidRequest": {
    "id": "uuid",
    "imp": [{ "id": "1", "banner": { "w": 300, "h": 250 }, "bidfloor": 0.5 }],
    "site": { "domain": "example.com", "page": "..." },
    "device": { "ua": "...", "geo": { "country": "USA" } }
  },
  "validation": { "valid": true }
}
```

### Video Bid Request

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "example.com",
    "page": "https://example.com/video.html",
    "impressions": [{
      "id": "1",
      "video": {
        "mimes": ["video/mp4", "video/webm"],
        "w": 640,
        "h": 360,
        "minduration": 5,
        "maxduration": 30,
        "protocols": [2, 3, 5, 6]
      },
      "bidfloor": 2.0
    }]
  }'
```

### Audio Bid Request

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "example.com",
    "page": "https://example.com/podcast.html",
    "impressions": [{
      "id": "1",
      "audio": {
        "mimes": ["audio/mp4", "audio/mpeg"],
        "minduration": 15,
        "maxduration": 30,
        "protocols": [2, 3, 9, 10],
        "startdelay": 0
      },
      "bidfloor": 1.5
    }]
  }'
```

### App Inventory Request

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "example.com",
    "app": {
      "id": "app123",
      "name": "My App",
      "bundle": "com.example.myapp",
      "storeurl": "https://play.google.com/store/apps/details?id=com.example.myapp"
    },
    "impressions": [{
      "id": "1",
      "banner": { "w": 320, "h": 50 },
      "bidfloor": 0.5
    }]
  }'
```

### Extended Options

Custom device/geo, user data, regulatory compliance (GDPR/COPPA), supply chain (schain), and PMP deals are supported. See `backend/EXAMPLES.md` for full API examples.

### Other Endpoints

- `GET /api/example` - Example bid request with defaults
- `GET /api/health` - Health check

## Build

```bash
cd backend && npm run build
cd ../frontend && npm run build
```

## Reference

[OpenRTB 2.6 Spec](https://www.iab.com/wp-content/uploads/2016/03/OpenRTB-API-Specification-Version-2-6-final.pdf)
