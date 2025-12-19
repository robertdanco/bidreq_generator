# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenRTB 2.6 Bid Request Generator - a full-stack tool for generating and validating OpenRTB 2.6 bid requests for ad tech testing and development.

### Key Features

- **Live Preview**: JSON bid request updates in real-time as you edit the form
- **Full Media Type Support**: Banner, Video, and Audio impressions with OpenRTB 2.6 compliance
- **Site & App Inventory**: Toggle between web (Site) and mobile app (App) inventory types
- **Complete Context Objects**: User, Regs (GDPR/COPPA/US Privacy), Source (supply chain), and PMP (private marketplace deals)
- **Visual Field Indicators**: Required fields (red asterisk), recommended fields (orange badge)
- **Save to Clipboard**: Copy the generated JSON directly to clipboard

## Commands

```bash
# Development (runs both frontend and backend concurrently)
npm run dev

# Install all dependencies
npm run install:all
# Or manually:
npm install && cd backend && npm install && cd ../frontend && npm install --legacy-peer-deps

# Build
npm run build                    # Build both
cd backend && npm run build      # Backend only (TypeScript -> dist/)
cd frontend && npm run build     # Frontend only (Vite build)

# Run services individually
cd backend && npm run dev        # Backend at http://localhost:3001
cd frontend && npm run dev       # Frontend at http://localhost:3000
```

## Architecture

### Monorepo Structure
- **Root**: Workspace orchestration with `concurrently`
- **backend/**: Express + TypeScript API server
- **frontend/**: React + Vite + TypeScript UI

### Backend (`backend/src/`)

- **server.ts**: Express app entry point (port 3001)
- **api/routes.ts**: API endpoints (`POST /api/generate`, `GET /api/example`, `GET /api/health`)
- **types/openrtb.ts**: Full OpenRTB 2.6 TypeScript interfaces (`BidRequest`, `Impression`, `Banner`, `Video`, `Audio`, `Site`, `App`, `Device`, `Geo`, `User`, `Regs`, `Source`, `Pmp`, `BidRequestParams`)
- **generators/bidrequest.ts**: Core bid request generation logic
- **generators/banner.ts**: Banner impression generation
- **generators/video.ts**: Video impression generation with device-aware defaults
- **generators/audio.ts**: Audio impression generation with pod support
- **generators/context.ts**: User, Regs, Source, and PMP object generation
- **validation/validator.ts**: OpenRTB 2.6 compliance validation with `validateBidRequest()` (supports banner, video, and audio)

### Frontend (`frontend/src/`)

- **App.tsx**: Main component with live preview - computes OpenRTB JSON client-side as form changes
- **stores/useBidRequestStore.ts**: Zustand store managing all form state and `toApiPayload()` transformation
- **components/BidRequestForm.tsx**: Form UI with collapsible sections and "Save" button
- **components/JsonDisplay.tsx**: JSON output display using `@uiw/react-json-view`
- **components/sections/BannerEditor.tsx**: Banner impression configuration
- **components/sections/VideoEditor.tsx**: Video impression configuration with full OpenRTB 2.6 video fields
- **components/sections/AudioEditor.tsx**: Audio impression configuration with pod/streaming support
- **components/sections/ImpressionSection.tsx**: Banner/Video/Audio toggle and impression management
- **components/sections/SiteSection.tsx**: Web inventory configuration
- **components/sections/AppSection.tsx**: Mobile app inventory configuration
- **components/sections/UserSection.tsx**: User data and extended IDs (EIDs) configuration
- **components/sections/RegsSection.tsx**: Regulatory compliance (GDPR, COPPA, US Privacy)
- **components/sections/SourceSection.tsx**: Supply chain (schain) configuration
- **components/sections/ImpressionHeader.tsx**: Shared header component for all media editors
- **components/sections/ImpressionCommonFields.tsx**: Shared impression-level fields (bid floor, blocked attributes, etc.)
- **types/formState.ts**: Form-specific TypeScript interfaces (includes `VideoFormState`, `AudioFormState`, `UserFormState`, etc.)
- **constants/openrtb-enums.ts**: OpenRTB enum constants for all media types and context objects
- **constants/presets.ts**: Device/scenario presets

### Data Flow (Live Preview Mode)

1. User configures form → Zustand store updates state
2. `useEffect` watches store changes → `toApiPayload()` transforms form state
3. `transformToOpenRTB()` converts to OpenRTB format → JSON preview updates instantly
4. Client-side `validateBidRequest()` shows warnings in real-time
5. "Save" button → Copies final JSON to clipboard

### Key Patterns

- Form state uses boolean values (e.g., `secure: true`), API uses OpenRTB integers (`secure: 1`)
- `BidRequestParams` supports both legacy mode (width/height) and full impressions array
- Impressions have `mediaType: 'banner' | 'video' | 'audio'` - only the active type is included in output
- Video and Audio impressions require `mimes` field (OpenRTB 2.6 requirement)
- Site and App are mutually exclusive per OpenRTB 2.6 spec
- Supply chain (schain) nodes require `asi` and `sid` fields - invalid nodes are filtered out
- Validation returns `{ valid, errors, warnings }` - warnings are non-fatal
- Helper utilities `omitEmpty()` and `omitBlank()` clean up payload by converting empty arrays/strings to undefined

## API Quick Reference

```bash
# Generate bid request
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"domain":"example.com","page":"https://example.com/page.html","width":300,"height":250}'

# Get example request
curl http://localhost:3001/api/example
```

See `backend/EXAMPLES.md` for advanced API usage (custom device/geo, multiple impressions, block lists).

## Subagent-First Development (MANDATORY)

**DEFAULT BEHAVIOR**: Use the Task tool with specialized subagents for virtually ALL non-trivial work. Do NOT attempt complex tasks in the main context when a subagent can handle it better.

### Available Subagents and When to Use Them

| Subagent | ALWAYS Use When... |
|----------|-------------------|
| `Explore` | Searching codebase, understanding architecture, finding files, answering "where is X?" questions |
| `Plan` | Designing implementation strategy, making architectural decisions, planning multi-step features |
| `code-reviewer` | After writing ANY significant code (>20 lines), before commits, during PR prep |
| `code-explorer` | Tracing execution paths, understanding how features work, mapping dependencies |
| `code-architect` | Designing new features, creating implementation blueprints, component design |
| `silent-failure-hunter` | After implementing error handling, catch blocks, or fallback logic |
| `code-simplifier` | After completing a feature, before finalizing PRs |
| `comment-analyzer` | After adding documentation, before PRs with doc changes |
| `pr-test-analyzer` | Before creating PRs to verify test coverage |
| `type-design-analyzer` | When introducing new types or interfaces |

### Proactive Subagent Invocation Rules

**YOU MUST** spawn subagents in these situations without being asked:

1. **Before ANY codebase exploration**: Use `Explore` agent instead of running Glob/Grep directly
2. **After writing code**: Immediately invoke `code-reviewer` - do not wait for user to ask
3. **When planning features**: Use `Plan` agent before writing implementation code
4. **After implementing error handling**: Spawn `silent-failure-hunter` automatically
5. **Before PR creation**: Run `code-reviewer`, `code-simplifier`, and `pr-test-analyzer` in parallel
6. **When adding types**: Invoke `type-design-analyzer` for any new type definitions

### Parallel Subagent Execution

**ALWAYS** launch independent subagents in parallel. Send a single message with multiple Task tool calls:

```
Good: Single message with 3 parallel Task calls for code-reviewer, code-simplifier, pr-test-analyzer
Bad: Sequential Task calls waiting for each to complete
```

### Full-Stack Feature Development Pattern

For ANY feature touching both frontend and backend:

1. **Immediately** spawn `Plan` agent to design the approach
2. **In parallel**, spawn:
   - Backend implementation subagent (scope: `backend/`)
   - Frontend implementation subagent (scope: `frontend/`)
3. **After implementation**, spawn in parallel:
   - `code-reviewer` for backend changes
   - `code-reviewer` for frontend changes
4. **Before commit**, run `code-simplifier`

### Anti-Patterns to AVOID

- Using Glob/Grep directly for exploration (use `Explore` agent)
- Writing >50 lines of code without spawning `code-reviewer`
- Creating PRs without running review agents
- Sequential subagent calls when parallel is possible
- Attempting complex debugging in main context (use subagents)
- Planning in your head instead of using `Plan` agent

### Subagent Spawn Template

When spawning subagents, always be explicit:

```
Subagent: [type]
Task: [specific description]
Scope: [files/directories it owns]
Boundary: [what it must NOT touch]
Output: [what you expect back]
```

## Documentation Maintenance

**STRICT REQUIREMENT**: After making any meaningful architectural or functional change to the application, you MUST:
1. Review `CLAUDE.md` for outdated information and update accordingly
2. Review `README.md` for outdated information and update accordingly

This includes changes to:
- API endpoints, request/response formats, or validation logic
- New or removed dependencies
- Build/dev commands or configuration
- Component structure or data flow
- Type definitions that affect the public interface

## OpenRTB 2.6 Reference

[Specification PDF](https://www.iab.com/wp-content/uploads/2016/03/OpenRTB-API-Specification-Version-2-6-final.pdf)
